// components/Modal.tsx
'use client'; // This component uses client-side hooks and interacts with the DOM

import React, { useEffect, ReactNode } from 'react';
import './Modal.css'; // Assuming this path is correct and Modal.css is in the same directory

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.classList.add('modal-open-react'); // For global scroll lock style
      document.addEventListener('keydown', handleEscapeKey);
    } else {
      document.body.classList.remove('modal-open-react');
    }

    return () => {
      document.body.classList.remove('modal-open-react');
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={`modal-overlay-react ${isOpen ? 'active' : ''}`}
      onClick={onClose} // Close when overlay is clicked
    >
      <div
        className="modal-content-react"
        onClick={(e) => e.stopPropagation()} // Prevent closing when content is clicked
      >
        <button
          className="modal-close-btn-react"
          aria-label="Close modal"
          onClick={onClose}
        >
          &times; {/* Close icon */}
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
