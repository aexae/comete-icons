import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M4 20q-.824 0-1.412-.587A1.93 1.93 0 0 1 2 18V6q0-.824.587-1.412A1.93 1.93 0 0 1 4 4h11a1.99 1.99 0 0 1 1.6.8L22 12l-5.4 7.2q-.275.375-.7.588A2 2 0 0 1 15 20zm0-2h11l4.5-6L15 6H4z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M1.455 13.818a1.4 1.4 0 0 1-1.028-.427A1.4 1.4 0 0 1 0 12.364V3.636q0-.6.427-1.027a1.4 1.4 0 0 1 1.028-.427h13.09q.6 0 1.028.427A1.4 1.4 0 0 1 16 3.636v8.728q0 .6-.427 1.027a1.4 1.4 0 0 1-1.027.427zm0-1.454h13.09V3.636H1.456zm.363-2.182h.91V7.636l1.854 2.546h.873V5.818h-.91v2.545L2.727 5.818h-.909zm4.364 0H9.09v-.91H7.273v-.8H9.09v-.909H7.273v-.836H9.09v-.909H6.18zm4.364 0h2.909q.309 0 .518-.21.21-.209.209-.518V5.818h-.91v3.273h-.8V6.545h-.908v2.546h-.837V5.818h-.909v3.636q0 .31.21.519.208.209.518.209"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="M4 20q-.824 0-1.412-.587A1.93 1.93 0 0 1 2 18V6q0-.824.587-1.412A1.93 1.93 0 0 1 4 4h11a1.99 1.99 0 0 1 1.6.8L22 12l-5.4 7.2q-.275.375-.7.588A2 2 0 0 1 15 20z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="M1.455 13.818a1.4 1.4 0 0 1-1.028-.427A1.4 1.4 0 0 1 0 12.364V3.636q0-.6.427-1.027a1.4 1.4 0 0 1 1.028-.427h13.09q.6 0 1.028.427A1.4 1.4 0 0 1 16 3.636v8.728q0 .6-.427 1.027a1.4 1.4 0 0 1-1.027.427zm.363-3.636h.91V7.636l1.854 2.546h.873V5.818h-.91v2.545L2.727 5.818h-.909zm4.364 0H9.09v-.91H7.273v-.8H9.09v-.909H7.273v-.836H9.09v-.909H6.18zm4.364 0h2.909q.309 0 .518-.21.21-.209.209-.518V5.818h-.91v3.273h-.8V6.545h-.908v2.546h-.837V5.818h-.909v3.636q0 .31.21.519.208.209.518.209"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="var(--icon-information)" d="M3.5 15h1.25v-3.5L7.3 15h1.2V9H7.25v3.5L4.75 9H3.5zm6 0h4v-1.25H11v-1.1h2.5V11.4H11v-1.15h2.5V9h-4z"/><path fill="currentColor" fillRule="evenodd" d="M1.588 19.413Q2.175 20 3 20h18q.824 0 1.413-.587Q23 18.825 23 18V6q0-.824-.587-1.412A1.93 1.93 0 0 0 21 4H3q-.824 0-1.412.588A1.93 1.93 0 0 0 1 6v12q0 .824.587 1.413M21 18H3V6h18z" clipRule="evenodd"/><path fill="var(--icon-information)" d="M15.5 15h4q.424 0 .712-.287A.97.97 0 0 0 20.5 14V9h-1.25v4.5h-1.1V10H16.9v3.5h-1.15V9H14.5v5q0 .424.287.713.288.287.713.287"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="var(--icon-information)" d="M1.818 10.182h.91V7.636l1.854 2.546h.873V5.818h-.91v2.545L2.727 5.818h-.909zm4.364 0H9.09v-.91H7.273v-.8H9.09v-.909H7.273v-.836H9.09v-.909H6.18z"/><path fill="currentColor" fillRule="evenodd" d="M.427 13.39a1.4 1.4 0 0 0 1.028.428h13.09a1.4 1.4 0 0 0 1.028-.427A1.4 1.4 0 0 0 16 12.364V3.636a1.4 1.4 0 0 0-.427-1.027 1.4 1.4 0 0 0-1.027-.427H1.455a1.4 1.4 0 0 0-1.028.427A1.4 1.4 0 0 0 0 3.636v8.728q0 .6.427 1.027m14.119-1.027H1.455V3.637h13.09z" clipRule="evenodd"/><path fill="var(--icon-information)" d="M10.546 10.182h2.909q.309 0 .518-.21.21-.209.209-.518V5.818h-.91v3.273h-.8V6.545h-.908v2.546h-.837V5.818h-.909v3.636q0 .31.21.519.208.209.518.209"/></> }
    }
};

export function New({
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

New.displayName = "New";
