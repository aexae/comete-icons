import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M8 21H6v-3.126a4.002 4.002 0 0 1 0-7.748V8.883L1.309 4.191 2.742 2.75l18.559 18.566-1.438 1.434L18 20.886V21h-2v-2.115l-5.002-5.002L11 14a4 4 0 0 1-3 3.874zm1-7a2 2 0 1 0-4 0 2 2 0 0 0 4 0m7-11h2v3.126a4.002 4.002 0 0 1 0 7.748v1.264l-4.998-5A4.005 4.005 0 0 1 16 6.127zm1 5a2 2 0 1 0 0 4 2 2 0 0 0 0-4" clipRule="evenodd"/><path fill="currentColor" d="M6 3h2v2.134l-2-2z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="m10.048 6.618 1.614 1.614h1.755V6.618zM6.013 2.583l1.614 1.614h8.212V2.583z" clipRule="evenodd"/><path fill="currentColor" d="M0 1.15 1.15 0 16 14.85 14.85 16l-4.66-4.66v.927H6.96v-1.614h2.543L7.082 8.232h-3.35V6.618h1.736L3.047 4.197H1.31V2.583h.122z"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="m13.86 11.022 2.017 2.018h2.195v-2.018zM8.816 5.978l2.017 2.018h10.265V5.978z" clipRule="evenodd"/><path fill="currentColor" d="M1.3 4.188 2.737 2.75 21.3 21.312l-1.438 1.438-5.826-5.826v1.16h-4.035v-2.017h3.178l-3.027-3.027H5.966v-2.018h2.169L5.108 7.996H2.94V5.978h.151z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="m10.048 6.618 1.614 1.614h1.755V6.618zM6.013 2.583l1.614 1.614h8.212V2.583z" clipRule="evenodd"/><path fill="currentColor" d="M0 1.15 1.15 0 16 14.85 14.85 16l-4.66-4.66v.927H6.96v-1.614h2.543L7.082 8.232h-3.35V6.618h1.736L3.047 4.197H1.31V2.583h.122z"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="m13.86 11.022 2.017 2.018h2.195v-2.018zM8.816 5.978l2.017 2.018h10.265V5.978z" clipRule="evenodd"/><path fill="var(--icon-critical)" d="M2.737 2.75 1.3 4.188l1.79 1.79 2.018 2.018 3.027 3.026 2.017 2.018 3.027 3.027.857.857 5.826 5.826 1.438-1.438z"/><path fill="currentColor" d="M10 16.067v2.017h4.036v-1.16l-.857-.857zm-4.034-5.045v2.018h4.186l-2.017-2.018zM2.94 5.978v2.018h2.168L3.09 5.978z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="m10.048 6.618 1.614 1.614h1.755V6.618zM6.013 2.583l1.614 1.614h8.212V2.583z" clipRule="evenodd"/><path fill="var(--icon-critical)" d="M1.15 0 0 1.15l1.433 1.433 1.614 1.614 2.42 2.42 1.615 1.615 2.421 2.421.686.686L14.85 16 16 14.85z"/><path fill="currentColor" d="M6.96 10.653v1.614h3.23v-.928l-.687-.686zM3.733 6.618v1.614h3.349L5.468 6.618zM1.311 2.583v1.614h1.736L1.433 2.583z"/></> }
    }
};

export function FilterListOff({
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

FilterListOff.displayName = "FilterListOff";
