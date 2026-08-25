"use client";

import { useState } from "react";

export default function ProductPurchase() {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  return (
    <div className="purchase-panel">
      <p className="launch-price">Price configured at Shopify launch</p>
      <div className="purchase-row">
        <div className="quantity-control" aria-label="Quantity selector">
          <button onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity">−</button>
          <output aria-live="polite">{quantity}</output>
          <button onClick={() => setQuantity((value) => value + 1)} aria-label="Increase quantity">+</button>
        </div>
        <button className="add-to-bag" onClick={() => setAdded(true)}>
          {added ? "Added · Demo" : "Add to bag"}
        </button>
      </div>
      <p className="purchase-note">Checkout remains in demonstration mode until Shopify is connected.</p>
    </div>
  );
}
