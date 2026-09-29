import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M7.222 15V8.778H1V7.222h6.222V1h1.556v6.222H15v1.556H8.778V15z"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M7.222 15V8.778H1V7.222h6.222V1h1.556v6.222H15v1.556H8.778V15z"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="var(--icon-success)" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="var(--icon-success)" d="M7.222 15V8.778H1V7.222h6.222V1h1.556v6.222H15v1.556H8.778V15z"/></> }
    }
};

export function Add({
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

Add.displayName = "Add";
