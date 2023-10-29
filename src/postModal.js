import React, { useEffect } from "react";
import "./App.css";

const PostModal = ({ isOpen, onClose }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
   useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <a onClick={onClose} className="close-button">
          X
        </a>
        <div className="modal-content">
       <div class="card">
      <div>
        <h2>
          data from the card
        </h2>
      </div>

       </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;