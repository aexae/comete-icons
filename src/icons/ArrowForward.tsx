import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M16.175 13H4v-2h12.175l-5.6-5.6L12 4l8 8-8 8-1.425-1.4z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><g clip-path="url(#clip0_620_3376)"><path fill="currentColor" d="M12.175 9H0V7h12.175l-5.6-5.6L8 0l8 8-8 8-1.425-1.4z"/></g></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M16.175 13H4v-2h12.175l-5.6-5.6L12 4l8 8-8 8-1.425-1.4z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><g clip-path="url(#clip0_620_3378)"><path fill="currentColor" d="M12.175 9H0V7h12.175l-5.6-5.6L8 0l8 8-8 8-1.425-1.4z"/></g></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="var(--icon-information)" d="M16.175 13H4v-2h12.175l-5.6-5.6L12 4l8 8-8 8-1.425-1.4z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><g clip-path="url(#clip0_620_3380)"><path fill="var(--icon-information)" d="M12.175 9H0V7h12.175l-5.6-5.6L8 0l8 8-8 8-1.425-1.4z"/></g></> }
    }
};

export function ArrowForward({
  size = 24,
  spacing = "default",
  variant = "outlined",
  color = "default",
  className,
  ...props
}: IconProps) {
  const data = svgData[variant]?.[spacing] ?? svgData.outlined?.["default"];
  if (!data) return null;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={data.viewBox}
      fill="none"
      className={`${getIconClass(color)}${className ? ` ${className}` : ""}`}
      aria-hidden="true"
      {...props}
    >
      {data.paths}
    </svg>
  );
}

ArrowForward.displayName = "ArrowForward";
