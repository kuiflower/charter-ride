/**
 * 右下角客服浮動按鈕連結設定。
 * 之後把各渠道正式連結填進 href 即可；留空則點擊會提示「即將開放」。
 *
 * 範例：
 * - LINE: https://line.me/R/ti/p/@xxxxx
 * - WhatsApp: https://wa.me/819012345678
 * - WeChat: 可填官方頁或稍後改為顯示二維碼
 * - KakaoTalk: https://open.kakao.com/o/xxxxx
 */
export type ContactChannel = {
  id: "line" | "whatsapp" | "wechat" | "kakaotalk";
  label: string;
  href: string;
};

export const CONTACT_CHANNELS: ContactChannel[] = [
  {
    id: "line",
    label: "LINE",
    href: "",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: "",
  },
  {
    id: "wechat",
    label: "微信",
    href: "",
  },
  {
    id: "kakaotalk",
    label: "KakaoTalk",
    href: "",
  },
];
