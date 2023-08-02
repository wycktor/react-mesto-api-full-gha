import { useEffect } from 'react';

export default function useClosePopup(isOpen, onClose) {
  useEffect(() => {
    if (!isOpen) return;

    const isPopupOverlay = evt => {
      if (evt.target.classList.contains('popup_opened')) {
        onClose();
      }
    };

    const handleEscClose = evt => {
      if (evt.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscClose);
    document.addEventListener('click', isPopupOverlay);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
      document.removeEventListener('click', isPopupOverlay);
    };
  }, [isOpen, onClose]);
}
