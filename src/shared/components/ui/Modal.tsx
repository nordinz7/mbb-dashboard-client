import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'lg',
}) => {
  return (
    <>
      {/* Modal */}
      <dialog className={`modal ${isOpen ? 'modal-open' : ''}`}>
        <div
          className={`modal-box ${size === 'xl' ? 'max-w-5xl' : size === 'lg' ? 'max-w-3xl' : size === 'md' ? 'max-w-2xl' : 'max-w-md'}`}
        >
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">{title}</h3>
            <button
              className="btn btn-sm btn-circle btn-ghost"
              onClick={onClose}
            >
              ✕
            </button>
          </div>

          {/* Modal Content */}
          <div className="py-4">{children}</div>
        </div>

        {/* Modal backdrop */}
        <form method="dialog" className="modal-backdrop">
          <button onClick={onClose}>close</button>
        </form>
      </dialog>
    </>
  );
};

export default Modal;
