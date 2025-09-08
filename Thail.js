/**
 * @name readeer-fake-buy.js
 * @author Assistant
 * @description 破解 readeer.cn 书籍购买状态，实现免费阅读
 * @version 1.0
 * @platform Quantumult X
 */

let obj = JSON.parse(<LaTex>$response.body);[ty-n][ty-n]// 确保响应中有 data[ty-n]if (obj.data) {[ty-n]  // 强制标记为“已购买”[ty-n]  obj.data.isBuy = 1;[ty-n]  obj.data.buyStatus = 1;[ty-n]  obj.data.hasBuy = 1;[ty-n]  obj.data.accessLevel = 2;[ty-n]  obj.data.permission = "full";[ty-n]  obj.data.expireTime = "9999-12-31 23:59:59";[ty-n]  obj.data.vipType = 1; // 防止某些判断[ty-n][ty-n]  // 如果原响应中有 fileUrl 或 htmlUrl，确保不为空[ty-n]  if (obj.data.htmlUrl) {[ty-n]    // 保留原始链接（如果服务器已返回）[ty-n]  } else if (obj.data.fileInfo?.fileUrl) {[ty-n]    obj.data.htmlUrl = obj.data.fileInfo.fileUrl;[ty-n]  }[ty-n][ty-n]  // 可选：伪造一个默认链接（建议替换为真实购买过的书籍链接）[ty-n]  // obj.data.htmlUrl = "https://api.readoor.cn/files/html/users/6521395b6033f6/book.html?token=你的真实token";[ty-n]}[ty-n][ty-n]// 返回修改后的 JSON[ty-n]$</LaTex>done({ body: JSON.stringify(obj) });