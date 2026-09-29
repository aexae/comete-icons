import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="m10.672 15.75 6.198-6.172-1.328-1.328-4.87 4.844-2.214-2.188-1.328 1.328z"/><path fill="currentColor" fillRule="evenodd" d="M12 22a9.75 9.75 0 0 1-3.88-.781 10.1 10.1 0 0 1-3.19-2.149 10.1 10.1 0 0 1-2.149-3.19A9.75 9.75 0 0 1 2 12q0-2.084.781-3.893A10.08 10.08 0 0 1 8.12 2.78 9.75 9.75 0 0 1 12 2q2.084 0 3.893.781a10.12 10.12 0 0 1 5.326 5.326q.78 1.81.781 3.893 0 2.057-.781 3.88a10.08 10.08 0 0 1-5.326 5.339q-1.81.78-3.893.781m5.755-4.245q-2.37 2.37-5.755 2.37t-5.755-2.37T3.875 12t2.37-5.755T12 3.875t5.755 2.37T20.125 12t-2.37 5.755" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M4.896 15.375A7.8 7.8 0 0 0 8 16q1.667 0 3.115-.625a8.06 8.06 0 0 0 4.26-4.27A7.8 7.8 0 0 0 16 8q0-1.667-.625-3.115a8.1 8.1 0 0 0-4.26-4.26A7.8 7.8 0 0 0 8 0a7.8 7.8 0 0 0-3.104.625 8.06 8.06 0 0 0-4.271 4.26A7.8 7.8 0 0 0 0 8q0 1.646.625 3.104.626 1.458 1.719 2.552 1.094 1.094 2.552 1.719m7.708-2.77Q10.708 14.5 8 14.5t-4.604-1.896T1.5 8t1.896-4.604T8 1.5t4.604 1.896T14.5 8t-1.896 4.604" clipRule="evenodd"/><path fill="currentColor" d="m6.938 11 4.958-4.937L10.833 5 6.938 8.875l-1.771-1.75-1.063 1.063z"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M12 22a9.75 9.75 0 0 1-3.88-.781 10.1 10.1 0 0 1-3.19-2.149 10.1 10.1 0 0 1-2.149-3.19A9.75 9.75 0 0 1 2 12q0-2.084.781-3.893A10.08 10.08 0 0 1 8.12 2.78 9.75 9.75 0 0 1 12 2q2.084 0 3.893.781a10.12 10.12 0 0 1 5.326 5.326q.78 1.81.781 3.893 0 2.057-.781 3.88a10.08 10.08 0 0 1-5.326 5.339q-1.81.78-3.893.781m4.87-12.422-6.198 6.172-3.542-3.516 1.328-1.328 2.214 2.188 4.87-4.844z" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M8 16a7.8 7.8 0 0 1-3.104-.625 8.1 8.1 0 0 1-2.552-1.719 8.1 8.1 0 0 1-1.719-2.552A7.8 7.8 0 0 1 0 8q0-1.667.625-3.115a8.06 8.06 0 0 1 4.27-4.26A7.8 7.8 0 0 1 8 0q1.667 0 3.115.625a8.1 8.1 0 0 1 4.26 4.26Q16 6.334 16 8a7.8 7.8 0 0 1-.625 3.104 8.06 8.06 0 0 1-4.26 4.271A7.8 7.8 0 0 1 8 16m3.896-9.937L6.937 11 4.105 8.188l1.063-1.063 1.77 1.75L10.834 5z" clipRule="evenodd"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="var(--icon-success)" fillRule="evenodd" d="M8.12 21.219A9.75 9.75 0 0 0 12 22q2.084 0 3.893-.781a10.08 10.08 0 0 0 5.326-5.339A9.75 9.75 0 0 0 22 12q0-2.084-.781-3.893a10.12 10.12 0 0 0-5.326-5.326Q14.083 2.001 12 2q-2.057 0-3.88.781a10.08 10.08 0 0 0-5.34 5.326Q2.001 9.917 2 12q0 2.057.781 3.88a10.1 10.1 0 0 0 2.149 3.19 10.1 10.1 0 0 0 3.19 2.149m9.635-3.464q-2.37 2.37-5.755 2.37t-5.755-2.37T3.875 12t2.37-5.755T12 3.875t5.755 2.37T20.125 12t-2.37 5.755" clipRule="evenodd"/><path fill="var(--icon-success)" d="m10.672 15.75 6.198-6.172-1.328-1.328-4.87 4.844-2.214-2.188-1.328 1.328z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="var(--icon-success)" fillRule="evenodd" d="M4.896 15.375A7.8 7.8 0 0 0 8 16q1.667 0 3.115-.625a8.06 8.06 0 0 0 4.26-4.27A7.8 7.8 0 0 0 16 8q0-1.667-.625-3.115a8.1 8.1 0 0 0-4.26-4.26A7.8 7.8 0 0 0 8 0a7.8 7.8 0 0 0-3.104.625 8.06 8.06 0 0 0-4.271 4.26A7.8 7.8 0 0 0 0 8q0 1.646.625 3.104.626 1.458 1.719 2.552 1.094 1.094 2.552 1.719m7.708-2.77Q10.708 14.5 8 14.5t-4.604-1.896T1.5 8t1.896-4.604T8 1.5t4.604 1.896T14.5 8t-1.896 4.604" clipRule="evenodd"/><path fill="var(--icon-success)" d="m6.938 11 4.958-4.937L10.833 5 6.938 8.875l-1.771-1.75-1.063 1.063z"/></> }
    }
};

export function CheckCircle({
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

CheckCircle.displayName = "CheckCircle";
