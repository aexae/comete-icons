import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="m6.7 18-5.65-5.65 1.425-1.4 4.25 4.25 1.4 1.4zm5.65 0L6.7 12.35l1.4-1.425 4.25 4.25 9.2-9.2 1.4 1.425zm0-5.65-1.425-1.4L15.875 6 17.3 7.4z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M4.128 12.393 0 8.265l1.041-1.023 3.105 3.105L5.17 11.37zm4.128 0L4.128 8.265 5.15 7.224l3.105 3.105 6.721-6.722L16 4.65zm0-4.128L7.215 7.242l3.616-3.616 1.041 1.023z"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M12 22a9.75 9.75 0 0 1-3.88-.781 10.1 10.1 0 0 1-3.19-2.149 10.1 10.1 0 0 1-2.149-3.19A9.75 9.75 0 0 1 2 12q0-2.084.781-3.893A10.08 10.08 0 0 1 8.12 2.78 9.75 9.75 0 0 1 12 2q2.084 0 3.893.781a10.12 10.12 0 0 1 5.326 5.326q.78 1.81.781 3.893 0 2.057-.781 3.88a10.08 10.08 0 0 1-5.326 5.339q-1.81.78-3.893.781m-7.099-9.778 3.663 3.663.924-.908-.908-.908-2.755-2.755zm3.663 0 3.663 3.663 6.872-6.872-.908-.924-5.964 5.964-2.755-2.755zm2.739-.908.924.908 3.209-3.21-.924-.907z" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M8 16a7.8 7.8 0 0 1-3.104-.625 8.1 8.1 0 0 1-2.552-1.719 8.1 8.1 0 0 1-1.719-2.552A7.8 7.8 0 0 1 0 8q0-1.667.625-3.115a8.06 8.06 0 0 1 4.27-4.26A7.8 7.8 0 0 1 8 0q1.667 0 3.115.625a8.1 8.1 0 0 1 4.26 4.26Q16 6.334 16 8a7.8 7.8 0 0 1-.625 3.104 8.06 8.06 0 0 1-4.26 4.271A7.8 7.8 0 0 1 8 16M2.32 8.177l2.931 2.93.74-.725-.727-.726L3.06 7.45zm2.931 0 2.93 2.93L13.68 5.61l-.726-.739L8.18 9.643 5.977 7.438zm2.191-.726.74.726 2.567-2.567-.74-.726z" clipRule="evenodd"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="var(--icon-success)" d="m6.7 18-5.65-5.65 1.425-1.4 4.25 4.25 1.4 1.4zm5.65 0L6.7 12.35l1.4-1.425 4.25 4.25 9.2-9.2 1.4 1.425zm0-5.65-1.425-1.4L15.875 6 17.3 7.4z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="var(--icon-success)" d="M4.128 12.393 0 8.265l1.041-1.023 3.105 3.105L5.17 11.37zm4.128 0L4.128 8.265 5.15 7.224l3.105 3.105 6.721-6.722L16 4.65zm0-4.128L7.215 7.242l3.616-3.616 1.041 1.023z"/></> }
    }
};

export function DoneAll({
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

DoneAll.displayName = "DoneAll";
