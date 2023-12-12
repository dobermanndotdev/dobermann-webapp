import { ComponentPropsWithoutRef } from "react";

interface Props extends ComponentPropsWithoutRef<"input"> {
  label?: string;
  error?: string;
}

export function InputField({ label, error, ...props }: Props) {
  return (
    <label className="form-control w-full">
      {!!label && (
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
      )}
      <input {...props} className="input input-bordered w-full" />
      {error && (
        <div className="label">
          <span className="label-text-alt text-red-700">{error}</span>
        </div>
      )}
    </label>
  );
}
