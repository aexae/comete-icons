import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="m15.375 20.95-3.55-3.55 1.4-1.4 2.125 2.125 4.25-4.25L21 15.3z"/><path fill="currentColor" fillRule="evenodd" d="M10.125 10.125 14.3 5.95l-.725-.725L8.1 10.7 6.7 9.3l5.45-5.475q.6-.6 1.412-.6.813 0 1.413.6l.725.725 1.25-1.25q.3-.3.713-.3.412 0 .712.3L20.7 5.625q.3.3.3.713 0 .412-.3.712l-6.825 6.825L6.75 21H3v-3.75zm3.05 1.625-.925-.925L17.675 5.4l.925.925zM5.925 19H5v-.925l5.825-5.825.925.925z" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M11 15.956 7.844 12.8l1.245-1.244 1.889 1.888 3.778-3.777L16 10.933z"/><path fill="currentColor" fillRule="evenodd" d="m6.333 6.333 3.711-3.71-.644-.645-4.867 4.866L3.29 5.6 8.133.733A1.72 1.72 0 0 1 9.39.2q.722 0 1.255.533l.645.645L12.4.267A.87.87 0 0 1 13.033 0q.367 0 .634.267l2.066 2.066a.87.87 0 0 1 .267.634.87.87 0 0 1-.267.633L9.667 9.667 3.333 16H0v-3.333zm2.711 1.445-.822-.822 4.822-4.823.823.823zM2.6 14.222h-.822V13.4l5.178-5.178.822.822z" clipRule="evenodd"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="m15.375 20.95-3.55-3.55 1.4-1.4 2.125 2.125 4.25-4.25L21 15.3z"/><path fill="currentColor" fillRule="evenodd" d="M10.125 10.125 14.3 5.95l-.725-.725L8.1 10.7 6.7 9.3l5.45-5.475q.6-.6 1.412-.6.813 0 1.413.6l.725.725 1.25-1.25q.3-.3.713-.3.412 0 .712.3L20.7 5.625q.3.3.3.713 0 .412-.3.712l-6.825 6.825L6.75 21H3v-3.75zM5.925 19H5v-.925l5.825-5.825.925.925z" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M11 15.956 7.844 12.8l1.245-1.244 1.889 1.888 3.778-3.777L16 10.933z"/><path fill="currentColor" fillRule="evenodd" d="m6.333 6.333 3.711-3.71-.644-.645-4.867 4.866L3.29 5.6 8.133.733A1.72 1.72 0 0 1 9.39.2q.722 0 1.255.533l.645.645L12.4.267A.87.87 0 0 1 13.033 0q.367 0 .634.267l2.066 2.066a.87.87 0 0 1 .267.634.87.87 0 0 1-.267.633L9.667 9.667 3.333 16H0v-3.333zM2.6 14.223h-.822V13.4l5.178-5.178.822.822z" clipRule="evenodd"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="var(--icon-success)" d="m15.375 20.95-3.55-3.55 1.4-1.4 2.125 2.125 4.25-4.25L21 15.3z"/><path fill="currentColor" fillRule="evenodd" d="M10.125 10.125 14.3 5.95l-.725-.725L8.1 10.7 6.7 9.3l5.45-5.475q.6-.6 1.412-.6.813 0 1.413.6l.725.725 1.25-1.25q.3-.3.713-.3.412 0 .712.3L20.7 5.625q.3.3.3.713 0 .412-.3.712l-6.825 6.825L6.75 21H3v-3.75zm3.05 1.625-.925-.925L17.675 5.4l.925.925zM5.925 19H5v-.925l5.825-5.825.925.925z" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="var(--icon-success)" d="M11 15.956 7.844 12.8l1.245-1.244 1.889 1.888 3.778-3.777L16 10.933z"/><path fill="currentColor" fillRule="evenodd" d="m6.333 6.333 3.711-3.71-.644-.645-4.867 4.866L3.29 5.6 8.133.733A1.72 1.72 0 0 1 9.39.2q.722 0 1.255.533l.645.645L12.4.267A.87.87 0 0 1 13.033 0q.367 0 .634.267l2.066 2.066a.87.87 0 0 1 .267.634.87.87 0 0 1-.267.633L9.667 9.667 3.333 16H0v-3.333zm2.711 1.445-.822-.822 4.822-4.823.823.823zM2.6 14.222h-.822V13.4l5.178-5.178.822.822z" clipRule="evenodd"/></> }
    }
};

export function DocumentIsSigned({
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

DocumentIsSigned.displayName = "DocumentIsSigned";
