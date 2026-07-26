export function formatPrice(price: number) {
  return new Intl.NumberFormat("zh-TW").format(price);
}
