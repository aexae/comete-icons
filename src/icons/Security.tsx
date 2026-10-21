import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="m20 5-8-3-8 3v6.1q0 3.8 2.263 6.913Q8.525 21.124 12 22q3.476-.875 5.738-3.988T20 11.1zm-8 14.9V4.125l-5.95 2.25V12a9.87 9.87 0 0 0 1.9 4.938Q9.575 19.15 12 19.9" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M14.4 2.4 8 0 1.6 2.4v4.88q0 3.04 1.81 5.53T8 16q2.78-.7 4.59-3.19t1.81-5.53zM8 14.32V1.7L3.24 3.5V8a7.9 7.9 0 0 0 1.52 3.95q1.3 1.77 3.24 2.37" clipRule="evenodd"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="m20 5-8-3-8 3v6.1q0 3.8 2.263 6.913Q8.525 21.124 12 22q3.476-.875 5.738-3.988T20 11.1zm-8 14.9V4.125l-5.95 2.25V12a9.87 9.87 0 0 0 1.9 4.938Q9.575 19.15 12 19.9" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M14.4 2.4 8 0 1.6 2.4v4.88q0 3.04 1.81 5.53T8 16q2.78-.7 4.59-3.19t1.81-5.53zM8 14.32V1.7L3.24 3.5V8a7.9 7.9 0 0 0 1.52 3.95q1.3 1.77 3.24 2.37" clipRule="evenodd"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="var(--icon-information)" fillRule="evenodd" d="m20 5-8-3-8 3v6.1q0 3.8 2.262 6.913Q8.525 21.124 12 22q3.475-.875 5.737-3.988T20 11.1zm-8 14.9V4.125l-5.95 2.25V12a9.87 9.87 0 0 0 1.9 4.938Q9.574 19.15 12 19.9" clipRule="evenodd"/><path fill="currentColor" fillRule="evenodd" d="M12 2 4 5v6.1q0 3.8 2.262 6.913Q8.525 21.124 12 22q3.475-.875 5.737-3.988T20 11.1V5zm0 2.125V19.9q2.425-.75 4.05-2.962A9.87 9.87 0 0 0 17.95 12V6.375zM12 19.9V4.125l-5.95 2.25V12a9.87 9.87 0 0 0 1.9 4.938Q9.574 19.15 12 19.9" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="var(--icon-information)" fillRule="evenodd" d="M14.4 2.4 8 0 1.6 2.4v4.88q0 3.04 1.81 5.53T8 16q2.78-.7 4.59-3.19t1.81-5.53zM8 14.32V1.7L3.24 3.5V8a7.9 7.9 0 0 0 1.52 3.95q1.3 1.77 3.24 2.37" clipRule="evenodd"/><path fill="currentColor" fillRule="evenodd" d="M8 0 1.6 2.4v4.88q0 3.04 1.81 5.53T8 16q2.78-.7 4.59-3.19t1.81-5.53V2.4zm0 1.7v12.62q1.94-.6 3.24-2.37A7.9 7.9 0 0 0 12.76 8V3.5zm0 12.62V1.7L3.24 3.5V8a7.9 7.9 0 0 0 1.52 3.95q1.3 1.77 3.24 2.37" clipRule="evenodd"/></> }
    }
};

export function Security({
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

Security.displayName = "Security";
