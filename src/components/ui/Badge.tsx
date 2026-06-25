interface BadgeProps {
  variant: 'pending' | 'approved' | 'rejected' | 'needs_info' | 'manual_review'
  children: React.ReactNode
  size?: 'sm' | 'md'
}

const VARIANT_CLASSES: Record<BadgeProps['variant'], string> = {
  pending: 'bg-gray-100 text-gray-600 border border-gray-200',
  approved: 'bg-green-50 text-green-700 border border-green-200',
  rejected: 'bg-red-50 text-red-700 border border-red-200',
  needs_info: 'bg-amber-50 text-amber-700 border border-amber-200',
  manual_review: 'bg-blue-50 text-blue-700 border border-blue-200',
}

const SIZE_CLASSES: Record<NonNullable<BadgeProps['size']>, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
}

export function Badge({ variant, children, size = 'sm' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]}`}
    >
      {children}
    </span>
  )
}
