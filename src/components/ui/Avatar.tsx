import { forwardRef } from "react";
import { clsx } from "clsx";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size = "md", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "relative flex shrink-0 overflow-hidden rounded-full",
          {
            "h-8 w-8": size === "sm",
            "h-10 w-10": size === "md",
            "h-12 w-12": size === "lg",
            "h-16 w-16": size === "xl",
          },
          className
        )}
        {...props}
      />
    );
  }
);

Avatar.displayName = "Avatar";

interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

export const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, fallback, alt, ...props }, ref) => {
    return (
      <img
        ref={ref}
        className={clsx("aspect-square h-full w-full object-cover", className)}
        alt={alt}
        onError={(e) => {
          if (fallback) {
            (e.target as HTMLImageElement).src = fallback;
          }
        }}
        {...props}
      />
    );
  }
);

AvatarImage.displayName = "AvatarImage";

export const AvatarFallback = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx(
      "flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-600",
      className
    )}
    {...props}
  />
));

AvatarFallback.displayName = "AvatarFallback";
