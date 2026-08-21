/*
RevenueCat Crack - 破解内购验证
适配 Egern
*/

const mockUrl = "https://reven.lovebabyforever.workers.dev/reven";
const url = $request.url;
const pattern = /^https:\/\/(api\.revenuecat\.com|api\.rc-backup\.com|rc\.visionarytech\.ltd|revenue\.cuto\.app)\/(.+\/(?:receipts|subscribers\/[^/]+(?:\/attributes)?))$/;

const match = url.match(pattern);
if (match) {
    const newUrl = mockUrl + '/' + match[1] + '/' + match[2];
    $done({ url: newUrl });
} else {
    $done({});
}