import { Check } from "lucide-react";
import { ReactNode } from "react";

interface CheckboxProps {
  id: string;
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: ReactNode;
  title?: string;
  containerClassName?: string;
  labelClassName?: string;
  checkboxClassName?: string;
}

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function Checkbox({
  id,
  name,
  checked,
  onChange,
  label,
  title,
  containerClassName,
  labelClassName,
  checkboxClassName,
}: CheckboxProps) {
  return (
    <div title={title} className={containerClassName}>
      <div className="relative h-4 w-4 shrink-0">
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className={joinClasses(
            "block h-4 w-4 appearance-none cursor-pointer rounded-[4px] border border-neutral-500 bg-transparent checked:border-[#f5b041] checked:bg-[#f5b041] focus:outline-none",
            checkboxClassName,
          )}
        />
        {checked && (
          <Check
            size={12}
            strokeWidth={3}
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-black"
          />
        )}
      </div>
      {label ? (
        <label htmlFor={id} className={labelClassName}>
          {label}
        </label>
      ) : null}
    </div>
  );
}
