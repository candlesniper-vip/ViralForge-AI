import { motion, HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";
import React from "react";

interface CardProps extends HTMLMotionProps<"div"> {
  glass?: boolean;
}

export function Card({ className, glass = true, children, ...props }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "rounded-2xl border p-6 overflow-hidden relative",
        glass ? "bg-black/40 backdrop-blur-3xl border-white/10" : "bg-neutral-900 border-neutral-800",
        className
      )}
      {...props}
    >
      {/* Subtle top glare */}
      {glass && (
         <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col space-y-1.5 mb-4", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("font-semibold leading-none tracking-tight text-white", className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-neutral-400", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("", className)} {...props} />;
}
