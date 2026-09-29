import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M16.072 14.036q-1.327 2.06-4.072 4.579-2.745-2.52-4.073-4.579Q6.6 11.978 6.6 10.38q0-2.453 1.564-4.016Q9.727 4.8 12 4.8t3.836 1.564T17.4 10.38q0 1.598-1.328 3.656M6.59 15.274Q8.379 17.917 12 21q3.624-3.083 5.412-5.726 1.79-2.644 1.789-4.894 0-3.376-2.171-5.377Q14.857 2.999 11.999 3 9.144 3 6.972 5.003 4.801 7.005 4.8 10.38q0 2.25 1.789 4.894" clipRule="evenodd"/><path fill="currentColor" d="M13.664 13.053 14.717 12l-2.03-2.031V6.508h-1.505v4.062z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M11.62 9.81Q10.44 11.64 8 13.88q-2.44-2.24-3.62-4.07T3.2 6.56q0-2.18 1.39-3.57T8 1.6t3.41 1.39 1.39 3.57q0 1.42-1.18 3.25m-8.43 1.1Q4.78 13.26 8 16q3.22-2.74 4.81-5.09t1.59-4.35q0-3-1.93-4.78T8 0 3.53 1.78 1.6 6.56q0 2 1.59 4.35" clipRule="evenodd"/><path fill="currentColor" d="M9.48 8.936 10.416 8 8.61 6.194V3.118H7.273V6.73z"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M6.589 15.274Q8.377 17.917 12 21q3.623-3.083 5.411-5.726 1.79-2.644 1.789-4.894 0-3.376-2.171-5.377Q14.857 2.999 12 3T6.971 5.003Q4.801 7.005 4.8 10.38q0 2.25 1.789 4.894M14.718 12l-1.053 1.053-2.483-2.483V6.508h1.504v3.46z" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M8 16q-3.22-2.74-4.81-5.09T1.6 6.56q0-3 1.93-4.78T8 0t4.47 1.78 1.93 4.78q0 2-1.59 4.35T8 16m2.416-8-.936.936L7.273 6.73V3.12H8.61v3.075z" clipRule="evenodd"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M16.073 14.036q-1.328 2.06-4.073 4.579-2.745-2.52-4.072-4.579Q6.6 11.978 6.6 10.38q0-2.453 1.564-4.016Q9.727 4.8 12 4.8t3.836 1.564T17.4 10.38q0 1.598-1.327 3.656m-9.484 1.238Q8.377 17.917 12 21q3.623-3.083 5.411-5.726 1.79-2.644 1.789-4.894 0-3.376-2.171-5.377Q14.857 2.999 12 3T6.971 5.003Q4.801 7.005 4.8 10.38q0 2.25 1.789 4.894" clipRule="evenodd"/><path fill="var(--icon-success)" d="M13.665 13.053 14.718 12l-2.032-2.031V6.508h-1.504v4.062z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M11.62 9.81Q10.44 11.64 8 13.88q-2.44-2.24-3.62-4.07T3.2 6.56q0-2.18 1.39-3.57T8 1.6t3.41 1.39 1.39 3.57q0 1.42-1.18 3.25m-8.43 1.1Q4.78 13.26 8 16q3.22-2.74 4.81-5.09t1.59-4.35q0-3-1.93-4.78T8 0 3.53 1.78 1.6 6.56q0 2 1.59 4.35" clipRule="evenodd"/><path fill="var(--icon-success)" d="M9.48 8.936 10.416 8 8.61 6.194V3.118H7.273V6.73z"/></> }
    }
};

export function WhereToVote({
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

WhereToVote.displayName = "WhereToVote";
