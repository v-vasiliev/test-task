import { createPortal } from "react-dom";

import "./style.scss";

const Modal = ({ isActive, children, handleClose }) => {
  if (!isActive) return null;

  return createPortal(
    <div className={isActive ? "modal active" : "modal"} onClick={handleClose}>
      <div
        className={isActive ? "modal__content active" : "modal__content"}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="modal__close" onClick={handleClose}>
          ×
        </span>
        {children}
      </div>
    </div>,
    document.getElementById("modal")
  );
};
export default Modal;
