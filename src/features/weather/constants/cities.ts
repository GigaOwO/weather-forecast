export type CityOption = {
  id: string;
  label: string;
};

export type CityGroup = {
  label: string;
  cities: CityOption[];
};

export const CITY_GROUPS: CityGroup[] = [
  {
    label: "道北",
    cities: [
      { id: "011000", label: "稚内" },
      { id: "012010", label: "旭川" },
      { id: "012020", label: "留萌" },
    ],
  },
  {
    label: "道東",
    cities: [
      { id: "013010", label: "網走" },
      { id: "013020", label: "北見" },
      { id: "013030", label: "紋別" },
      { id: "014010", label: "根室" },
      { id: "014020", label: "釧路" },
      { id: "014030", label: "帯広" },
    ],
  },
  {
    label: "道南",
    cities: [
      { id: "015010", label: "室蘭" },
      { id: "015020", label: "浦河" },
      { id: "017010", label: "函館" },
      { id: "017020", label: "江差" },
    ],
  },
  {
    label: "道央",
    cities: [
      { id: "016010", label: "札幌" },
      { id: "016020", label: "岩見沢" },
      { id: "016030", label: "倶知安" },
    ],
  },
  {
    label: "青森県",
    cities: [
      { id: "020010", label: "青森" },
      { id: "020020", label: "むつ" },
      { id: "020030", label: "八戸" },
    ],
  },
  {
    label: "岩手県",
    cities: [
      { id: "030010", label: "盛岡" },
      { id: "030020", label: "宮古" },
      { id: "030030", label: "大船渡" },
    ],
  },
  {
    label: "宮城県",
    cities: [
      { id: "040010", label: "仙台" },
      { id: "040020", label: "白石" },
    ],
  },
  {
    label: "秋田県",
    cities: [
      { id: "050010", label: "秋田" },
      { id: "050020", label: "横手" },
    ],
  },
  {
    label: "山形県",
    cities: [
      { id: "060010", label: "山形" },
      { id: "060020", label: "米沢" },
      { id: "060030", label: "酒田" },
      { id: "060040", label: "新庄" },
    ],
  },
  {
    label: "福島県",
    cities: [
      { id: "070010", label: "福島" },
      { id: "070020", label: "小名浜" },
      { id: "070030", label: "若松" },
    ],
  },
  {
    label: "茨城県",
    cities: [
      { id: "080010", label: "水戸" },
      { id: "080020", label: "土浦" },
    ],
  },
  {
    label: "栃木県",
    cities: [
      { id: "090010", label: "宇都宮" },
      { id: "090020", label: "大田原" },
    ],
  },
  {
    label: "群馬県",
    cities: [
      { id: "100010", label: "前橋" },
      { id: "100020", label: "みなかみ" },
    ],
  },
  {
    label: "埼玉県",
    cities: [
      { id: "110010", label: "さいたま" },
      { id: "110020", label: "熊谷" },
      { id: "110030", label: "秩父" },
    ],
  },
  {
    label: "千葉県",
    cities: [
      { id: "120010", label: "千葉" },
      { id: "120020", label: "銚子" },
      { id: "120030", label: "館山" },
    ],
  },
  {
    label: "東京都",
    cities: [
      { id: "130010", label: "東京" },
      { id: "130020", label: "大島" },
      { id: "130030", label: "八丈島" },
      { id: "130040", label: "父島" },
    ],
  },
  {
    label: "神奈川県",
    cities: [
      { id: "140010", label: "横浜" },
      { id: "140020", label: "小田原" },
    ],
  },
  {
    label: "新潟県",
    cities: [
      { id: "150010", label: "新潟" },
      { id: "150020", label: "長岡" },
      { id: "150030", label: "高田" },
      { id: "150040", label: "相川" },
    ],
  },
  {
    label: "富山県",
    cities: [
      { id: "160010", label: "富山" },
      { id: "160020", label: "伏木" },
    ],
  },
  {
    label: "石川県",
    cities: [
      { id: "170010", label: "金沢" },
      { id: "170020", label: "輪島" },
    ],
  },
  {
    label: "福井県",
    cities: [
      { id: "180010", label: "福井" },
      { id: "180020", label: "敦賀" },
    ],
  },
  {
    label: "山梨県",
    cities: [
      { id: "190010", label: "甲府" },
      { id: "190020", label: "河口湖" },
    ],
  },
  {
    label: "長野県",
    cities: [
      { id: "200010", label: "長野" },
      { id: "200020", label: "松本" },
      { id: "200030", label: "飯田" },
    ],
  },
  {
    label: "岐阜県",
    cities: [
      { id: "210010", label: "岐阜" },
      { id: "210020", label: "高山" },
    ],
  },
  {
    label: "静岡県",
    cities: [
      { id: "220010", label: "静岡" },
      { id: "220020", label: "網代" },
      { id: "220030", label: "三島" },
      { id: "220040", label: "浜松" },
    ],
  },
  {
    label: "愛知県",
    cities: [
      { id: "230010", label: "名古屋" },
      { id: "230020", label: "豊橋" },
    ],
  },
  {
    label: "三重県",
    cities: [
      { id: "240010", label: "津" },
      { id: "240020", label: "尾鷲" },
    ],
  },
  {
    label: "滋賀県",
    cities: [
      { id: "250010", label: "大津" },
      { id: "250020", label: "彦根" },
    ],
  },
  {
    label: "京都府",
    cities: [
      { id: "260010", label: "京都" },
      { id: "260020", label: "舞鶴" },
    ],
  },
  {
    label: "大阪府",
    cities: [{ id: "270000", label: "大阪" }],
  },
  {
    label: "兵庫県",
    cities: [
      { id: "280010", label: "神戸" },
      { id: "280020", label: "豊岡" },
    ],
  },
  {
    label: "奈良県",
    cities: [
      { id: "290010", label: "奈良" },
      { id: "290020", label: "風屋" },
    ],
  },
  {
    label: "和歌山県",
    cities: [
      { id: "300010", label: "和歌山" },
      { id: "300020", label: "潮岬" },
    ],
  },
  {
    label: "鳥取県",
    cities: [
      { id: "310010", label: "鳥取" },
      { id: "310020", label: "米子" },
    ],
  },
  {
    label: "島根県",
    cities: [
      { id: "320010", label: "松江" },
      { id: "320020", label: "浜田" },
      { id: "320030", label: "西郷" },
    ],
  },
  {
    label: "岡山県",
    cities: [
      { id: "330010", label: "岡山" },
      { id: "330020", label: "津山" },
    ],
  },
  {
    label: "広島県",
    cities: [
      { id: "340010", label: "広島" },
      { id: "340020", label: "庄原" },
    ],
  },
  {
    label: "山口県",
    cities: [
      { id: "350010", label: "下関" },
      { id: "350020", label: "山口" },
      { id: "350030", label: "柳井" },
      { id: "350040", label: "萩" },
    ],
  },
  {
    label: "徳島県",
    cities: [
      { id: "360010", label: "徳島" },
      { id: "360020", label: "日和佐" },
    ],
  },
  {
    label: "香川県",
    cities: [{ id: "370000", label: "高松" }],
  },
  {
    label: "愛媛県",
    cities: [
      { id: "380010", label: "松山" },
      { id: "380020", label: "新居浜" },
      { id: "380030", label: "宇和島" },
    ],
  },
  {
    label: "高知県",
    cities: [
      { id: "390010", label: "高知" },
      { id: "390020", label: "室戸岬" },
      { id: "390030", label: "清水" },
    ],
  },
  {
    label: "福岡県",
    cities: [
      { id: "400010", label: "福岡" },
      { id: "400020", label: "八幡" },
      { id: "400030", label: "飯塚" },
      { id: "400040", label: "久留米" },
    ],
  },
  {
    label: "佐賀県",
    cities: [
      { id: "410010", label: "佐賀" },
      { id: "410020", label: "伊万里" },
    ],
  },
  {
    label: "長崎県",
    cities: [
      { id: "420010", label: "長崎" },
      { id: "420020", label: "佐世保" },
      { id: "420030", label: "厳原" },
      { id: "420040", label: "福江" },
    ],
  },
  {
    label: "熊本県",
    cities: [
      { id: "430010", label: "熊本" },
      { id: "430020", label: "阿蘇乙姫" },
      { id: "430030", label: "牛深" },
      { id: "430040", label: "人吉" },
    ],
  },
  {
    label: "大分県",
    cities: [
      { id: "440010", label: "大分" },
      { id: "440020", label: "中津" },
      { id: "440030", label: "日田" },
      { id: "440040", label: "佐伯" },
    ],
  },
  {
    label: "宮崎県",
    cities: [
      { id: "450010", label: "宮崎" },
      { id: "450020", label: "延岡" },
      { id: "450030", label: "都城" },
      { id: "450040", label: "高千穂" },
    ],
  },
  {
    label: "鹿児島県",
    cities: [
      { id: "460010", label: "鹿児島" },
      { id: "460020", label: "鹿屋" },
      { id: "460030", label: "種子島" },
      { id: "460040", label: "名瀬" },
    ],
  },
  {
    label: "沖縄県",
    cities: [
      { id: "471010", label: "那覇" },
      { id: "471020", label: "名護" },
      { id: "471030", label: "久米島" },
      { id: "472000", label: "南大東" },
      { id: "473000", label: "宮古島" },
      { id: "474010", label: "石垣島" },
      { id: "474020", label: "与那国島" },
    ],
  },
];

export const CITY_OPTIONS: CityOption[] = CITY_GROUPS.reduce<CityOption[]>(
  (accumulator, group) => {
    return accumulator.concat(group.cities);
  },
  [],
);

export const DEFAULT_CITY_ID = "400040";

export function findCityOptionById(cityId: string): CityOption | undefined {
  for (const group of CITY_GROUPS) {
    for (const city of group.cities) {
      if (city.id === cityId) {
        return city;
      }
    }
  }

  return undefined;
}

export function findCityGroupByCityId(cityId: string): CityGroup | undefined {
  for (const group of CITY_GROUPS) {
    for (const city of group.cities) {
      if (city.id === cityId) {
        return group;
      }
    }
  }

  return undefined;
}

export function getWeeklyForecastAreaCode(cityId: string): string {
  if (cityId.length < 3) {
    return cityId;
  }

  return `${cityId.slice(0, 3)}000`;
}
