type BadgeVariant =
  | "neutral"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "primary";

type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

const variantClass: Record<BadgeVariant, string> = {
  neutral: "badge-neutral",
  success: "badge-success",
  warning: "badge-warning",
  danger: "badge-danger",
  info: "badge-info",
  primary: "badge-primary",
};

const Badge = ({ children, variant = "neutral", className = "" }: BadgeProps) => (
  <span className={`${variantClass[variant]} ${className}`}>{children}</span>
);

export const borrowStatusVariant = (
  status: string,
): BadgeVariant => {
  switch (status) {
    case "Borrowed":
      return "warning";
    case "Returned":
      return "success";
    case "Return Requested":
      return "info";
    case "Overdue":
      return "danger";
    default:
      return "neutral";
  }
};

export default Badge;
