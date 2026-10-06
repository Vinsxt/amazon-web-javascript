import { cart } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";


export function renderPaymentSummary() {
  let subtotalPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    subtotalPriceCents += matchingProduct.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

    shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTax = subtotalPriceCents + shippingPriceCents;
  const taxRate = 0.1;
  const taxAmountPriceCents = totalBeforeTax * taxRate;
  const totalPriceCents = totalBeforeTax + taxAmountPriceCents;

  console.log("Total before tax:", formatCurrency(totalBeforeTax));
  console.log("Tax:", formatCurrency(taxAmountPriceCents));
  console.log("Total:", formatCurrency(totalPriceCents));
}
