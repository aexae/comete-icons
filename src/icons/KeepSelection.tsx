import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M7 19v2h2v-2zM3 5h2V3q-.824 0-1.412.587A1.93 1.93 0 0 0 3 5m4-2v2h2V3zm4 0v2h2V3zm4 0v2h2V3zm4 0v2h2q0-.824-.587-1.412A1.93 1.93 0 0 0 19 3M5 21v-2H3q0 .824.587 1.413Q4.176 21 5 21m-2-6v2h2v-2zm0-4v2h2v-2zm0-4v2h2V7zm16 0v2h2V7z" clipRule="evenodd"/><path fill="currentColor" d="M14.552 19.5 21 13.532 19.345 12l-4.822 4.463-2.397-2.218L10.5 15.75z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M3.556 14.222V16h1.777v-1.778zM0 1.778h1.778V0Q1.044 0 .522.522A1.7 1.7 0 0 0 0 1.778M3.556 0v1.778h1.777V0zM7.11 0v1.778h1.78V0zm3.556 0v1.778h1.777V0zm3.555 0v1.778H16q0-.734-.522-1.256A1.7 1.7 0 0 0 14.222 0M1.778 16v-1.778H0q0 .734.522 1.256T1.778 16M0 10.667v1.777h1.778v-1.777zM0 7.11v1.78h1.778V7.11zm0-3.555v1.777h1.778V3.556zm14.222 0v1.777H16V3.556z" clipRule="evenodd"/><path fill="currentColor" d="M10.268 14.667 16 9.362 14.529 8l-4.286 3.967-2.13-1.972-1.446 1.338z"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M7 19v2h2v-2zM3 5h2V3q-.824 0-1.412.587A1.93 1.93 0 0 0 3 5m4-2v2h2V3zm4 0v2h2V3zm4 0v2h2V3zm4 0v2h2q0-.824-.587-1.412A1.93 1.93 0 0 0 19 3M5 21v-2H3q0 .824.587 1.413Q4.176 21 5 21m-2-6v2h2v-2zm0-4v2h2v-2zm0-4v2h2V7zm16 0v2h2V7z" clipRule="evenodd"/><path fill="currentColor" d="M14.552 19.5 21 13.532 19.345 12l-4.822 4.463-2.397-2.218L10.5 15.75z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M3.556 14.222V16h1.777v-1.778zM0 1.778h1.778V0Q1.044 0 .522.522A1.7 1.7 0 0 0 0 1.778M3.556 0v1.778h1.777V0zM7.11 0v1.778h1.78V0zm3.556 0v1.778h1.777V0zm3.555 0v1.778H16q0-.734-.522-1.256A1.7 1.7 0 0 0 14.222 0M1.778 16v-1.778H0q0 .734.522 1.256T1.778 16M0 10.667v1.777h1.778v-1.777zM0 7.11v1.78h1.778V7.11zm0-3.555v1.777h1.778V3.556zm14.222 0v1.777H16V3.556z" clipRule="evenodd"/><path fill="currentColor" d="M10.268 14.667 16 9.362 14.529 8l-4.286 3.967-2.13-1.972-1.446 1.338z"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M7 19v2h2v-2zM3 5h2V3q-.824 0-1.412.587A1.93 1.93 0 0 0 3 5m4-2v2h2V3zm4 0v2h2V3zm4 0v2h2V3zm4 0v2h2q0-.824-.587-1.412A1.93 1.93 0 0 0 19 3M5 21v-2H3q0 .824.587 1.413Q4.176 21 5 21m-2-6v2h2v-2zm0-4v2h2v-2zm0-4v2h2V7zm16 0v2h2V7z" clipRule="evenodd"/><path fill="var(--icon-success)" d="M14.552 19.5 21 13.532 19.345 12l-4.822 4.463-2.397-2.218L10.5 15.75z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M3.556 14.222V16h1.777v-1.778zM0 1.778h1.778V0Q1.044 0 .522.522A1.7 1.7 0 0 0 0 1.778M3.556 0v1.778h1.777V0zM7.11 0v1.778h1.78V0zm3.556 0v1.778h1.777V0zm3.555 0v1.778H16q0-.734-.522-1.256A1.7 1.7 0 0 0 14.222 0M1.778 16v-1.778H0q0 .734.522 1.256T1.778 16M0 10.667v1.777h1.778v-1.777zM0 7.11v1.78h1.778V7.11zm0-3.555v1.777h1.778V3.556zm14.222 0v1.777H16V3.556z" clipRule="evenodd"/><path fill="var(--icon-success)" d="M10.268 14.667 16 9.362 14.529 8l-4.286 3.967-2.13-1.972-1.446 1.338z"/></> }
    }
};

export function KeepSelection({
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

KeepSelection.displayName = "KeepSelection";
