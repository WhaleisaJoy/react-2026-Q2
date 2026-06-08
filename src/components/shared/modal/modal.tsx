import { useEffect, useRef, type PropsWithChildren } from 'react';
import './modal.scss';
import { createPortal } from 'react-dom';

interface Props {
  isOpen: boolean;
  title: string;
  onClose: () => void;
}

export function Modal({ isOpen, title, onClose, children }: PropsWithChildren<Props>) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      className="modal-overlay"
      onClose={onClose}
      onClick={(e) => e.target === dialogRef.current && onClose()}
    >
      <div className="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <header className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button
            className="modal-close"
            onClick={() => {
              dialogRef.current?.close();
              onClose();
            }}
          >
            ×
          </button>
        </header>
        {children}
      </div>
    </dialog>,
    document.body
  );
}
