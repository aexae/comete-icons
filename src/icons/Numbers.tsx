import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="m6 20 1-4H3l.5-2h4l1-4h-4L5 8h4l1-4h2l-1 4h4l1-4h2l-1 4h4l-.5 2h-4l-1 4h4l-.5 2h-4l-1 4h-2l1-4H9l-1 4zm3.5-6h4l1-4h-4z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><g clip-path="url(#clip0_620_3067)"><path fill="currentColor" d="m2.667 15.122.889-3.555H0l.444-1.778H4l.889-3.556H1.333l.445-1.777h3.555L6.223.9H8l-.889 3.556h3.556L11.556.9h1.777l-.889 3.556H16l-.444 1.777H12l-.889 3.556h3.556l-.445 1.778h-3.555l-.89 3.555H8l.889-3.555H5.333l-.889 3.555zm3.11-5.333h3.556l.89-3.556H6.666z"/></g></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="m6 20 1-4H3l.5-2h4l1-4h-4L5 8h4l1-4h2l-1 4h4l1-4h2l-1 4h4l-.5 2h-4l-1 4h4l-.5 2h-4l-1 4h-2l1-4H9l-1 4zm3.5-6h4l1-4h-4z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><g clip-path="url(#clip0_620_3069)"><path fill="currentColor" d="m2.667 15.122.889-3.555H0l.444-1.778H4l.889-3.556H1.333l.445-1.777h3.555L6.223.9H8l-.889 3.556h3.556L11.556.9h1.777l-.889 3.556H16l-.444 1.777H12l-.889 3.556h3.556l-.445 1.778h-3.555l-.89 3.555H8l.889-3.555H5.333l-.889 3.555zm3.11-5.333h3.556l.89-3.556H6.666z"/></g></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M19.5 14h-10L9 16h10zm-15-4h10l.5-2H5zM21 8h-4l-.5 2h4z"/><path fill="var(--icon-information)" fillRule="evenodd" d="m6 20 1-4 .5-2 1-4h2l-1 4-.5 2-1 4zm8.5-10-1 4h2l1-4 .5-2 1-4h-2l-1 4zM11 8l1-4h-2L9 8zm1 12 1-4h2l-1 4z" clipRule="evenodd"/><path fill="currentColor" d="M3 16h4l.5-2h-4z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><g clip-path="url(#clip0_620_3071)"><path fill="currentColor" d="M14.667 9.789H5.778l-.445 1.778h8.889zM1.333 6.233h8.889l.445-1.777H1.778zM16 4.456h-3.556L12 6.233h3.556z"/><path fill="var(--icon-information)" fillRule="evenodd" d="m2.667 15.122.889-3.555L4 9.789l.889-3.556h1.778l-.89 3.556-.444 1.778-.889 3.555zm7.555-8.889L9.333 9.79h1.778L12 6.233l.444-1.777.89-3.556h-1.778l-.89 3.556zm-3.11-1.777L8 .9H6.222l-.889 3.556zM8 15.122l.889-3.555h1.778l-.89 3.555z" clipRule="evenodd"/><path fill="currentColor" d="M0 11.567h3.556L4 9.789H.444z"/></g></> }
    }
};

export function Numbers({
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

Numbers.displayName = "Numbers";
