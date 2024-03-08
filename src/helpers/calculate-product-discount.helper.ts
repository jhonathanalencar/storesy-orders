export function calculateProductDiscount(
  productPrice: number,
  discountPercent: number,
) {
  const discount = productPrice * (discountPercent / 100);
  const priceWithDiscount = productPrice - discount;
  return priceWithDiscount;
}
