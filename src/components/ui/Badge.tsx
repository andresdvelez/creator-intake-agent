export type BadgeVariant =
  | "pending"
  | "approved"
  | "rejected"
  | "needs_info"
  | "manual_review";

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  size?: "sm" | "md";
}

const VARIANT_CLASSES: Record<BadgeProps["variant"], string> = {
  pending: "bg-gray-100 text-gray-500",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-600",
  needs_info: "bg-amber-100 text-amber-700",
  manual_review: "bg-blue-100 text-blue-700",
};

const SIZE_CLASSES: Record<NonNullable<BadgeProps["size"]>, string> = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-2.5 py-1 text-xs",
};

export function Badge({ variant, children, size = "sm" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]}`}
    >
      {children}
    </span>
  );
}
