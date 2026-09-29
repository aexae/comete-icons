import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M15.686 6.723v4.398h1.76V6.723zm-5.663 9.61q.495.637 1.265.857V6.723h-1.76v8.136q0 .836.495 1.473M8.055 19.19q1.605 1.605 3.893 1.605a5.2 5.2 0 0 0 1.022-.099q.495-.099.957-.274v-1.958q-.44.286-.935.43-.495.142-1.045.142-1.56 0-2.66-1.088-1.1-1.09-1.078-2.65V7.162q0-.923.638-1.561a2.12 2.12 0 0 1 1.561-.638q.924 0 1.55.638.627.638.65 1.561v6.597h1.758V7.162q0-1.65-1.154-2.803-1.154-1.155-2.804-1.155T7.604 4.36Q6.45 5.514 6.45 7.162V15.3q0 2.287 1.605 3.892" clipRule="evenodd"/><path fill="currentColor" d="M15.686 19.917v-2.64h-2.639V15.52h2.639v-2.64h1.76v2.64h2.638v1.759h-2.639v2.639z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M11.4 3.2v4H13v-4zm-5.15 8.74q.45.58 1.15.78V3.2H5.8v7.4q0 .76.45 1.34m-1.79 2.6Q5.92 16 8 16q.48 0 .93-.09t.87-.25v-1.78q-.4.26-.85.39T8 14.4q-1.42 0-2.42-.99T4.6 11V3.6q0-.84.58-1.42T6.6 1.6t1.41.58.59 1.42v6h1.6v-6q0-1.5-1.05-2.55T6.6 0 4.05 1.05 3 3.6V11q0 2.08 1.46 3.54" clipRule="evenodd"/><path fill="currentColor" d="M11.4 15.2v-2.4H9v-1.6h2.4V8.8H13v2.4h2.4v1.6H13v2.4z"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M15.686 6.723v4.398h1.76V6.723zm-5.663 9.61q.495.637 1.265.857V6.723h-1.76v8.136q0 .836.495 1.473M8.055 19.19q1.605 1.605 3.893 1.605a5.2 5.2 0 0 0 1.022-.099q.495-.099.957-.274v-1.958q-.44.286-.935.43-.495.142-1.045.142-1.56 0-2.66-1.088-1.1-1.09-1.078-2.65V7.162q0-.923.638-1.561a2.12 2.12 0 0 1 1.561-.638q.924 0 1.55.638.627.638.65 1.561v6.597h1.758V7.162q0-1.65-1.154-2.803-1.154-1.155-2.804-1.155T7.604 4.36Q6.45 5.514 6.45 7.162V15.3q0 2.287 1.605 3.892" clipRule="evenodd"/><path fill="currentColor" d="M15.686 19.917v-2.64h-2.639V15.52h2.639v-2.64h1.76v2.64h2.638v1.759h-2.639v2.639z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M11.4 3.2v4H13v-4zm-5.15 8.74q.45.58 1.15.78V3.2H5.8v7.4q0 .76.45 1.34m-1.79 2.6Q5.92 16 8 16q.48 0 .93-.09t.87-.25v-1.78q-.4.26-.85.39T8 14.4q-1.42 0-2.42-.99T4.6 11V3.6q0-.84.58-1.42T6.6 1.6t1.41.58.59 1.42v6h1.6v-6q0-1.5-1.05-2.55T6.6 0 4.05 1.05 3 3.6V11q0 2.08 1.46 3.54" clipRule="evenodd"/><path fill="currentColor" d="M11.4 15.2v-2.4H9v-1.6h2.4V8.8H13v2.4h2.4v1.6H13v2.4z"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M15.686 6.723v4.398h1.76V6.723zm-5.663 9.61q.495.637 1.265.857V6.723h-1.76v8.136q0 .836.495 1.473M8.055 19.19q1.605 1.605 3.893 1.605a5.2 5.2 0 0 0 1.022-.099q.495-.099.957-.274v-1.958q-.44.286-.935.43-.495.142-1.045.142-1.56 0-2.66-1.088-1.1-1.09-1.078-2.65V7.162q0-.923.638-1.561a2.12 2.12 0 0 1 1.561-.638q.924 0 1.55.638.627.638.65 1.561v6.597h1.758V7.162q0-1.65-1.154-2.803-1.154-1.155-2.804-1.155T7.604 4.36Q6.45 5.514 6.45 7.162V15.3q0 2.287 1.605 3.892" clipRule="evenodd"/><path fill="var(--icon-success)" d="M15.686 19.917v-2.64h-2.639V15.52h2.639v-2.64h1.76v2.64h2.638v1.759h-2.639v2.639z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M11.4 3.2v4H13v-4zm-5.15 8.74q.45.58 1.15.78V3.2H5.8v7.4q0 .76.45 1.34m-1.79 2.6Q5.92 16 8 16q.48 0 .93-.09t.87-.25v-1.78q-.4.26-.85.39T8 14.4q-1.42 0-2.42-.99T4.6 11V3.6q0-.84.58-1.42T6.6 1.6t1.41.58.59 1.42v6h1.6v-6q0-1.5-1.05-2.55T6.6 0 4.05 1.05 3 3.6V11q0 2.08 1.46 3.54" clipRule="evenodd"/><path fill="var(--icon-success)" d="M11.4 15.2v-2.4H9v-1.6h2.4V8.8H13v2.4h2.4v1.6H13v2.4z"/></> }
    }
};

export function AttachFileAdd({
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

AttachFileAdd.displayName = "AttachFileAdd";
