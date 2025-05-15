import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import style from "./style.module.css";

type ModalProps = ContainerComponentProps & {
  title: string;
  closeOnBackdropClick?: boolean;
  onClose: () => void;
  footerEl: ReactNode;
};

const Modal = ({
  children,
  title,
  closeOnBackdropClick = true,
  onClose,
  footerEl,
}: ModalProps) => {
  const handleBackdropClick = (event: React.MouseEvent) => {
    closeOnBackdropClick && event.target === event.currentTarget && onClose();
  };
  return createPortal(
    <div className={style.backdrop} onClick={handleBackdropClick}>
      <div className={style.modal}>
        <div className={style.header}>
          <p className={style.title}>{title}</p>
          <button className={style.go_back} onClick={onClose}>
            Go Back
          </button>
        </div>
        <div className={style.content}>{children}</div>
        <div className={style.footer}>{footerEl}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
