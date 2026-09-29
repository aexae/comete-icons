import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M17.705 8.504 2 2l6.854 15.796c1.128 2.566 3.645 4.247 6.378 4.203 3.817-.044 6.81-3.23 6.768-7.123-.044-2.832-1.736-5.354-4.295-6.372m-2.386 11.283c-1.823.044-3.428-1.062-4.165-2.743L6.685 6.734l10.239 4.248a4.61 4.61 0 0 1 2.82 4.159c.043 2.522-1.91 4.602-4.425 4.646"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M12.564 5.203 0 0l5.484 12.637c.902 2.053 2.915 3.398 5.101 3.362 3.055-.035 5.45-2.584 5.415-5.699-.035-2.265-1.389-4.283-3.436-5.097m-1.91 9.026c-1.457.036-2.741-.849-3.331-2.194L3.748 3.787l8.191 3.399a3.69 3.69 0 0 1 2.256 3.327c.035 2.017-1.527 3.681-3.54 3.717"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M17.705 8.504 2 2l6.854 15.796c1.128 2.566 3.645 4.247 6.378 4.203 3.817-.044 6.81-3.23 6.768-7.123-.044-2.832-1.736-5.354-4.295-6.372m-2.386 11.283c-1.823.044-3.428-1.062-4.165-2.743L6.685 6.734l10.239 4.248a4.61 4.61 0 0 1 2.82 4.159c.043 2.522-1.91 4.602-4.425 4.646"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M12.564 5.203 0 0l5.484 12.637c.902 2.053 2.915 3.398 5.101 3.362 3.055-.035 5.45-2.584 5.415-5.699-.035-2.265-1.389-4.283-3.436-5.097m-1.91 9.026c-1.457.036-2.741-.849-3.331-2.194L3.748 3.787l8.191 3.399a3.69 3.69 0 0 1 2.256 3.327c.035 2.017-1.527 3.681-3.54 3.717"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="url(#paint0_radial_620_7315)" d="M17.705 8.504 2 2l6.854 15.796c1.128 2.566 3.645 4.247 6.378 4.203 3.817-.044 6.81-3.23 6.768-7.123-.044-2.832-1.736-5.354-4.295-6.372m-2.386 11.283c-1.823.044-3.428-1.062-4.165-2.743L6.685 6.734l10.239 4.248a4.61 4.61 0 0 1 2.82 4.159c.043 2.522-1.91 4.602-4.425 4.646"/><defs><radialGradient id="paint0_radial_620_7315" cx="0" cy="0" r="1" gradientTransform="matrix(27.6534 0 0 28.2035 8.302 8.496)" gradientUnits="userSpaceOnUse"><stop stopColor="var(--logo-comete-gradient-light)"/><stop offset=".736" stopColor="var(--logo-comete-gradient-dark)"/></radialGradient></defs></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="url(#paint0_radial_620_7321)" d="M12.564 5.203 0 0l5.484 12.637c.902 2.053 2.915 3.398 5.101 3.362 3.055-.035 5.45-2.584 5.415-5.699-.035-2.265-1.389-4.283-3.436-5.097m-1.91 9.026c-1.457.036-2.741-.849-3.331-2.194L3.748 3.787l8.191 3.399a3.69 3.69 0 0 1 2.256 3.327c.035 2.017-1.527 3.681-3.54 3.717"/><defs><radialGradient id="paint0_radial_620_7321" cx="0" cy="0" r="1" gradientTransform="matrix(22.1227 0 0 22.5628 5.041 5.197)" gradientUnits="userSpaceOnUse"><stop stopColor="var(--logo-comete-gradient-light)"/><stop offset=".736" stopColor="var(--logo-comete-gradient-dark)"/></radialGradient></defs></> }
    }
};

export function Comete({
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

Comete.displayName = "Comete";
