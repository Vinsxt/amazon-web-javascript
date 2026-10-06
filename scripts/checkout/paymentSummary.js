import { cart } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";

export function renderPaymentSummary() {
  let subtotalPriceCents = 0;
  let shippingPriceCents = 0;
  let quantityTotal = 0;

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    subtotalPriceCents += matchingProduct.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

    shippingPriceCents += deliveryOption.priceCents;

    quantityTotal += cartItem.quantity;
  });

  const totalBeforeTax = subtotalPriceCents + shippingPriceCents;
  const taxRate = 0.1;
  const taxAmountPriceCents = totalBeforeTax * taxRate;
  const totalPriceCents = totalBeforeTax + taxAmountPriceCents;

  console.log("Total before tax:", formatCurrency(totalBeforeTax));
  console.log("Tax:", formatCurrency(taxAmountPriceCents));
  console.log("Total:", formatCurrency(totalPriceCents));

  const paymentSummaryHTML = `
    <div class="payment-summary-title">
        Order Summary
    </div>

    <div class="payment-summary-row">
        <div>Items (${quantityTotal}):</div>
        <div class="payment-summary-money">$${formatCurrency(subtotalPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
    </div>

    <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatCurrency(taxAmountPriceCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${formatCurrency(totalPriceCents)}</div>
    </div>

    <button class="place-order-button button-primary">
        Place your order
    </button>
  `;

  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;
}
