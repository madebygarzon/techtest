import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

type SwitchProps = {
  defaultSelected?: boolean;
  size?: "sm" | "md" | "lg" | "llg";
  color?: "default" | "primary" | "secondary";
  thumbIcon?: React.ReactNode;
} & React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>;

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, defaultSelected, size = "md", color = "default", thumbIcon, ...props }, ref) => {

  const sizeClasses = {
    sm: "h-4 w-8",
    md: "h-5 w-9",
    lg: "h-6 w-11",
    llg: "h-6 w-12",
  };

  const colorClasses = {
    default: "bg-input",
    primary: "bg-primary",
    secondary: "bg-secondary",
  };

  return (
    <SwitchPrimitives.Root
      className={cn(
        "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      defaultChecked={defaultSelected}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
          thumbIcon ? "flex items-center justify-center" : "",
          size === "sm" ? "h-3 w-3" : size === "lg" ? "h-5 w-5" : "h-4 w-4"
        )}
      >
        {thumbIcon}
      </SwitchPrimitives.Thumb>
    </SwitchPrimitives.Root>
  );
});
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
