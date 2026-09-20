// 听点点 (tingdiandian) 会员解锁 — response 脚本 v2
// 拦截 GET https://api.tingdiandian.com/user/<id> 响应，把 free 改写为「永久 PRO」。
// v2 修复：剥掉 Content-Encoding/Content-Length/Transfer-Encoding 头，避免 App 按
//   gzip 去解一段明文 JSON 而崩；body 非可解析字符串时原样放行，绝不返回空 body。
// 边界：客户端改写只绕过 UI 付费墙/本地时长门槛；AI 转写点点额度由服务端真实记账，
//   本脚本不能白送算力。

var TDD_UNLOCK = (function () {
  var FAR_FUTURE = "2099-12-31T23:59:59.000Z";
  var BIG = 9999999;

  function patch(obj) {
    if (!obj || typeof obj !== "object") return obj;
    var d = obj.data;
    if (!d || typeof d !== "object" || typeof d.isPro === "undefined") return obj;

    d.isPro = true;
    d.entitlement = "pro";
    d.isProPermanentMember = true;
    d.isBasicPermanentMember = true;
    d.showPermanentMember = true;
    d.permanentMemberCardVersion = (d.permanentMemberCardVersion || 0) | 0 || 1;
    if (!d.permanentNumber) d.permanentNumber = "TDD-LIFE";
    d.isOneYearMember = true;
    d.isOneMonthMember = true;
    d.isBasicOneMonthMember = true;
    d.oneYearMemberEndDate = FAR_FUTURE;
    d.oneMonthMemberEndDate = FAR_FUTURE;
    d.basicOneMonthMemberEndDate = FAR_FUTURE;
    d.isGiveMemberDays = false;
    d.giveMemberDaysEndDate = null;
    d.hasUsedNewUserOffer = true;
    d.newUserOfferVariant = null;
    d.newUserOfferExpiresAt = null;

    d.timeLimit = BIG;
    d.tokenLimit = BIG;
    d.pointsLimit = BIG;
    d.pointsMonthlyGrant = BIG;
    d.pointsRolloverAvailable = BIG;
    d.frozenQuota = 0;
    d.pointsFrozen = 0;
    // 不改 pointsUsed/tokenUsed/timeUsed —— 保留服务端真实已用量

    return obj;
  }

  function patchBody(body) {
    if (typeof body !== "string" || !body) return null;
    try {
      var o = JSON.parse(body);
      if (!o || typeof o !== "object") return null;
      return JSON.stringify(patch(o));
    } catch (e) {
      return null; // 解析失败 → 让外层原样放行
    }
  }

  // 剥掉会让 App 误判 body 编码的头，其余原样保留
  function cleanHeaders(h) {
    var out = {};
    if (h && typeof h === "object") {
      for (var k in h) {
        if (!Object.prototype.hasOwnProperty.call(h, k)) continue;
        var lk = String(k).toLowerCase();
        if (lk === "content-encoding" || lk === "content-length" || lk === "transfer-encoding") continue;
        out[k] = h[k];
      }
    }
    return out;
  }

  return { patch: patch, patchBody: patchBody, cleanHeaders: cleanHeaders };
})();

// —— 工具入口（Surge / Stash / Loon / Egern 通用）——
if (typeof $response !== "undefined" && typeof $done !== "undefined") {
  var b = $response.body;
  var nb = (typeof TDD_UNLOCK !== "undefined") ? TDD_UNLOCK.patchBody(b) : null;
  if (nb !== null) {
    // 成功改写：返回明文 body + 剥掉编码头
    $done({ body: nb, headers: TDD_UNLOCK.cleanHeaders($response.headers) });
  } else {
    // body 不可解析（gzip 原始字节 / 空 / 非 JSON）→ 一律原样放行，绝不动 body
    $done({});
  }
}

if (typeof module !== "undefined") module.exports = TDD_UNLOCK;
