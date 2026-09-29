import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M8.6 17.4h7.2v-1.8H8.6zm0-3.6h7.2V12H8.6zM6.8 21q-.743 0-1.271-.529A1.73 1.73 0 0 1 5 19.2V4.8q0-.743.529-1.271A1.73 1.73 0 0 1 6.8 3H14l5.4 5.4v10.8q0 .743-.529 1.271A1.73 1.73 0 0 1 17.6 21zm6.3-11.7V4.8H6.8v14.4h10.8V9.3z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M4.8 12.8h6.4v-1.6H4.8zm0-3.2h6.4V8H4.8zM3.2 16a1.54 1.54 0 0 1-1.13-.47 1.54 1.54 0 0 1-.47-1.13V1.6q0-.66.47-1.13A1.54 1.54 0 0 1 3.2 0h6.4l4.8 4.8v9.6q0 .66-.47 1.13a1.54 1.54 0 0 1-1.13.47zM8.8 5.6v-4H3.2v12.8h9.6V5.6z"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M8.6 17.4h7.2v-1.8H8.6zm0-3.6h7.2V12H8.6zM6.8 21q-.743 0-1.271-.529A1.73 1.73 0 0 1 5 19.2V4.8q0-.743.529-1.271A1.73 1.73 0 0 1 6.8 3H14l5.4 5.4v10.8q0 .743-.529 1.271A1.73 1.73 0 0 1 17.6 21zm6.3-11.7h4.5l-4.5-4.5z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M4.8 12.8h6.4v-1.6H4.8zm0-3.2h6.4V8H4.8zM3.2 16a1.54 1.54 0 0 1-1.13-.47 1.54 1.54 0 0 1-.47-1.13V1.6q0-.66.47-1.13A1.54 1.54 0 0 1 3.2 0h6.4l4.8 4.8v9.6q0 .66-.47 1.13a1.54 1.54 0 0 1-1.13.47zM8.8 5.6h4l-4-4z"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M6.6 21q-.743 0-1.271-.529A1.73 1.73 0 0 1 4.8 19.2V4.8q0-.743.529-1.271A1.73 1.73 0 0 1 6.6 3h7.2l5.4 5.4v10.8q0 .743-.529 1.271A1.73 1.73 0 0 1 17.4 21zm6.3-11.7V4.8H6.6v14.4h10.8V9.3z" clipRule="evenodd"/><path fill="var(--icon-information)" d="M8.4 13.8h7.2V12H8.4zm0 3.6h7.2v-1.8H8.4z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M3.2 16a1.54 1.54 0 0 1-1.13-.47 1.54 1.54 0 0 1-.47-1.13V1.6q0-.66.47-1.13A1.54 1.54 0 0 1 3.2 0h6.4l4.8 4.8v9.6q0 .66-.47 1.13a1.54 1.54 0 0 1-1.13.47zM8.8 5.6v-4H3.2v12.8h9.6V5.6z" clipRule="evenodd"/><path fill="var(--icon-information)" d="M4.8 9.6h6.4V8H4.8zm0 3.2h6.4v-1.6H4.8z"/></> }
    }
};

export function Description({
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

Description.displayName = "Description";
