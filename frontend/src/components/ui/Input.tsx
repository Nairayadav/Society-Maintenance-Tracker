interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({
  label,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}

      <input
        className={`w-full rounded-xl border border-slate-300 p-3 focus:border-indigo-500 focus:outline-none ${className}`}
        {...props}
      />
    </div>
  );
}