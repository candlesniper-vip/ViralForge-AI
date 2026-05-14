import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'glass' | 'neon';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    
    const variants = {
      default: "bg-white text-black hover:bg-neutral-200 shadow-sm",
      outline: "border border-neutral-700 bg-transparent hover:bg-neutral-800 text-white",
      ghost: "hover:bg-white/10 text-neutral-300 hover:text-white",
      glass: "bg-white/5 border border-white/10 backdrop-blur-md text-white hover:bg-white/10 shadow-[0_4px_24px_-8px_rgba(255,255,255,0.1)]",
      neon: "bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] hover:bg-indigo-500 border border-indigo-400/30 transition-all duration-300",
    }
    
    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3 text-xs",
      lg: "h-12 rounded-full px-8 text-base",
      icon: "h-10 w-10",
    }
    
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
