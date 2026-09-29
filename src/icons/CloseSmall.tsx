import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M8.4 17 7 15.6l3.6-3.6L7 8.425l1.4-1.4 3.6 3.6 3.575-3.6 1.4 1.4-3.6 3.575 3.6 3.6-1.4 1.4L12 13.4z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="m4.4 12.975-1.4-1.4 3.6-3.6L3 4.4 4.4 3 8 6.6 11.575 3l1.4 1.4-3.6 3.575 3.6 3.6-1.4 1.4L8 9.375z"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M12 19a6.8 6.8 0 0 1-2.73-.551 7.1 7.1 0 0 1-2.222-1.497A7.1 7.1 0 0 1 5.55 14.73 6.8 6.8 0 0 1 5 12q0-1.452.551-2.73a7.1 7.1 0 0 1 1.497-2.222A7.1 7.1 0 0 1 9.27 5.55 6.8 6.8 0 0 1 12 5q1.452 0 2.73.551a7.1 7.1 0 0 1 2.223 1.497 7.1 7.1 0 0 1 1.496 2.222q.55 1.278.551 2.73 0 1.452-.551 2.73a7.1 7.1 0 0 1-1.497 2.223 7.1 7.1 0 0 1-2.222 1.496A6.8 6.8 0 0 1 12 19m0-6.02L9.48 15.5l-.98-.98L11.02 12 8.5 9.48l.98-.98L12 11.02l2.52-2.52.98.98L12.98 12l2.52 2.52-.98.98z" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M8 14q-1.245 0-2.34-.473a6.1 6.1 0 0 1-1.905-1.282 6.1 6.1 0 0 1-1.282-1.905A5.8 5.8 0 0 1 2 8q0-1.245.473-2.34a6.1 6.1 0 0 1 1.282-1.905A6.1 6.1 0 0 1 5.66 2.473 5.8 5.8 0 0 1 8 2q1.245 0 2.34.473a6.1 6.1 0 0 1 1.905 1.282 6.1 6.1 0 0 1 1.283 1.905Q14 6.755 14 8t-.473 2.34a6.1 6.1 0 0 1-1.282 1.905 6.1 6.1 0 0 1-1.905 1.283Q9.245 14 8 14m0-5.16L5.84 11 5 10.16 7.16 8 5 5.84 5.84 5 8 7.16 10.16 5l.84.84L8.84 8 11 10.16l-.84.84z" clipRule="evenodd"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="var(--icon-subtlest)" d="M8.4 17 7 15.6l3.6-3.6L7 8.425l1.4-1.4 3.6 3.6 3.575-3.6 1.4 1.4-3.6 3.575 3.6 3.6-1.4 1.4L12 13.4z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="var(--icon-subtlest)" d="m4.4 12.975-1.4-1.4 3.6-3.6L3 4.4 4.4 3 8 6.6 11.575 3l1.4 1.4-3.6 3.575 3.6 3.6-1.4 1.4L8 9.375z"/></> }
    }
};

export function CloseSmall({
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

CloseSmall.displayName = "CloseSmall";
