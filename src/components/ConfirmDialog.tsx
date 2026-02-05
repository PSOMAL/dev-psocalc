import Styles from "@/styles/ConfirmDialog.module.css";

interface ConfirmDialogProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  items?: string[];
  question?: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog = ({
  isOpen,
  title,
  message,
  items,
  question,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  if (!isOpen) return null;

  return (
    <div className={Styles.backdrop} role="dialog" aria-modal="true">
      <div className={Styles.dialog}>
        {title && <h2 className={Styles.title}>{title}</h2>}
        {message && <p className={Styles.message}>{message}</p>}
        {items && items.length > 0 && (
          <ul className={Styles.list}>
            {items.map((item) => (
              <li key={item} className={Styles.listItem}>
                {item}
              </li>
            ))}
          </ul>
        )}
        {question && <p className={Styles.question}>{question}</p>}
        <div className={Styles.actions}>
          <button className={Styles.cancelButton} onClick={onCancel}>
            {cancelText}
          </button>
          <button className={Styles.confirmButton} onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
