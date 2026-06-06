import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "border border-border bg-surface-raised p-4 transition-colors hover:bg-gray-800/50",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}