import React from "react";
import { Phone } from "lucide-react";
import "./CallButton.css";

export default function CallButton({ number = "102" }) {
  const callHref = `tel:${number}`;

  function handleClick(e) {
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (!isMobile) {
      e.preventDefault();
      try {
        navigator.clipboard && navigator.clipboard.writeText(number);
      } catch (e) {}
      alert(`Emergency number ${number} copied to clipboard`);
    }
    // on mobile the anchor will trigger the phone app
  }

  return (
    <a
      href={callHref}
      className="floating-call-button"
      onClick={handleClick}
      aria-label={`Call ${number}`}
    >
      <Phone size={20} />
    </a>
  );
}
