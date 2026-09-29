import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M3 21v-6h2v2.6l3.1-3.1 1.4 1.4L6.4 19H9v2zm12 0v-2h2.6l-3.1-3.1 1.4-1.4 3.1 3.1V15h2v6zM8.1 9.5 5 6.4V9H3V3h6v2H6.4l3.1 3.1zm7.8 0-1.4-1.4L17.6 5H15V3h6v6h-2V6.4z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><g clip-path="url(#clip0_620_3636)"><path fill="currentColor" d="M0 16v-4.571h1.714v1.642L4.5 10.286 5.714 11.5 2.93 14.286h1.64V16zm11.429 0v-1.714h1.642L10.286 11.5l1.214-1.214 2.786 2.785V11.43H16V16zM4.5 5.714 1.714 2.93v1.64H0V0h4.571v1.714H2.93L5.714 4.5zm7 0L10.286 4.5l2.785-2.786H11.43V0H16v4.571h-1.714V2.93z"/></g></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M3 21v-6h2v2.6l3.1-3.1 1.4 1.4L6.4 19H9v2zm12 0v-2h2.6l-3.1-3.1 1.4-1.4 3.1 3.1V15h2v6zM8.1 9.5 5 6.4V9H3V3h6v2H6.4l3.1 3.1zm7.8 0-1.4-1.4L17.6 5H15V3h6v6h-2V6.4z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><g clip-path="url(#clip0_620_3638)"><path fill="currentColor" d="M0 16v-4.571h1.714v1.642L4.5 10.286 5.714 11.5 2.93 14.286h1.64V16zm11.429 0v-1.714h1.642L10.286 11.5l1.214-1.214 2.786 2.785V11.43H16V16zM4.5 5.714 1.714 2.93v1.64H0V0h4.571v1.714H2.93L5.714 4.5zm7 0L10.286 4.5l2.785-2.786H11.43V0H16v4.571h-1.714V2.93z"/></g></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M3 15v6h6v-2H5v-4zM15 5h4v4h2V3h-6zm0 16v-2h4v-4h2v6zM5 6.4V9H3V3h6v2H5z" clipRule="evenodd"/><path fill="var(--icon-information)" d="m14.5 8.1 1.4 1.4L19 6.4V5h-1.4zm0 7.8 3.1 3.1H19v-1.4l-3.1-3.1zm-6.4-1.4L5 17.6V19h1.4l3.1-3.1zM5 6.4l3.1 3.1 1.4-1.4L6.4 5H5z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><g clip-path="url(#clip0_620_3640)"><path fill="currentColor" fillRule="evenodd" d="M0 10.667V16h5.333v-1.778H1.778v-3.555zm10.667-8.889h3.555v3.555H16V0h-5.333zm0 14.222v-1.778h3.555v-3.555H16V16zM1.777 3.022v2.311H0V0h5.333v1.778H1.778z" clipRule="evenodd"/><path fill="var(--icon-information)" d="m10.222 4.533 1.245 1.245 2.755-2.756V1.778h-1.244zm0 6.934 2.756 2.755h1.244v-1.244l-2.755-2.756zm-5.689-1.245-2.755 2.756v1.244h1.244l2.756-2.755zm-2.755-7.2 2.755 2.756 1.245-1.245-2.756-2.755H1.778z"/></g></> }
    }
};

export function ZoomOutMap({
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

ZoomOutMap.displayName = "ZoomOutMap";
