import React, { useState, useRef, useEffect } from "react";
import "./FAQ.css";
import { FaArrowAltCircleUp, FaArrowCircleDown, FaArrowDown, FaArrowUp } from "react-icons/fa";

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (open) {
      contentRef.current.style.maxHeight = contentRef.current.scrollHeight + "px";
    } else {
      contentRef.current.style.maxHeight = "0px";
    }
  }, [open]);

  const toggleOpen = () => {
    
    if (open) {
      contentRef.current.style.maxHeight = contentRef.current.scrollHeight + "px"; 
      requestAnimationFrame(() => {
        contentRef.current.style.maxHeight = "0px";
      });
      setOpen(false);
    } else {
      contentRef.current.style.maxHeight = contentRef.current.scrollHeight + "px";
      setOpen(true);
    }
  };

  return (
    <div className="faq-item" onClick={toggleOpen}>
      <div className="faq-question" >
        <span>{question}</span>
        <span className={`arrow ${open ? "rotate" : ""}`}><FaArrowUp/></span>
      </div>
      <div ref={contentRef} className="faq-answer-wrapper">
        <div className="faq-answer">{answer}</div>
      </div>
    </div>
  );
};

export default FAQItem;
