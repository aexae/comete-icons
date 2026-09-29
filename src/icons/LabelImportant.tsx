import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="m3 19 5.4-7L3 5h11.7q.428 0 .81.186t.63.514L21 12l-4.86 6.3q-.247.328-.63.514a1.8 1.8 0 0 1-.81.186zm3.6-1.75h8.1L18.75 12 14.7 6.75H6.6L10.65 12z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M0 14.4 4.8 8 0 1.6h10.4a1.59 1.59 0 0 1 1.28.64L16 8l-4.32 5.76q-.22.3-.56.47a1.6 1.6 0 0 1-.72.17zm3.2-1.6h7.2L14 8l-3.6-4.8H3.2L6.8 8z"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="m3 19 5.4-7L3 5h11.7q.428 0 .81.186t.63.514L21 12l-4.86 6.3q-.247.328-.63.514a1.8 1.8 0 0 1-.81.186z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M0 14.4 4.8 8 0 1.6h10.4a1.59 1.59 0 0 1 1.28.64L16 8l-4.32 5.76q-.22.3-.56.47a1.6 1.6 0 0 1-.72.17z"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="var(--icon-information)" d="M4 20q-.824 0-1.412-.587A1.93 1.93 0 0 1 2 18V6q0-.824.587-1.412A1.93 1.93 0 0 1 4 4h11a1.99 1.99 0 0 1 1.6.8L22 12l-5.4 7.2q-.275.375-.7.588A2 2 0 0 1 15 20zm0-2h11l4.5-6L15 6H4z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M0 1.6 4.8 8h2L3.2 3.2h7.2L14 8h2l-4.32-5.76a1.59 1.59 0 0 0-1.28-.64z" clipRule="evenodd"/><path fill="var(--icon-information)" d="M4.8 8 0 14.4h10.4a1.59 1.59 0 0 0 1.28-.64L16 8h-2l-3.6 4.8H3.2L6.8 8z"/></> }
    }
};

export function LabelImportant({
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

LabelImportant.displayName = "LabelImportant";
