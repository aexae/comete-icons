import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M4 20q-.824 0-1.412-.587A1.93 1.93 0 0 1 2 18V6q0-.824.587-1.412A1.93 1.93 0 0 1 4 4h12q.824 0 1.413.588Q18 5.175 18 6v4.5l4-4v11l-4-4V18q0 .824-.587 1.413A1.93 1.93 0 0 1 16 20zm0-2h12V6H4z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M2.667 13.333q-.55 0-.942-.391A1.28 1.28 0 0 1 1.333 12V4q0-.55.392-.942.392-.39.942-.391h8q.55 0 .941.391Q12 3.45 12 4v3l2.667-2.667v7.334L12 9v3q0 .55-.392.942a1.28 1.28 0 0 1-.941.391zm0-1.333h8V4h-8z"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M12 16.8q1.687 0 2.869-1.181 1.18-1.182 1.181-2.869 0-1.687-1.181-2.869Q13.687 8.701 12 8.7q-1.687 0-2.869 1.181-1.18 1.182-1.181 2.869 0 1.687 1.181 2.869Q10.313 16.799 12 16.8m0-1.8q-.944 0-1.598-.652a2.17 2.17 0 0 1-.652-1.598q0-.944.652-1.598A2.17 2.17 0 0 1 12 10.5q.944 0 1.598.652.651.654.652 1.598 0 .944-.652 1.598A2.17 2.17 0 0 1 12 15m-7.2 4.95q-.743 0-1.271-.529A1.73 1.73 0 0 1 3 18.15V7.35q0-.743.529-1.271A1.73 1.73 0 0 1 4.8 5.55h2.835L9.3 3.75h5.4l1.665 1.8H19.2q.743 0 1.271.529.53.528.529 1.271v10.8q0 .743-.529 1.271a1.73 1.73 0 0 1-1.271.529z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M8 12.6q1.5 0 2.55-1.05T11.6 9t-1.05-2.55T8 5.4 5.45 6.45 4.4 9t1.05 2.55T8 12.6M8 11q-.84 0-1.42-.58A1.93 1.93 0 0 1 6 9q0-.84.58-1.42T8 7t1.42.58T10 9t-.58 1.42T8 11m-6.4 4.4a1.54 1.54 0 0 1-1.13-.47A1.54 1.54 0 0 1 0 13.8V4.2q0-.66.47-1.13A1.54 1.54 0 0 1 1.6 2.6h2.52L5.6 1h4.8l1.48 1.6h2.52q.66 0 1.13.47T16 4.2v9.6q0 .66-.47 1.13a1.54 1.54 0 0 1-1.13.47z"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M4 20q-.824 0-1.412-.587A1.93 1.93 0 0 1 2 18V6q0-.824.587-1.412A1.93 1.93 0 0 1 4 4h12q.824 0 1.413.588Q18 5.175 18 6v4.5l4-4v11l-4-4V18q0 .824-.587 1.413A1.93 1.93 0 0 1 16 20zm0-2h12V6H4z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M.47 14.93q.47.47 1.13.47h12.8q.66 0 1.13-.47T16 13.8V4.2q0-.66-.47-1.13a1.54 1.54 0 0 0-1.13-.47h-2.52L10.4 1H5.6L4.12 2.6H1.6q-.66 0-1.13.47A1.54 1.54 0 0 0 0 4.2v9.6q0 .66.47 1.13M14.4 13.8H1.6V4.2h3.24L6.3 2.6h3.4l1.46 1.6h3.24z" clipRule="evenodd"/><path fill="var(--icon-information)" fillRule="evenodd" d="M8 12.6q1.5 0 2.55-1.05T11.6 9t-1.05-2.55T8 5.4 5.45 6.45 4.4 9t1.05 2.55T8 12.6m-1.42-2.18Q7.16 11 8 11t1.42-.58T10 9t-.58-1.42A1.93 1.93 0 0 0 8 7q-.84 0-1.42.58T6 9t.58 1.42" clipRule="evenodd"/></> }
    }
};

export function Camera({
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

Camera.displayName = "Camera";
