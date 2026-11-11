import type { ReactNode } from "react";

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}

// Etiket + alan + hata mesajını tek yerde toplar
function FormField({ id, label, error, children }: FormFieldProps) {
  return (
    <div className="alan">
      <label htmlFor={id}>{label}</label>
      {children}
      {error && (
        <span className="hata-mesaji" id={`${id}-hata`}>
          {error}
        </span>
      )}
    </div>
  );
}

export default FormField;
