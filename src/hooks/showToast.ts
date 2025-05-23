import { addToast } from "@heroui/react";

 
export const showToast = (
  type: "success" | "warning" | "danger",
  message: string
) =>
  addToast({
    title: type.charAt(0).toUpperCase() + type.slice(1),
    description: message,
    color: type,
    severity: type,
    icon: "info",
    shouldShowTimeoutProgress: true,
    classNames: {
      title: " font-semibold",
      description: " text-secondaryColor-900",
    },
  });
