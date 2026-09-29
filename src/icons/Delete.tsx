import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M7 21q-.824 0-1.412-.587A1.93 1.93 0 0 1 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .824-.587 1.413A1.93 1.93 0 0 1 17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M3.556 16q-.735 0-1.256-.522a1.7 1.7 0 0 1-.522-1.256V2.667h-.89V.889h4.445V0h5.334v.889h4.444v1.778h-.889v11.555q0 .734-.522 1.256a1.7 1.7 0 0 1-1.255.522zm8.888-13.333H3.556v11.555h8.889zm-7.11 9.777H7.11v-8H5.333zm3.555 0h1.778v-8H8.889z"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M7 21q-.824 0-1.412-.587A1.93 1.93 0 0 1 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .824-.587 1.413A1.93 1.93 0 0 1 17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M3.555 16q-.733 0-1.255-.522a1.7 1.7 0 0 1-.522-1.256V2.667h-.89V.889h4.445V0h5.333v.889h4.445v1.778h-.889v11.555q0 .734-.522 1.256a1.7 1.7 0 0 1-1.256.522zm8.89-13.333h-8.89v11.555h8.89zm-7.112 9.777h1.778v-8H5.333zm3.556 0h1.777v-8H8.89z"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="var(--icon-critical)" d="M7 21q-.824 0-1.412-.587A1.93 1.93 0 0 1 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .824-.587 1.413A1.93 1.93 0 0 1 17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="var(--icon-critical)" d="M3.555 16q-.733 0-1.255-.522a1.7 1.7 0 0 1-.522-1.256V2.667h-.89V.889h4.445V0h5.333v.889h4.445v1.778h-.889v11.555q0 .734-.522 1.256a1.7 1.7 0 0 1-1.256.522zm8.89-13.333h-8.89v11.555h8.89zm-7.112 9.777h1.778v-8H5.333zm3.556 0h1.777v-8H8.89z"/></> }
    }
};

export function Delete({
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

Delete.displayName = "Delete";
