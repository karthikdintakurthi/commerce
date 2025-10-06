import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        luxury: "border-transparent bg-gradient-to-r from-chip-emerald to-chip-gold text-on-emerald",
        jewelry: "border-transparent bg-chip-ruby text-on-ruby",
        emerald: "border-transparent bg-chip-emerald text-on-emerald",
        ruby: "border-transparent bg-chip-ruby text-on-ruby",
        gold: "border-transparent bg-chip-gold text-on-gold",
        sage: "border-transparent bg-chip-sage text-on-sage",
        sand: "border-transparent bg-chip-sand text-on-sand",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
