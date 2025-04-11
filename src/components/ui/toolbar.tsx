"use client";

import * as React from "react";
import * as ToolbarPrimitive from "@radix-ui/react-toolbar";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { toggleVariants } from "@/components/ui/toggle";
import { buttonVariants } from "@/components/ui/button";

const ToolbarRoot = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <ToolbarPrimitive.Root
    ref={ref}
    className={cn(
      "flex items-center space-x-1 rounded-md border bg-background p-2.5",
      className
    )}
    {...props}
  />
));
ToolbarRoot.displayName = ToolbarPrimitive.Root.displayName;

const ToolbarToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.ToggleGroup>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.ToggleGroup>
>(({ className, ...props }, ref) => (
  <ToolbarPrimitive.ToggleGroup
    ref={ref}
    className={cn("flex items-center space-x-1", className)}
    {...props}
  />
));
ToolbarToggleGroup.displayName = ToolbarPrimitive.ToggleGroup.displayName;

const ToolbarToggleItem = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.ToggleItem>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.ToggleItem> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <ToolbarPrimitive.ToggleItem
    ref={ref}
    className={cn(
      toggleVariants({
        variant: variant || "default",
        size: size || "default",
      }),
      className
    )}
    {...props}
  />
));
ToolbarToggleItem.displayName = ToolbarPrimitive.ToggleItem.displayName;

const ToolbarButton = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Button>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Button> &
    VariantProps<typeof buttonVariants>
>(({ className, variant, size, ...props }, ref) => (
  <ToolbarPrimitive.Button
    ref={ref}
    className={cn(
      buttonVariants({
        variant: variant || "default",
        size: size || "default",
        className,
      }),
      className
    )}
    {...props}
  />
));
ToolbarButton.displayName = ToolbarPrimitive.Button.displayName;

const ToolbarSeparator = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ToolbarPrimitive.Separator
    ref={ref}
    className={cn("mx-1 h-full w-[1px] bg-border", className)}
    {...props}
  />
));
ToolbarSeparator.displayName = ToolbarPrimitive.Separator.displayName;

const ToolbarLink = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Link>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Link>
>(({ className, ...props }, ref) => (
  <ToolbarPrimitive.Link
    ref={ref}
    className={cn(
      toggleVariants({
        variant: "default",
        size: "default",
      }),
      className
    )}
    {...props}
  />
));
ToolbarLink.displayName = ToolbarPrimitive.Link.displayName;

export {
  ToolbarRoot,
  ToolbarButton,
  ToolbarSeparator,
  ToolbarLink,
  ToolbarToggleGroup,
  ToolbarToggleItem,
};
