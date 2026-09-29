import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="m11.266 12.417 4.525-4.31L14.63 7l-3.384 3.223-1.682-1.602-1.141 1.087z"/><path fill="currentColor" fillRule="evenodd" d="M3.044 21.125Q3.87 22 5.05 22h8.756a5.9 5.9 0 0 1-1.53-2H5.051a.9.9 0 0 1-.673-.288A1 1 0 0 1 4.106 19v-1h7.651a5.8 5.8 0 0 1 .204-2H6.94V5h10.39v6.743c.64-.039 1.29.025 1.89.179V2l-1.417 1.5L16.386 2 14.97 3.5 13.552 2l-1.417 1.5L10.72 2 9.302 3.5 7.885 2 6.468 3.5 5.05 2v14H2.217v3q0 1.25.827 2.125" clipRule="evenodd"/><path fill="currentColor" fillRule="evenodd" d="M17.727 22c2.48 0 4.49-1.97 4.49-4.401s-2.01-4.401-4.49-4.401-4.49 1.97-4.49 4.401S15.248 22 17.728 22m-2.616-2.807.99.97 1.626-1.594 1.627 1.595.99-.97-1.627-1.595 1.627-1.594-.99-.97-1.627 1.594-1.626-1.595-.99.97 1.626 1.595z" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="m7.246 8.333 3.548-3.448L9.884 4 7.23 6.579 5.911 5.297l-.895.87z"/><path fill="currentColor" fillRule="evenodd" d="M.798 15.3q.648.7 1.574.7H9.24a4.7 4.7 0 0 1-1.2-1.6H2.372a.7.7 0 0 1-.528-.23.8.8 0 0 1-.213-.57v-.8h6a4.7 4.7 0 0 1 .16-1.6H3.854V2.4h8.148v5.394a4.8 4.8 0 0 1 1.481.144V0l-1.11 1.2L11.26 0l-1.11 1.2L9.039 0 7.928 1.2 6.817 0 5.705 1.2 4.595 0 3.482 1.2 2.373 0v11.2H.15v2.4q0 1 .648 1.7" clipRule="evenodd"/><path fill="currentColor" fillRule="evenodd" d="M12.313 16a3.52 3.52 0 1 0 0-7.042 3.52 3.52 0 0 0 0 7.042m-2.052-2.245.776.776 1.276-1.276 1.275 1.276.776-.776-1.275-1.276 1.275-1.275-.776-.777-1.275 1.276-1.276-1.275-.776.776 1.275 1.275z" clipRule="evenodd"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="m11.049 12.417 4.525-4.31L14.412 7l-3.383 3.223-1.682-1.602-1.141 1.087z"/><path fill="currentColor" d="M2.826 21.125Q3.652 22 4.834 22h8.756c-1.727-1.463-2.462-3.838-1.846-6H6.723V5h10.39v6.743a6.2 6.2 0 0 1 1.89.179V2l-1.417 1.5L16.169 2l-1.417 1.5L13.335 2l-1.417 1.5L10.501 2 9.084 3.5 7.667 2 6.25 3.5 4.834 2v14H2v3q0 1.25.826 2.125"/><path fill="currentColor" fillRule="evenodd" d="M17.51 22c2.48 0 4.49-1.97 4.49-4.401s-2.01-4.401-4.49-4.401-4.49 1.97-4.49 4.401S15.03 22 17.51 22m-2.415-2.807.99.97 1.627-1.594 1.626 1.595.99-.97-1.627-1.595 1.627-1.594-.99-.97-1.626 1.594-1.627-1.595-.99.97 1.626 1.595z" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="m7.246 8.333 3.548-3.448L9.884 4 7.23 6.579 5.911 5.297l-.895.87z"/><path fill="currentColor" d="M.798 15.3q.648.7 1.574.7H9.24a4.72 4.72 0 0 1-1.448-4.8H3.854V2.4h8.148v5.394a4.8 4.8 0 0 1 1.481.144V0l-1.11 1.2L11.26 0l-1.11 1.2L9.039 0 7.928 1.2 6.817 0 5.705 1.2 4.595 0 3.482 1.2 2.373 0v11.2H.15v2.4q0 1 .648 1.7"/><path fill="currentColor" fillRule="evenodd" d="M12.313 16a3.52 3.52 0 1 0 0-7.042 3.52 3.52 0 0 0 0 7.042m-1.894-2.245.776.776 1.276-1.276 1.275 1.276.776-.777-1.275-1.275 1.275-1.275-.776-.777-1.275 1.276-1.276-1.275-.776.776 1.275 1.275z" clipRule="evenodd"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="m11.266 12.417 4.525-4.31L14.63 7l-3.384 3.223-1.682-1.602-1.141 1.087z"/><path fill="currentColor" fillRule="evenodd" d="M3.044 21.125Q3.87 22 5.05 22h8.756a5.9 5.9 0 0 1-1.53-2H5.051a.9.9 0 0 1-.673-.288A1 1 0 0 1 4.106 19v-1h7.651a5.8 5.8 0 0 1 .204-2H6.94V5h10.39v6.743c.64-.039 1.29.025 1.89.179V2l-1.417 1.5L16.386 2 14.97 3.5 13.552 2l-1.417 1.5L10.72 2 9.302 3.5 7.885 2 6.468 3.5 5.05 2v14H2.217v3q0 1.25.827 2.125" clipRule="evenodd"/><path fill="var(--icon-critical)" fillRule="evenodd" d="M17.727 22c2.48 0 4.49-1.97 4.49-4.401s-2.01-4.401-4.49-4.401-4.49 1.97-4.49 4.401S15.248 22 17.728 22m-2.616-2.807.99.97 1.626-1.594 1.627 1.595.99-.97-1.627-1.595 1.627-1.594-.99-.97-1.627 1.594-1.626-1.595-.99.97 1.626 1.595z" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="m7.246 8.333 3.548-3.448L9.884 4 7.23 6.579 5.911 5.297l-.895.87z"/><path fill="currentColor" fillRule="evenodd" d="M.798 15.3q.648.7 1.574.7H9.24a4.7 4.7 0 0 1-1.2-1.6H2.372a.7.7 0 0 1-.528-.23.8.8 0 0 1-.213-.57v-.8h6a4.7 4.7 0 0 1 .16-1.6H3.854V2.4h8.148v5.394a4.8 4.8 0 0 1 1.481.144V0l-1.11 1.2L11.26 0l-1.11 1.2L9.039 0 7.928 1.2 6.817 0 5.705 1.2 4.595 0 3.482 1.2 2.373 0v11.2H.15v2.4q0 1 .648 1.7" clipRule="evenodd"/><path fill="var(--icon-critical)" fillRule="evenodd" d="M12.313 16a3.52 3.52 0 1 0 0-7.042 3.52 3.52 0 0 0 0 7.042m-2.052-2.245.776.776 1.276-1.276 1.275 1.276.776-.776-1.275-1.276 1.275-1.275-.776-.777-1.275 1.276-1.276-1.275-.776.776 1.275 1.275z" clipRule="evenodd"/></> }
    }
};

export function InvoiceCancellation({
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

InvoiceCancellation.displayName = "InvoiceCancellation";
