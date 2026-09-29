import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="m8.275 17.3 1.393 1.4 1.48-1.486q.008-.219.03-.433a6.37 6.37 0 0 1 3.507-5.04l-.439-.441-2.289 2.3-2.289-2.3-1.393 1.4 2.289 2.3zm-4.69 4.113Q4.17 22 4.99 22h8.054a6.4 6.4 0 0 1-1.374-2H4.99V10h13.934v1.258a6.3 6.3 0 0 1 1.99.851V6q0-.824-.584-1.412A1.9 1.9 0 0 0 18.924 4h-.995V2h-1.99v2H7.975V2h-1.99v2H4.99q-.821 0-1.405.588A1.93 1.93 0 0 0 3 6v14q0 .824.585 1.413M18.924 8H4.99V6h13.934z" clipRule="evenodd"/><path fill="currentColor" fillRule="evenodd" d="M22 17.455C22 19.965 19.975 22 17.476 22s-4.524-2.035-4.524-4.546c0-2.51 2.026-4.545 4.524-4.545S22 14.944 22 17.454m-1.624-.816h-5.71v1.721h5.71z" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="m4.94 12.24 1.12 1.12 1.189-1.189q.006-.174.025-.346a5.1 5.1 0 0 1 2.818-4.032L9.74 7.44 7.9 9.28 6.06 7.44 4.94 8.56l1.84 1.84zm-3.77 3.29q.47.47 1.13.47h6.473a5.1 5.1 0 0 1-1.104-1.6H2.3v-8h11.2v1.006a5 5 0 0 1 1.6.681V3.2q0-.66-.47-1.13a1.54 1.54 0 0 0-1.13-.47h-.8V0h-1.6v1.6H4.7V0H3.1v1.6h-.8q-.66 0-1.13.47A1.54 1.54 0 0 0 .7 3.2v11.2q0 .66.47 1.13M13.5 4.8H2.3V3.2h11.2z" clipRule="evenodd"/><path fill="currentColor" fillRule="evenodd" d="M15.973 12.364a3.636 3.636 0 1 1-7.273 0 3.636 3.636 0 0 1 7.273 0m-1.306-.653h-4.59v1.377h4.59z" clipRule="evenodd"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="m8.275 17.3 1.393 1.4 1.48-1.486q.008-.219.03-.433a6.37 6.37 0 0 1 3.507-5.04l-.439-.441-2.289 2.3-2.289-2.3-1.393 1.4 2.289 2.3zm-4.69 4.113Q4.17 22 4.99 22h8.054a6.4 6.4 0 0 1-1.374-2H4.99V10h13.934v1.258a6.3 6.3 0 0 1 1.99.851V6q0-.824-.584-1.412A1.9 1.9 0 0 0 18.924 4h-.995V2h-1.99v2H7.975V2h-1.99v2H4.99q-.821 0-1.405.588A1.93 1.93 0 0 0 3 6v14q0 .824.585 1.413" clipRule="evenodd"/><path fill="currentColor" fillRule="evenodd" d="M22 17.455C22 19.965 19.975 22 17.476 22s-4.524-2.035-4.524-4.546c0-2.51 2.026-4.545 4.524-4.545S22 14.944 22 17.454m-1.624-.816h-5.71v1.721h5.71z" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="m4.94 12.24 1.12 1.12 1.19-1.189q.006-.174.024-.346a5.1 5.1 0 0 1 2.819-4.032L9.74 7.44 7.9 9.28 6.06 7.44 4.94 8.56l1.84 1.84zm-3.77 3.29q.47.47 1.13.47h6.474a5.1 5.1 0 0 1-1.105-1.6H2.3v-8h11.2v1.006a5 5 0 0 1 1.6.681V3.2q0-.66-.47-1.13a1.54 1.54 0 0 0-1.13-.47h-.8V0h-1.6v1.6H4.7V0H3.1v1.6h-.8q-.66 0-1.13.47A1.54 1.54 0 0 0 .7 3.2v11.2q0 .66.47 1.13" clipRule="evenodd"/><path fill="currentColor" fillRule="evenodd" d="M15.973 12.364a3.636 3.636 0 1 1-7.273 0 3.636 3.636 0 0 1 7.273 0m-1.305-.653h-4.59v1.377h4.59z" clipRule="evenodd"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="m8.275 17.3 1.393 1.4 1.48-1.486q.008-.219.03-.433a6.37 6.37 0 0 1 3.507-5.04l-.439-.441-2.289 2.3-2.289-2.3-1.393 1.4 2.289 2.3zm-4.69 4.113Q4.17 22 4.99 22h8.054a6.4 6.4 0 0 1-1.374-2H4.99V10h13.934v1.258a6.3 6.3 0 0 1 1.99.851V6q0-.824-.584-1.412A1.9 1.9 0 0 0 18.924 4h-.995V2h-1.99v2H7.975V2h-1.99v2H4.99q-.821 0-1.405.588A1.93 1.93 0 0 0 3 6v14q0 .824.585 1.413M18.924 8H4.99V6h13.934z" clipRule="evenodd"/><path fill="var(--icon-critical)" fillRule="evenodd" d="M22 17.455C22 19.965 19.975 22 17.476 22s-4.524-2.035-4.524-4.546c0-2.51 2.026-4.545 4.524-4.545S22 14.944 22 17.454m-1.624-.816h-5.71v1.721h5.71z" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="m4.94 12.24 1.12 1.12 1.19-1.189q.006-.174.024-.346a5.1 5.1 0 0 1 2.819-4.032L9.74 7.44 7.9 9.28 6.06 7.44 4.94 8.56l1.84 1.84zm-3.77 3.29q.47.47 1.13.47h6.474a5.1 5.1 0 0 1-1.105-1.6H2.3v-8h11.2v1.006a5 5 0 0 1 1.6.681V3.2q0-.66-.47-1.13a1.54 1.54 0 0 0-1.13-.47h-.8V0h-1.6v1.6H4.7V0H3.1v1.6h-.8q-.66 0-1.13.47A1.54 1.54 0 0 0 .7 3.2v11.2q0 .66.47 1.13M13.5 4.8H2.3V3.2h11.2z" clipRule="evenodd"/><path fill="var(--icon-critical)" fillRule="evenodd" d="M15.973 12.364a3.636 3.636 0 1 1-7.273 0 3.636 3.636 0 0 1 7.273 0m-1.305-.653h-4.59v1.377h4.59z" clipRule="evenodd"/></> }
    }
};

export function DeductedUnavailabilitiesHours({
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

DeductedUnavailabilitiesHours.displayName = "DeductedUnavailabilitiesHours";
