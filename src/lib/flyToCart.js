export function flyToCart(fromElement, imageUrl) {
  if (typeof window === "undefined" || !fromElement) {
    return;
  }

  const cartElement = document.querySelector("[data-cart-anchor='true']");
  if (!cartElement) {
    return;
  }

  const fromRect = fromElement.getBoundingClientRect();
  const toRect = cartElement.getBoundingClientRect();

  const token = document.createElement("div");
  token.className = "fly-cart-token";
  token.style.left = `${fromRect.left + fromRect.width / 2 - 20}px`;
  token.style.top = `${fromRect.top + fromRect.height / 2 - 20}px`;

  if (imageUrl) {
    token.style.backgroundImage = `url('${imageUrl}')`;
    token.style.backgroundSize = "cover";
    token.style.backgroundPosition = "center";
  } else {
    token.style.background = "hsl(var(--primary))";
  }

  document.body.appendChild(token);

  requestAnimationFrame(() => {
    token.style.transform = `translate(${toRect.left + toRect.width / 2 - (fromRect.left + fromRect.width / 2)}px, ${
      toRect.top + toRect.height / 2 - (fromRect.top + fromRect.height / 2)
    }px) scale(0.25)`;
    token.style.opacity = "0.1";
  });

  cartElement.classList.add("cart-bump");
  window.setTimeout(() => {
    cartElement.classList.remove("cart-bump");
  }, 420);

  window.setTimeout(() => {
    token.remove();
  }, 650);
}
