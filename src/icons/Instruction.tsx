import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M17.5 20h1v-4h-1zm.5-5a.48.48 0 0 0 .35-.15.48.48 0 0 0 0-.7.48.48 0 0 0-.7 0 .48.48 0 0 0 0 .7q.15.15.35.15M8 14h3.675q.275-.575.637-1.075.363-.5.813-.925H8zm0 4h3.075a6.7 6.7 0 0 1 0-2H8zm-2 4q-.824 0-1.412-.587A1.93 1.93 0 0 1 4 20V4q0-.824.588-1.412A1.93 1.93 0 0 1 6 2h8l6 6v2.3a6.4 6.4 0 0 0-.975-.225A7 7 0 0 0 18 10V9h-5V4H6v16h5.675q.275.575.637 1.075.363.5.813.925zm15.538-8.537Q23 14.926 23 17q0 2.075-1.462 3.538Q20.074 22 18 22q-2.075 0-3.537-1.462Q13 19.074 13 17q0-2.075 1.463-3.537Q15.926 12 18 12q2.075 0 3.538 1.463"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M11.6 14.4h.8v-3.2h-.8zm.4-4q.16 0 .28-.12a.384.384 0 0 0 0-.56.384.384 0 0 0-.56 0 .384.384 0 0 0 0 .56q.12.12.28.12m-8-.8h2.94q.22-.46.51-.86T8.1 8H4zm0 3.2h2.46a5.4 5.4 0 0 1 0-1.6H4zM2.4 16a1.54 1.54 0 0 1-1.13-.47A1.54 1.54 0 0 1 .8 14.4V1.6q0-.66.47-1.13A1.54 1.54 0 0 1 2.4 0h6.4l4.8 4.8v1.84a5 5 0 0 0-.78-.18A5.5 5.5 0 0 0 12 6.4v-.8H8v-4H2.4v12.8h4.54q.22.46.51.86t.65.74zm12.43-6.83Q16 10.34 16 12t-1.17 2.83T12 16t-2.83-1.17T8 12t1.17-2.83T12 8t2.83 1.17"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M17.5 20h1v-4h-1zm.5-5a.48.48 0 0 0 .35-.15.48.48 0 0 0 0-.7.48.48 0 0 0-.7 0 .48.48 0 0 0 0 .7q.15.15.35.15m-3.537 5.538Q13 19.074 13 17q0-2.075 1.463-3.537Q15.926 12 18 12q2.075 0 3.538 1.463T23 17t-1.462 3.538Q20.074 22 18 22q-2.075 0-3.537-1.462M13 9h5l-5-5zM6 22q-.824 0-1.412-.587A1.93 1.93 0 0 1 4 20V4q0-.824.588-1.412A1.93 1.93 0 0 1 6 2h8l6 6v2.3a7 7 0 0 0-1-.225A7 7 0 0 0 18 10q-1.425 0-2.687.537A7.2 7.2 0 0 0 13.1 12H8v2h3.675a7 7 0 0 0-.6 2H8v2h3.075q.175 1.124.7 2.163Q12.3 21.2 13.125 22z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M11.6 14.4h.8v-3.2h-.8zm.4-4q.16 0 .28-.12a.384.384 0 0 0 0-.56.384.384 0 0 0-.56 0 .384.384 0 0 0 0 .56q.12.12.28.12m-2.83 4.43Q8 13.66 8 12t1.17-2.83T12 8t2.83 1.17T16 12t-1.17 2.83T12 16t-2.83-1.17M8 5.6h4l-4-4zM2.4 16a1.54 1.54 0 0 1-1.13-.47A1.54 1.54 0 0 1 .8 14.4V1.6q0-.66.47-1.13A1.54 1.54 0 0 1 2.4 0h6.4l4.8 4.8v1.84a6 6 0 0 0-.8-.18 5.4 5.4 0 0 0-.8-.06 5.4 5.4 0 0 0-2.15.43A5.7 5.7 0 0 0 8.08 8H4v1.6h2.94a5.5 5.5 0 0 0-.48 1.6H4v1.6h2.46q.14.9.56 1.73T8.1 16z"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M11.675 14H8v-2h5.125q-.45.425-.812.925A7 7 0 0 0 11.675 14m-.6 4H8v-2h3.075a6.7 6.7 0 0 0 0 2m-6.487 3.413Q5.175 22 6 22h7.125q-.45-.425-.812-.925A7 7 0 0 1 11.675 20H6V4h7v5h5v1q.525 0 1.025.075T20 10.3V8l-6-6H6q-.824 0-1.412.587A1.93 1.93 0 0 0 4 4v16q0 .824.588 1.413" clipRule="evenodd"/><path fill="currentColor" fillRule="evenodd" d="M21.538 13.463Q23 14.926 23 17q0 2.075-1.462 3.538Q20.074 22 18 22q-2.075 0-3.537-1.462Q13 19.074 13 17q0-2.075 1.463-3.537Q15.926 12 18 12q2.075 0 3.538 1.463M18.5 20h-1v-4h1zm-.15-5.15a.48.48 0 0 1-.7 0 .48.48 0 0 1 0-.7.48.48 0 0 1 .7 0 .48.48 0 0 1 0 .7" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M6.94 9.6H4V8h4.1q-.36.34-.65.74a5.5 5.5 0 0 0-.51.86m-.48 3.2H4v-1.6h2.46a5.4 5.4 0 0 0 0 1.6m-5.19 2.73q.47.47 1.13.47h5.7a5.3 5.3 0 0 1-.65-.74 5.5 5.5 0 0 1-.51-.86H2.4V1.6H8v4h4v.8q.42 0 .82.06t.78.18V4.8L8.8 0H2.4q-.66 0-1.13.47A1.54 1.54 0 0 0 .8 1.6v12.8q0 .66.47 1.13" clipRule="evenodd"/><path fill="currentColor" fillRule="evenodd" d="M14.83 9.17Q16 10.34 16 12t-1.17 2.83T12 16t-2.83-1.17T8 12t1.17-2.83T12 8t2.83 1.17M12.4 14.4h-.8v-3.2h.8zm-.12-4.12a.384.384 0 0 1-.56 0 .384.384 0 0 1 0-.56.384.384 0 0 1 .56 0 .384.384 0 0 1 0 .56" clipRule="evenodd"/></> }
    }
};

export function Instruction({
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

Instruction.displayName = "Instruction";
