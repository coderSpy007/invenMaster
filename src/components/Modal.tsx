import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col bg-white px-[1rem] rounded-lg max-w-lg w-full mb-[2rem]">
        <button
          className="flex justify-end text-2xl text-black hover:text-red-500 transition-transform"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="flex items-center justify-center mb-[2rem]">
            {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
