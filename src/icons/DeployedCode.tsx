import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M11 19.425v-6.85L5 9.1v6.85zm2 0 6-3.475V9.1l-6 3.475zm-1-8.575 5.925-3.425L12 4 6.075 7.425zM4 17.7q-.475-.275-.737-.725t-.263-1v-7.95q0-.55.263-1T4 6.3l7-4.025Q11.475 2 12 2t1 .275L20 6.3q.475.275.738.725t.262 1v7.95q0 .55-.262 1T20 17.7l-7 4.025Q12.525 22 12 22t-1-.275zm8-5.7"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M7.333 12.95V8.384l-4-2.317v4.567zm1.334 0 4-2.316V6.067l-4 2.317zM8 7.233l3.95-2.283L8 2.667 4.05 4.95zM2.667 11.8q-.317-.183-.492-.483T2 10.65v-5.3q0-.367.175-.667t.492-.483l4.666-2.683q.317-.184.667-.184t.667.184L13.334 4.2q.316.183.491.483T14 5.35v5.3q0 .367-.175.667t-.491.483l-4.667 2.684q-.317.183-.667.183t-.667-.183zM8 8"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M11 21.725 4 17.7q-.475-.275-.737-.725t-.263-1v-7.95q0-.55.263-1T4 6.3l7-4.025Q11.475 2 12 2t1 .275L20 6.3q.475.275.738.725t.262 1v7.95q0 .55-.262 1T20 17.7l-7 4.025Q12.525 22 12 22t-1-.275m0-9.15v6.85L12 20l1-.575v-6.85L19 9.1V8.05l-1.075-.625L12 10.85 6.075 7.425 5 8.05V9.1z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M7.333 14.484 2.667 11.8q-.317-.183-.492-.483T2 10.65v-5.3q0-.367.175-.667t.492-.483l4.666-2.683q.317-.184.667-.184t.667.184L13.334 4.2q.316.183.491.483T14 5.35v5.3q0 .367-.175.667t-.491.483l-4.667 2.684q-.317.183-.667.183t-.667-.183m0-6.1v4.566l.667.384.667-.384V8.384l4-2.317v-.7l-.717-.417L8 7.233 4.05 4.95l-.717.417v.7z"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M11 19.425v-6.85L5 9.1v6.85zm2 0 6-3.475V9.1l-6 3.475zm-1-8.575 5.925-3.425L12 4 6.075 7.425zM4 17.7q-.475-.275-.737-.725t-.263-1v-7.95q0-.55.263-1T4 6.3l7-4.025Q11.475 2 12 2t1 .275L20 6.3q.475.275.738.725t.262 1v7.95q0 .55-.262 1T20 17.7l-7 4.025Q12.525 22 12 22t-1-.275zm8-5.7"/><path fill="var(--icon-information)" d="m12 10.85 5.925-3.425L12 4 6.075 7.425Z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M7.333 12.95V8.384l-4-2.317v4.567zm1.334 0 4-2.316V6.067l-4 2.317zM8 7.233l3.95-2.283L8 2.667 4.05 4.95zM2.667 11.8q-.317-.183-.492-.483T2 10.65v-5.3q0-.367.175-.667t.492-.483l4.666-2.683q.317-.184.667-.184t.667.184L13.334 4.2q.316.183.491.483T14 5.35v5.3q0 .367-.175.667t-.491.483l-4.667 2.684q-.317.183-.667.183t-.667-.183zM8 8"/><path fill="var(--icon-information)" d="m8 7.233 3.95-2.283L8 2.667 4.05 4.95Z"/></> }
    }
};

export function DeployedCode({
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

DeployedCode.displayName = "DeployedCode";
