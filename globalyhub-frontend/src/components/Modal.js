import React from "react";

const Modal = ({ title, handleCloseModal, children }) => {
  return (
    <div className="overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{title}</h2>
          <i className="fa-regular fa-times" onClick={handleCloseModal}></i>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
