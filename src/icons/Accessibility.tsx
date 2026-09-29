import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M12 6q-.825 0-1.412-.588A1.93 1.93 0 0 1 10 4q0-.824.588-1.412A1.93 1.93 0 0 1 12 2q.825 0 1.412.587Q14 3.176 14 4t-.588 1.412A1.93 1.93 0 0 1 12 6M9 22V9q-1.5-.125-3.05-.375A30 30 0 0 1 3 8l.5-2q1.95.525 4.15.763Q9.85 7 12 7t4.35-.237A27 27 0 0 0 20.5 6l.5 2q-1.4.375-2.95.625A40 40 0 0 1 15 9v13h-2v-6h-2v6z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M8 3.333q-.642 0-1.099-.457a1.5 1.5 0 0 1-.457-1.098q0-.642.457-1.099T8 .222 9.099.68t.457 1.099-.457 1.098T8 3.333M5.667 15.778V5.667a31 31 0 0 1-2.373-.292A23 23 0 0 1 1 4.889l.389-1.556q1.517.409 3.228.593 1.71.185 3.383.185t3.383-.185q1.712-.184 3.228-.593L15 4.89a23 23 0 0 1-2.294.486q-1.206.195-2.373.292v10.11H8.778v-4.666H7.222v4.667z"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M12 6q-.825 0-1.412-.588A1.93 1.93 0 0 1 10 4q0-.824.588-1.412A1.93 1.93 0 0 1 12 2q.825 0 1.412.587Q14 3.176 14 4t-.588 1.412A1.93 1.93 0 0 1 12 6M9 22V9q-1.5-.125-3.05-.375A30 30 0 0 1 3 8l.5-2q1.95.525 4.15.763Q9.85 7 12 7t4.35-.237A27 27 0 0 0 20.5 6l.5 2q-1.4.375-2.95.625A40 40 0 0 1 15 9v13h-2v-6h-2v6z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M8 3.333q-.642 0-1.099-.457a1.5 1.5 0 0 1-.457-1.098q0-.642.457-1.099T8 .222 9.099.68t.457 1.099-.457 1.098T8 3.333M5.667 15.778V5.667a31 31 0 0 1-2.373-.292A23 23 0 0 1 1 4.889l.389-1.556q1.517.409 3.228.593 1.71.185 3.383.185t3.383-.185q1.712-.184 3.228-.593L15 4.89a23 23 0 0 1-2.294.486q-1.206.195-2.373.292v10.11H8.778v-4.666H7.222v4.667z"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="var(--icon-accent-purple)" d="M12 6q-.825 0-1.412-.588A1.93 1.93 0 0 1 10 4q0-.824.588-1.412A1.93 1.93 0 0 1 12 2q.825 0 1.412.587Q14 3.176 14 4t-.588 1.412A1.93 1.93 0 0 1 12 6M9 22V9q-1.5-.125-3.05-.375A30 30 0 0 1 3 8l.5-2q1.95.525 4.15.763Q9.85 7 12 7t4.35-.237A27 27 0 0 0 20.5 6l.5 2q-1.4.375-2.95.625A40 40 0 0 1 15 9v13h-2v-6h-2v6z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="var(--icon-accent-purple)" d="M8 3.333q-.642 0-1.099-.457a1.5 1.5 0 0 1-.457-1.098q0-.642.457-1.099T8 .222 9.099.68t.457 1.099-.457 1.098T8 3.333M5.667 15.778V5.667a31 31 0 0 1-2.373-.292A23 23 0 0 1 1 4.889l.389-1.556q1.517.409 3.228.593 1.71.185 3.383.185t3.383-.185q1.712-.184 3.228-.593L15 4.89a23 23 0 0 1-2.294.486q-1.206.195-2.373.292v10.11H8.778v-4.666H7.222v4.667z"/></> }
    }
};

export function Accessibility({
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

Accessibility.displayName = "Accessibility";
