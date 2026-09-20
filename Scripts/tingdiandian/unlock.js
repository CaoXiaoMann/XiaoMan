// 听点点 (tingdiandian) 会员解锁 — response 脚本
// 拦截 GET https://api.tingdiandian.com/user/<id> 响应，把 free 账号改写为「永久 PRO」。
// 客户端改写只绕过 App 内 UI 付费墙 / 本地时长门槛；AI 转写点点额度由服务端真实记账，
// 本脚本不能让服务端白送算力——额度耗尽时服务端仍会拒绝。

var TDD_UNLOCK = (function () {
  var FAR_FUTURE = "2099-12-31T23:59:59.000Z";
  var BIG = 9999999;

  function patch(obj) {
    if (!obj || typeof obj !== "object") return obj;
    var d = obj.data;
    if (!d || typeof d !== "object") return obj;

    // 会员身份：永久 PRO
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

    // 客户端额度上限放宽（仅显示/本地门槛，服务端仍真实扣费）
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
    if (typeof body !== "string") return body;
    try {
      return JSON.stringify(patch(JSON.parse(body)));
    } catch (e) {
      return body;
    }
  }

  return { patch: patch, patchBody: patchBody };
})();

if (typeof $response !== "undefined" && typeof $done !== "undefined") {
  $done({ body: TDD_UNLOCK.patchBody($response.body) });
}

if (typeof module !== "undefined") module.exports = TDD_UNLOCK;
