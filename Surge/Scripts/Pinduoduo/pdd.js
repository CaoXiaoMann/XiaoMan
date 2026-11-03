const url = $request.url;

const requestRules = [
  /^https:\/\/api\.(?:pinduoduo|yangkeduo)\.com\/api\/cappuccino\/splash\?/i,
  /^https:\/\/api\.pinduoduo\.com\/api\/alexa\/(?:cells\/hub|goods\/back_up)/i,
  /^https:\/\/api\.pinduoduo\.com\/api\/aquarius\/hungary\/global\/homepage\?/i,
  /^https:\/\/api\.pinduoduo\.com\/api\/brand-olay\/goods_detail\/bybt_guide/i,
  /^https:\/\/api\.pinduoduo\.com\/api\/buffon\/nasus\/recommend\?/i,
  /^https:\/\/api\.pinduoduo\.com\/api\/caterham\/v3\/query\//i,
  /^https:\/\/api\.pinduoduo\.com\/api\/dunkirk\/subaru\/goods_list_v2\?/i,
  /^https:\/\/api\.pinduoduo\.com\/api\/engels\/reviews\/require\/append/i,
  /^https:\/\/api\.pinduoduo\.com\/api\/express\/post\/landing_page\/ad\/recommend_goods_list\/pickup_identity_code\?/i,
  /^https:\/\/api\.pinduoduo\.com\/api\/flow\/hungary\/window\/global\/v2\?/i,
  /^https:\/\/api\.pinduoduo\.com\/api\/zaire_biz\/chat\/resource\/get_list_data/i,
  /^https:\/\/api\.pinduoduo\.com\/api\/xrec\/goods_rec\/pay_after_use_v2\?/i,
  /^https:\/\/api\.pinduoduo\.com\/search_hotquery\?/i
];

const responseRules = [
  {
    pattern: /^https:\/\/api\.pinduoduo\.com\/api\/oak\/integration\/render/i,
    keys: [
      "bottom_section_list",
      "ui.bottom_section",
      "ui.live_section.float_info"
    ]
  },
  {
    pattern: /^https:\/\/api\.pinduoduo\.com\/api\/philo\/personal\/hub\?/i,
    keys: [
      "monthly_card_entrance",
      "personal_banner",
      "personal_center_style_v2_vo",
      "icon_set.icons",
      "icon_set.top_personal_icons",
      "title_bar_items"
    ]
  },
  {
    pattern: /^https:\/\/api\.pinduoduo\.com\/search/i,
    keys: ["expansion"]
  }
];

if (requestRules.some(rule => rule.test(url))) {
  $done({
    response: {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: "{}"
    }
  });
} else {
  let body = $response.body;

  try {
    let obj = JSON.parse(body);

    const matched = responseRules.find(rule => rule.pattern.test(url));

    if (matched) {
      for (const key of matched.keys) {
        const parts = key.split(".");
        let target = obj;

        for (let i = 0; i < parts.length - 1; i++) {
          target = target?.[parts[i]];
          if (!target) break;
        }

        if (target) {
          delete target[parts[parts.length - 1]];
        }
      }
    }

    $done({ body: JSON.stringify(obj) });
  } catch (e) {
    $done({});
  }
}