/*
 * Spotify 去广告 - 请求重写
 * 更新日期：2026-11-01
 * 功能：将 Spotify 请求中的 platform=iphone 改为 ipad，绕过移动端限制
 */

console.log(`spotify-remove-ads-2026.11.01`);

let url = $request.url;

if (url.includes('platform=iphone')) {
    url = url.replace(/platform=iphone/, 'platform=ipad');
} else {
    console.log('无需处理');
}

$done({
    url
});
