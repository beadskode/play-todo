import { type ComponentProps, type RefObject, useId, useRef } from "react";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";

type Props = {
  label: string;
  name?: string;
  ref?: RefObject<HTMLInputElement | null>;
  defaultValue?: string | number | null;
  focus?: boolean;
  //   error?: ValidError | undefined;
  inputClassName?: string;
};

export default function LabelInput({
  label,
  type,
  name,
  ref,
  defaultValue,
  focus,
  //   error,
  placeholder,
  className,
  inputClassName,
  ...props
}: Props & ComponentProps<"input">) {
  const uniqName = useId();
  const inpRef = useRef<HTMLInputElement>(null);
  //   const val = !!error && name && error[name] ? error[name].value?.toString() : "";
  return (
    <div className={cn(className)}>
      <label htmlFor={uniqName} className="font-semibold text-sm capitalize">
        {label}
        <Input
          type={type || "text"}
          id={uniqName}
          name={name || uniqName}
          ref={ref || inpRef}
          //   defaultValue={val || defaultValue}
          placeholder={placeholder || ""}
          className={cn(
            "bg-gray-100 font-normal focus:bg-white",
            // { isActive: 'xx' },
            inputClassName,
          )}
          {...props}
        />
        {/* {err.map(e => (
          <small key={e} className='ml-1 text-red-400'>
            {e}
          </small>
        ))} */}
      </label>
    </div>
  );
}
