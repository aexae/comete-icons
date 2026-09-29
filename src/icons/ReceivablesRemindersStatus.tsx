import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="m11.266 12.417 4.525-4.31L14.63 7l-3.384 3.223-1.682-1.602-1.141 1.087z"/><path fill="currentColor" fillRule="evenodd" d="M3.044 21.125Q3.87 22 5.05 22h8.756a5.9 5.9 0 0 1-1.53-2H5.051a.9.9 0 0 1-.673-.288A1 1 0 0 1 4.106 19v-1h7.651a5.8 5.8 0 0 1 .204-2H6.94V5h10.39v6.743c.64-.039 1.29.025 1.89.179V2l-1.417 1.5L16.386 2 14.97 3.5 13.552 2l-1.417 1.5L10.72 2 9.302 3.5 7.885 2 6.468 3.5 5.05 2v14H2.217v3q0 1.25.827 2.125" clipRule="evenodd"/><path fill="currentColor" fillRule="evenodd" d="M22.217 17.599c0 2.43-2.01 4.401-4.49 4.401s-4.49-1.97-4.49-4.401 2.01-4.401 4.49-4.401 4.49 1.97 4.49 4.401m-5.067.65h1.113v-3.273H17.15zm.953 2.024a.54.54 0 0 1-.396.157.544.544 0 0 1-.557-.545q0-.233.16-.389a.54.54 0 0 1 .397-.157.544.544 0 0 1 .556.546.52.52 0 0 1-.16.388" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="m7.412 8.333 3.549-3.448L10.05 4 7.396 6.579l-1.32-1.282-.894.87z"/><path fill="currentColor" fillRule="evenodd" d="M.965 15.3q.648.7 1.574.7h6.866a4.7 4.7 0 0 1-1.2-1.6H2.54a.7.7 0 0 1-.528-.23.8.8 0 0 1-.213-.57v-.8h6a4.7 4.7 0 0 1 .16-1.6H4.02V2.4h8.148v5.394a4.8 4.8 0 0 1 1.482.144V0l-1.111 1.2L11.428 0l-1.112 1.2L9.206 0 8.093 1.2 6.984 0 5.871 1.2 4.761 0 3.65 1.2 2.539 0v11.2H.316v2.4q0 1 .649 1.7" clipRule="evenodd"/><path fill="currentColor" fillRule="evenodd" d="M16 12.48a3.52 3.52 0 1 1-7.042 0 3.52 3.52 0 0 1 7.042 0m-3.973.519h.873V10.38h-.873zm.747 1.62a.42.42 0 0 1-.31.125.42.42 0 0 1-.312-.125.42.42 0 0 1-.125-.311q0-.186.125-.311a.42.42 0 0 1 .311-.126q.185 0 .311.126a.42.42 0 0 1 .126.31.42.42 0 0 1-.126.312" clipRule="evenodd"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="m10.958 12.417 4.48-4.31L14.288 7l-3.35 3.223-1.664-1.602-1.13 1.087z"/><path fill="currentColor" d="M2.818 21.125Q3.637 22 4.805 22h8.67c-1.71-1.463-2.438-3.838-1.828-6H6.676V5h10.286v6.743a6 6 0 0 1 1.87.179V2L17.43 3.5 16.027 2l-1.402 1.5L13.222 2l-1.403 1.5L10.416 2 9.014 3.5 7.61 2 6.208 3.5 4.805 2v14H2v3q0 1.25.818 2.125"/><path fill="currentColor" fillRule="evenodd" d="M22 17.599C22 20.029 20.01 22 17.555 22s-4.445-1.97-4.445-4.401 1.99-4.401 4.445-4.401S22 15.168 22 17.599m-5.016.65h1.101v-3.273h-1.101zm.943 2.024a.54.54 0 0 1-.392.157.535.535 0 0 1-.551-.545q0-.233.158-.389a.54.54 0 0 1 .393-.157.536.536 0 0 1 .55.546.53.53 0 0 1-.158.388" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="m7.254 8.333 3.549-3.448L9.892 4 7.239 6.579l-1.32-1.282-.894.87z"/><path fill="currentColor" d="M.806 15.3q.648.7 1.574.7h6.867A4.72 4.72 0 0 1 7.8 11.2H3.862V2.4h8.148v5.394a4.7 4.7 0 0 1 1.482.144V0L12.38 1.2 11.27 0l-1.112 1.2L9.048 0 7.935 1.2 6.825 0 5.714 1.2 4.603 0 3.492 1.2 2.38 0v11.2H.158v2.4q0 1 .648 1.7"/><path fill="currentColor" fillRule="evenodd" d="M16 12.48a3.52 3.52 0 1 1-7.042 0 3.52 3.52 0 0 1 7.042 0m-3.973.519h.872V10.38h-.872zm.747 1.62a.42.42 0 0 1-.31.125.42.42 0 0 1-.312-.125.42.42 0 0 1-.125-.311q0-.186.125-.311a.42.42 0 0 1 .311-.126q.186 0 .311.126a.42.42 0 0 1 .125.31.42.42 0 0 1-.125.312" clipRule="evenodd"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="m11.266 12.417 4.525-4.31L14.63 7l-3.384 3.223-1.682-1.602-1.141 1.087z"/><path fill="currentColor" fillRule="evenodd" d="M3.044 21.125Q3.87 22 5.05 22h8.756a5.9 5.9 0 0 1-1.53-2H5.051a.9.9 0 0 1-.673-.288A1 1 0 0 1 4.106 19v-1h7.651a5.8 5.8 0 0 1 .204-2H6.94V5h10.39v6.743c.64-.039 1.29.025 1.89.179V2l-1.417 1.5L16.386 2 14.97 3.5 13.552 2l-1.417 1.5L10.72 2 9.302 3.5 7.885 2 6.468 3.5 5.05 2v14H2.217v3q0 1.25.827 2.125" clipRule="evenodd"/><path fill="var(--icon-critical)" fillRule="evenodd" d="M22.217 17.599c0 2.43-2.01 4.401-4.49 4.401s-4.49-1.97-4.49-4.401 2.01-4.401 4.49-4.401 4.49 1.97 4.49 4.401m-5.067.65h1.113v-3.273H17.15zm.953 2.024a.54.54 0 0 1-.396.157.544.544 0 0 1-.557-.545q0-.233.16-.389a.54.54 0 0 1 .397-.157.544.544 0 0 1 .556.546.52.52 0 0 1-.16.388" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" d="m7.412 8.333 3.549-3.448L10.05 4 7.396 6.579l-1.32-1.282-.894.87z"/><path fill="currentColor" fillRule="evenodd" d="M.965 15.3q.648.7 1.574.7h6.866a4.7 4.7 0 0 1-1.2-1.6H2.54a.7.7 0 0 1-.528-.23.8.8 0 0 1-.213-.57v-.8h6a4.7 4.7 0 0 1 .16-1.6H4.02V2.4h8.148v5.394a4.8 4.8 0 0 1 1.482.144V0l-1.111 1.2L11.428 0l-1.112 1.2L9.206 0 8.093 1.2 6.984 0 5.871 1.2 4.761 0 3.65 1.2 2.539 0v11.2H.316v2.4q0 1 .649 1.7" clipRule="evenodd"/><path fill="var(--icon-critical)" fillRule="evenodd" d="M16 12.48a3.52 3.52 0 1 1-7.042 0 3.52 3.52 0 0 1 7.042 0m-3.973.519h.873V10.38h-.873zm.747 1.62a.42.42 0 0 1-.31.125.42.42 0 0 1-.312-.125.42.42 0 0 1-.125-.311q0-.186.125-.311a.42.42 0 0 1 .311-.126q.185 0 .311.126a.42.42 0 0 1 .126.31.42.42 0 0 1-.126.312" clipRule="evenodd"/></> }
    }
};

export function ReceivablesRemindersStatus({
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

ReceivablesRemindersStatus.displayName = "ReceivablesRemindersStatus";
