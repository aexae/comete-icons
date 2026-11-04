import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M20 18h-1.929v-5.143H20zm-.295 2.719a.95.95 0 0 1-.67.281.93.93 0 0 1-.682-.281.93.93 0 0 1-.282-.683q0-.376.282-.67a.923.923 0 0 1 1.353 0 .923.923 0 0 1 0 1.353"/><path fill="currentColor" fillRule="evenodd" d="m14.3 5.95-4.175 4.175L3 17.25V21h3.75l7.125-7.125L20.7 7.05q.3-.3.3-.712 0-.414-.3-.713L18.375 3.3q-.3-.3-.712-.3-.413 0-.713.3L15.7 4.55l-.725-.725q-.6-.6-1.412-.6-.813 0-1.413.6L6.7 9.3l1.4 1.4 5.475-5.475zm-2.05 4.875.925.925L18.6 6.325l-.925-.925zM5.925 19H5v-.925l5.825-5.825.925.925z" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M15.111 13.333h-1.714V8.762h1.714zm-.261 2.417a.84.84 0 0 1-.596.25.83.83 0 0 1-.607-.25.83.83 0 0 1-.25-.607.84.84 0 0 1 .25-.595.82.82 0 0 1 1.202 0 .82.82 0 0 1 0 1.202"/><path fill="currentColor" fillRule="evenodd" d="m10.044 2.622-3.71 3.711L0 12.667V16h3.333l6.334-6.333L15.733 3.6A.87.87 0 0 0 16 2.967a.87.87 0 0 0-.267-.634L13.667.267A.87.87 0 0 0 13.033 0a.87.87 0 0 0-.633.267l-1.111 1.11-.645-.644A1.72 1.72 0 0 0 9.39.2q-.723 0-1.256.533L3.29 5.6l1.244 1.244L9.4 1.978zM8.222 6.956l.822.822 4.823-4.822-.823-.823zM2.6 14.222h-.822V13.4l5.178-5.178.822.822z" clipRule="evenodd"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M20 18h-1.929v-5.143H20zm-.295 2.719a.95.95 0 0 1-.67.281.93.93 0 0 1-.682-.281.93.93 0 0 1-.282-.683q0-.376.282-.67a.923.923 0 0 1 1.353 0 .923.923 0 0 1 0 1.353"/><path fill="currentColor" fillRule="evenodd" d="M10.125 10.125 14.3 5.95l-.725-.725L8.1 10.7 6.7 9.3l5.45-5.475q.6-.6 1.412-.6.813 0 1.413.6l.725.725 1.25-1.25q.3-.3.713-.3.412 0 .712.3L20.7 5.625q.3.3.3.713 0 .412-.3.712l-6.825 6.825L6.75 21H3v-3.75zM5.925 19H5v-.925l5.825-5.825.925.925z" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M15.111 13.333h-1.714V8.762h1.714zm-.261 2.417a.84.84 0 0 1-.596.25.83.83 0 0 1-.607-.25.83.83 0 0 1-.25-.607.84.84 0 0 1 .25-.595.82.82 0 0 1 1.202 0 .82.82 0 0 1 0 1.202"/><path fill="currentColor" fillRule="evenodd" d="m6.333 6.333 3.711-3.71-.644-.645-4.867 4.866L3.29 5.6 8.133.733A1.72 1.72 0 0 1 9.39.2q.722 0 1.255.533l.645.645L12.4.267A.87.87 0 0 1 13.033 0q.367 0 .634.267l2.066 2.066a.87.87 0 0 1 .267.634.87.87 0 0 1-.267.633L9.667 9.667 3.333 16H0v-3.333zM2.6 14.223h-.822V13.4l5.178-5.178.822.822z" clipRule="evenodd"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M10.125 10.125 14.3 5.95l-.725-.725L8.1 10.7 6.7 9.3l5.45-5.475q.6-.6 1.412-.6.813 0 1.413.6l.725.725 1.25-1.25q.3-.3.713-.3.412 0 .712.3L20.7 5.625q.3.3.3.713 0 .412-.3.712l-6.825 6.825L6.75 21H3v-3.75zm3.05 1.625-.925-.925L17.675 5.4l.925.925zM5.925 19H5v-.925l5.825-5.825.925.925z" clipRule="evenodd"/><path fill="var(--icon-critical)" d="M20 18h-1.929v-5.143H20zm-.295 2.719a.95.95 0 0 1-.67.281.93.93 0 0 1-.682-.281.93.93 0 0 1-.282-.683q0-.376.282-.67a.923.923 0 0 1 1.353 0 .923.923 0 0 1 0 1.353"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="m6.333 6.333 3.711-3.71-.644-.645-4.867 4.866L3.29 5.6 8.133.733A1.72 1.72 0 0 1 9.39.2q.722 0 1.255.533l.645.645L12.4.267A.87.87 0 0 1 13.033 0q.367 0 .634.267l2.066 2.066a.87.87 0 0 1 .267.634.87.87 0 0 1-.267.633L9.667 9.667 3.333 16H0v-3.333zm2.711 1.445-.822-.822 4.822-4.823.823.823zM2.6 14.222h-.822V13.4l5.178-5.178.822.822z" clipRule="evenodd"/><path fill="var(--icon-critical)" d="M15.111 13.333h-1.714V8.762h1.714zm-.261 2.417a.84.84 0 0 1-.596.25.83.83 0 0 1-.607-.25.83.83 0 0 1-.25-.607.84.84 0 0 1 .25-.595.82.82 0 0 1 1.202 0 .82.82 0 0 1 0 1.202"/></> }
    }
};

export function SignatureExpired({
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

SignatureExpired.displayName = "SignatureExpired";
