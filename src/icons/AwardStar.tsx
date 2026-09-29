import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="m9.375 16.55 2.925-1.775 2.925 1.775-.775-3.325 2.6-2.25-3.425-.275L12.3 7.55l-1.325 3.15-3.425.275 2.6 2.25zM12.3 23.6l-3.35-3.3H4.3v-4.65L1 12.3l3.3-3.35V4.3h4.65L12.3 1l3.35 3.3h4.65v4.65l3.3 3.35-3.3 3.35v4.65h-4.65zm0-2.8 2.5-2.5h3.5v-3.5l2.5-2.5-2.5-2.5V6.3h-3.5l-2.5-2.5-2.5 2.5H6.3v3.5l-2.5 2.5 2.5 2.5v3.5h3.5z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M5.93 11.009 8 9.752l2.07 1.257-.548-2.354 1.84-1.593-2.424-.195L8 4.637l-.938 2.23-2.425.195 1.84 1.593zM8 16l-2.372-2.336H2.336v-3.292L0 8l2.336-2.372V2.336h3.292L8 0l2.372 2.336h3.292v3.292L16 8l-2.336 2.372v3.292h-3.292zm0-1.982 1.77-1.77h2.478V9.77L14.018 8l-1.77-1.77V3.752H9.77L8 1.982l-1.77 1.77H3.752V6.23L1.982 8l1.77 1.77v2.478H6.23z"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="m9.375 16.55 2.925-1.775 2.925 1.775-.775-3.325 2.6-2.25-3.425-.275L12.3 7.55l-1.325 3.15-3.425.275 2.6 2.25zM12.3 23.6l-3.35-3.3H4.3v-4.65L1 12.3l3.3-3.35V4.3h4.65L12.3 1l3.35 3.3h4.65v4.65l3.3 3.35-3.3 3.35v4.65h-4.65z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M5.93 11.009 8 9.752l2.07 1.257-.548-2.354 1.84-1.593-2.424-.195L8 4.637l-.938 2.23-2.425.195 1.84 1.593zM8 16l-2.372-2.336H2.336v-3.292L0 8l2.336-2.372V2.336h3.292L8 0l2.372 2.336h3.292v3.292L16 8l-2.336 2.372v3.292h-3.292z"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="m8.95 20.3 3.35 3.3 3.35-3.3h4.65v-4.65l3.3-3.35-3.3-3.35V4.3h-4.65L12.3 1 8.95 4.3H4.3v4.65L1 12.3l3.3 3.35v4.65zm5.85-2-2.5 2.5-2.5-2.5H6.3v-3.5l-2.5-2.5 2.5-2.5V6.3h3.5l2.5-2.5 2.5 2.5h3.5v3.5l2.5 2.5-2.5 2.5v3.5z" clipRule="evenodd"/><path fill="currentColor" d="m9.375 16.55 2.925-1.775 2.925 1.775-.775-3.325 2.6-2.25-3.425-.275L12.3 7.55l-1.325 3.15-3.425.275 2.6 2.25z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M5.628 13.664 8 16l2.372-2.336h3.292v-3.292L16 8l-2.336-2.372V2.336h-3.292L8 0 5.628 2.336H2.336v3.292L0 8l2.336 2.372v3.292zm4.142-1.416L8 14.018l-1.77-1.77H3.752V9.77L1.982 8l1.77-1.77V3.752H6.23L8 1.982l1.77 1.77h2.478V6.23L14.018 8l-1.77 1.77v2.478z" clipRule="evenodd"/><path fill="currentColor" d="M5.93 11.009 8 9.752l2.07 1.257-.548-2.354 1.84-1.593-2.424-.195L8 4.637l-.938 2.23-2.425.195 1.84 1.593z"/></> }
    }
};

export function AwardStar({
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

AwardStar.displayName = "AwardStar";
