import { ComponentPropsWithoutRef } from "react";

interface Props extends ComponentPropsWithoutRef<"select"> {
  label?: string;
  error?: string;
}

export function Select({ label, error, className, children, ...props }: Props) {
  return (
    <label className="form-control w-full">
      {!!label && (
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
      )}
      <select {...props} className={`select select-bordered w-full ${className}`}>
        {children}
      </select>
      {error && (
        <div className="label">
          <span className="label-text-alt text-red-700">{error}</span>
        </div>
      )}
    </label>
  );
}

interface SelectOptionProps extends ComponentPropsWithoutRef<"option"> {}

export function SelectOption({ children, ...props }: SelectOptionProps) {
  return <option {...props}>{children}</option>;
}
