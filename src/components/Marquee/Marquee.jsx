import React from "react";
import "./Marquee.css";

export default function Marquee({
  text = "To jest tekst przewijany od prawej do lewej ✨",
  speed = 20,       // sekundy na pełny cykl
  gap = 48          // odstęp między duplikatami (px)
}) {
  return (
    <div
      className="marquee"
      style={{
        "--duration": `${speed}s`,
        "--gap": `${gap}px`
      }}
      aria-label={text}
    >
      <div className="marquee__track">
        <div className="marquee__group">
          <span className="marquee__item">{text}</span>
        </div>
        {/* Drugi, ukryty dla czytników — zapewnia płynność pętli */}
        <div className="marquee__group" aria-hidden="true">
          <span className="marquee__item">{text}</span>
        </div>
      </div>
    </div>
  );
}
