interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'warning' | 'successFilled' | 'warningFilled' | 'dangerFilled'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  children: React.ReactNode
}

const VARIANT_CLASSES: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-[#ff5a00] text-white hover:bg-[#e64f00] active:bg-[#cc4600] shadow-sm',
  secondary:
    'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 active:bg-gray-100 shadow-sm',
  ghost: 'text-gray-600 hover:bg-gray-100 active:bg-gray-200',
  danger:
    'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 active:bg-red-200',
  success:
    'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 active:bg-green-200',
  warning:
    'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 active:bg-amber-200',
  successFilled: 'bg-green-500 text-white shadow-sm',
  warningFilled: 'bg-amber-400 text-white shadow-sm',
  dangerFilled:  'bg-red-500  text-white shadow-sm',
}

const SIZE_CLASSES: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
  lg: 'px-5 py-2.5 text-sm gap-2',
}

export function Button({
  variant = 'secondary',
  size = 'md',
  isLoading = false,
  disabled,
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled ?? isLoading}
      className={`inline-flex items-center justify-center rounded-xl font-medium transition-colors duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ff5a00]/30 disabled:opacity-40 disabled:cursor-not-allowed ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className="h-3.5 w-3.5 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Analyzing…
        </>
      ) : (
        children
      )}
    </button>
  )
}
