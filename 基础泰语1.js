/**
 * Quantumult X 自动下单脚本
 * 功能：访问商品页面 -> 抓 _wpnonce -> 加入购物车 -> 提示结算页
 * 注意：不跳过付款！仍需手动支付
 */

const productPage = "https://www.thebestcenter.com/143884/"; // 商品页 URL
const checkoutPage = "https://www.thebestcenter.com/checkout/";

const headers = {
  "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Mobile/15E148 Safari/604.1",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "zh-HK,zh-Hant;q=0.9",
  "Connection": "keep-alive",
  "Cookie": "替换成你抓到的 Cookie"
};

// 你的商品参数（抓包后替换）
const product_id = "143884";
const variation_id = "143890";
const quantity = "1";
const attribute_pa_free_shipping = "pdf";

async function run() {
  try {
    // 1️⃣ 获取商品页 HTML
    const pageResp = await $task.fetch({ url: productPage, method: "GET", headers });
    if (pageResp.statusCode !== 200) throw `获取页面失败，状态码 ${pageResp.statusCode}`;

    const html = pageResp.body;

    // 2️⃣ 提取 _wpnonce
    const nonceMatch = html.match(/name="_wpnonce" value="(.*?)"/);
    if (!nonceMatch) throw "未找到 _wpnonce，可能页面结构变了";
    const wpnonce = nonceMatch[1];

    console.log("✅ 获取到 _wpnonce:", wpnonce);

    // 3️⃣ 构造表单
    const boundary = "----WebKitFormBoundary" + Math.random().toString(16).slice(2);
    const body =
      `${boundary}\r\nContent-Disposition: form-data; name="attribute_pa_free-shipping"\r\n\r\n${attribute_pa_free_shipping}\r\n` +
      `${boundary}\r\nContent-Disposition: form-data; name="quantity"\r\n\r\n${quantity}\r\n` +
      `${boundary}\r\nContent-Disposition: form-data; name="add-to-cart"\r\n\r\n${product_id}\r\n` +
      `${boundary}\r\nContent-Disposition: form-data; name="product_id"\r\n\r\n${product_id}\r\n` +
      `${boundary}\r\nContent-Disposition: form-data; name="variation_id"\r\n\r\n${variation_id}\r\n` +
      `${boundary}\r\nContent-Disposition: form-data; name="_wpnonce"\r\n\r\n${wpnonce}\r\n` +
      `${boundary}--`;

    // 4️⃣ 发送加入购物车请求
    const addCartResp = await $task.fetch({
      url: productPage,
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": `multipart/form-data; boundary=${boundary.slice(2)}`
      },
      body
    });

    if (addCartResp.statusCode === 200 && addCartResp.body.includes("cart")) {
      console.log("✅ 成功加入购物车");
      $notify("下单成功", "请前往结算页完成付款", checkoutPage);
    } else {
      console.log("❌ 加入购物车失败，响应：", addCartResp.body.slice(0, 300));
      $notify("下单失败", "请查看日志", "");
    }

  } catch (e) {
    console.log("脚本运行出错：", e);
    $notify("脚本错误", e.toString(), "");
  } finally {
    $done();
  }
}

run();