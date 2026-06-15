import { X } from "lucide-react";
import { useEffect } from "react";

type ModalSize = "sm" | "md" | "lg";

type ModalProps = {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  onClose: () => void;
  size?: ModalSize;
  icon?: React.ReactNode;
};

const sizeClass: Record<ModalSize, string> = {
  sm: "modal-panel-sm",
  md: "modal-panel-md",
  lg: "modal-panel-lg",
};

const Modal = ({
  title,
  children,
  footer,
  onClose,
  size = "md",
  icon,
}: ModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-backdrop" onClick={onClose} aria-hidden />
      <div className={`${sizeClass[size]} custom-scrollbar`}>
        <div className="modal-header">
          <div className="flex items-center gap-2.5 min-w-0">
            {icon}
            <h2 id="modal-title" className="modal-title truncate">
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="btn-icon shrink-0"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
