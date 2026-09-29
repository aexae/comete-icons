import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="m2 2 6.833 15.814c1.1 2.548 3.57 4.186 6.289 4.186h.108c3.794-.058 6.827-3.25 6.77-7.117-.046-2.815-1.735-5.337-4.294-6.39zm11.321 17.292q.839.365 1.804.365a4.5 4.5 0 0 0 1.804-.365 4.7 4.7 0 0 0 1.467-.993q.628-.628.993-1.467.366-.84.365-1.802 0-.806-.269-1.548a4.5 4.5 0 0 0-.75-1.361 4.7 4.7 0 0 0-1.829-1.357 4.6 4.6 0 0 0-1.787-.365q-.959 0-1.798.365a4.7 4.7 0 0 0-1.467.993q-.628.629-.993 1.467a4.5 4.5 0 0 0-.366 1.804q0 .964.366 1.804.364.84.993 1.467.628.629 1.467.993m3.06-2.17.81-.809-1.56-1.56v-2.656h-1.155v3.119z" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="m0 0 5.466 12.651C6.346 14.69 8.322 16 10.497 16h.087c3.035-.047 5.461-2.6 5.415-5.694-.036-2.251-1.387-4.269-3.434-5.111zm9.057 13.834q.67.291 1.443.292.771 0 1.443-.292.672-.293 1.174-.795.503-.503.794-1.173.292-.672.292-1.442 0-.645-.215-1.238a3.6 3.6 0 0 0-.6-1.09 3.74 3.74 0 0 0-1.463-1.085 3.7 3.7 0 0 0-1.43-.292q-.766 0-1.438.292-.673.293-1.174.795-.503.502-.794 1.173a3.6 3.6 0 0 0-.293 1.443q0 .772.293 1.444.292.67.794 1.173.502.502 1.174.795m2.448-1.736.647-.647-1.247-1.248V8.077H9.98v2.496z" clipRule="evenodd"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="m2 2 6.833 15.814c1.1 2.548 3.57 4.186 6.289 4.186h.108c3.794-.058 6.827-3.25 6.77-7.117-.046-2.815-1.735-5.337-4.294-6.39zm11.321 17.292q.839.365 1.804.365a4.5 4.5 0 0 0 1.804-.365 4.7 4.7 0 0 0 1.467-.993q.628-.628.993-1.467.366-.84.365-1.802 0-.806-.269-1.548a4.5 4.5 0 0 0-.75-1.361 4.7 4.7 0 0 0-1.829-1.357 4.6 4.6 0 0 0-1.787-.365q-.959 0-1.798.365a4.7 4.7 0 0 0-1.467.993q-.628.629-.993 1.467a4.5 4.5 0 0 0-.366 1.804q0 .964.366 1.804.364.84.993 1.467.628.629 1.467.993m3.06-2.17.81-.809-1.56-1.56v-2.656h-1.155v3.119z" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="m0 0 5.466 12.651C6.346 14.69 8.322 16 10.497 16h.087c3.035-.047 5.461-2.6 5.415-5.694-.036-2.251-1.387-4.269-3.434-5.111zm9.057 13.834q.67.291 1.443.292.771 0 1.443-.292.672-.293 1.174-.795.503-.503.794-1.173.292-.672.292-1.442 0-.645-.215-1.238a3.6 3.6 0 0 0-.6-1.09 3.74 3.74 0 0 0-1.463-1.085 3.7 3.7 0 0 0-1.43-.292q-.766 0-1.438.292-.673.293-1.174.795-.503.502-.794 1.173a3.6 3.6 0 0 0-.293 1.443q0 .772.293 1.444.292.67.794 1.173.502.502 1.174.795m2.448-1.736.647-.647-1.247-1.248V8.077H9.98v2.496z" clipRule="evenodd"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="var(--logo-comete-default)" fillRule="evenodd" d="M8.833 17.814 2 2l15.706 6.493c2.56 1.053 4.248 3.575 4.293 6.39.058 3.867-2.975 7.059-6.769 7.117h-.108c-2.72 0-5.189-1.638-6.29-4.186" clipRule="evenodd"/><path fill="url(#paint0_radial_620_7349)" fillRule="evenodd" d="M13.321 19.292q.839.365 1.804.365.964 0 1.804-.365a4.7 4.7 0 0 0 1.467-.993q.628-.628.993-1.467t.365-1.802q0-.806-.269-1.548a4.5 4.5 0 0 0-.75-1.361 4.7 4.7 0 0 0-1.829-1.357 4.6 4.6 0 0 0-1.787-.365q-.959 0-1.798.365a4.7 4.7 0 0 0-1.467.993 4.7 4.7 0 0 0-.993 1.467 4.5 4.5 0 0 0-.366 1.804q0 .964.366 1.804.364.84.993 1.467.627.629 1.467.993m3.87-2.979-.81.809-1.905-1.906v-3.12h1.155v2.658z" clipRule="evenodd"/><defs><radialGradient id="paint0_radial_620_7349" cx="0" cy="0" r="1" gradientTransform="matrix(27.6535 0 0 28.2035 8.302 8.496)" gradientUnits="userSpaceOnUse"><stop stopColor="var(--logo-comete-gradient-light)"/><stop offset=".736" stopColor="var(--logo-comete-gradient-dark)"/></radialGradient></defs></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="var(--logo-comete-default)" fillRule="evenodd" d="M5.466 12.651 0 0l12.565 5.195c2.047.842 3.399 2.86 3.434 5.111.046 3.094-2.38 5.647-5.415 5.694h-.087c-2.175 0-4.15-1.31-5.03-3.349" clipRule="evenodd"/><path fill="url(#paint0_radial_620_7355)" fillRule="evenodd" d="M9.057 13.834q.67.291 1.443.292.771 0 1.443-.292.671-.293 1.174-.795.503-.503.794-1.173.292-.672.292-1.442 0-.645-.215-1.238a3.6 3.6 0 0 0-.6-1.09 3.74 3.74 0 0 0-1.463-1.085 3.7 3.7 0 0 0-1.43-.292q-.766 0-1.438.292-.672.293-1.174.795-.503.502-.794 1.173a3.6 3.6 0 0 0-.293 1.443q0 .772.293 1.444.292.67.794 1.173.502.502 1.174.795m3.095-2.383-.647.646-1.525-1.524V8.077h.925v2.126z" clipRule="evenodd"/><defs><radialGradient id="paint0_radial_620_7355" cx="0" cy="0" r="1" gradientTransform="matrix(22.1228 0 0 22.5628 5.041 5.197)" gradientUnits="userSpaceOnUse"><stop stopColor="var(--logo-comete-gradient-light)"/><stop offset=".736" stopColor="var(--logo-comete-gradient-dark)"/></radialGradient></defs></> }
    }
};

export function CometeOnTime({
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

CometeOnTime.displayName = "CometeOnTime";
