import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="m2 2 6.833 15.814c1.1 2.548 3.57 4.186 6.289 4.186h.108c3.794-.058 6.827-3.25 6.77-7.117-.046-2.815-1.735-5.337-4.294-6.39zm14.576 10.5q.017.03.027.064a.3.3 0 0 1 .012.107v7.883a6 6 0 0 1-1.443.196h-.095q-.466 0-.927-.072l-.015-.036-.003-.007q-.006-.012-.007-.026v-.007l-.006-.035v-7.931a.3.3 0 0 1 .042-.135.36.36 0 0 1 .317-.188h1.781a.36.36 0 0 1 .317.186m3.569 1.714v3.823a6.14 6.14 0 0 1-2.501 2.149v-5.972a.36.36 0 0 1 .252-.344.4.4 0 0 1 .107-.014h1.819a.37.37 0 0 1 .262.157c.04.06.06.13.06.2m-9.551 4.557a6.1 6.1 0 0 0 2.5 1.646v-4.47a.37.37 0 0 0-.157-.262.35.35 0 0 0-.201-.059h-1.784a.357.357 0 0 0-.358.322z" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="m0 0 5.466 12.651C6.346 14.69 8.322 16 10.497 16h.087c3.035-.047 5.461-2.6 5.415-5.694-.036-2.251-1.387-4.269-3.434-5.111zm11.66 8.4a.3.3 0 0 1 .031.138v6.278q.003.014.001.027a4.8 4.8 0 0 1-1.154.157h-.076q-.374 0-.742-.058l-.012-.028-.002-.006-.006-.02v-.006a.2.2 0 0 1-.004-.065V8.508a.3.3 0 0 1 .033-.107.29.29 0 0 1 .253-.151h1.425a.29.29 0 0 1 .254.15m2.856 1.37v3.06a4.9 4.9 0 0 1-2 1.719V9.77a.29.29 0 0 1 .257-.286h1.485a.3.3 0 0 1 .21.126.3.3 0 0 1 .048.16m-7.641 3.647a4.9 4.9 0 0 0 2 1.317v-3.576a.3.3 0 0 0-.126-.21.3.3 0 0 0-.16-.047H7.162a.286.286 0 0 0-.287.257z" clipRule="evenodd"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="m2 2 6.833 15.814c1.1 2.548 3.57 4.186 6.289 4.186h.108c3.794-.058 6.827-3.25 6.77-7.117-.046-2.815-1.735-5.337-4.294-6.39zm14.576 10.5q.017.03.027.064a.3.3 0 0 1 .012.107v7.883a6 6 0 0 1-1.443.196h-.095q-.466 0-.927-.072l-.015-.036-.003-.007q-.006-.012-.007-.026v-.007l-.006-.035v-7.931a.3.3 0 0 1 .042-.135.36.36 0 0 1 .317-.188h1.781a.36.36 0 0 1 .317.186m3.569 1.714v3.823a6.14 6.14 0 0 1-2.501 2.149v-5.972a.36.36 0 0 1 .252-.344.4.4 0 0 1 .107-.014h1.819a.37.37 0 0 1 .262.157c.04.06.06.13.06.2m-9.551 4.557a6.1 6.1 0 0 0 2.5 1.646v-4.47a.37.37 0 0 0-.157-.262.35.35 0 0 0-.201-.059h-1.784a.357.357 0 0 0-.358.322z" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="m0 0 5.466 12.651C6.346 14.69 8.322 16 10.497 16h.087c3.035-.047 5.461-2.6 5.415-5.694-.036-2.251-1.387-4.269-3.434-5.111zm11.66 8.4a.3.3 0 0 1 .031.138v6.278q.003.014.001.027a4.8 4.8 0 0 1-1.154.157h-.076q-.374 0-.742-.058l-.012-.028-.002-.006-.006-.02v-.006a.2.2 0 0 1-.004-.065V8.508a.3.3 0 0 1 .033-.107.29.29 0 0 1 .253-.151h1.425a.29.29 0 0 1 .254.15m2.856 1.37v3.06a4.9 4.9 0 0 1-2 1.719V9.77a.29.29 0 0 1 .257-.286h1.485a.3.3 0 0 1 .21.126.3.3 0 0 1 .048.16m-7.641 3.647a4.9 4.9 0 0 0 2 1.317v-3.576a.3.3 0 0 0-.126-.21.3.3 0 0 0-.16-.047H7.162a.286.286 0 0 0-.287.257z" clipRule="evenodd"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="var(--logo-comete-default)" fillRule="evenodd" d="M8.833 17.814 2 2l15.706 6.493c2.56 1.053 4.248 3.575 4.293 6.39.058 3.867-2.975 7.059-6.769 7.117h-.108c-2.72 0-5.189-1.638-6.29-4.186" clipRule="evenodd"/><path fill="url(#paint0_radial_620_7366)" fillRule="evenodd" d="M13.094 20.417a6.1 6.1 0 0 1-2.5-1.646v-2.823a.36.36 0 0 1 .358-.322h1.784a.354.354 0 0 1 .358.322zm3.51-7.853a.37.37 0 0 0-.143-.192.36.36 0 0 0-.202-.06h-1.781a.36.36 0 0 0-.359.324v7.886a.3.3 0 0 0 .006.08v.007q.001.014.007.026l.003.007.015.036q.461.071.927.072h.095a6 6 0 0 0 1.443-.196v-7.882a.3.3 0 0 0-.012-.108m3.54 1.65v3.823a6.14 6.14 0 0 1-2.5 2.149v-5.972a.36.36 0 0 1 .252-.344.4.4 0 0 1 .107-.014h1.819a.37.37 0 0 1 .262.157c.04.06.06.13.06.2" clipRule="evenodd"/><defs><radialGradient id="paint0_radial_620_7366" cx="0" cy="0" r="1" gradientTransform="matrix(27.6534 0 0 28.2035 8.302 8.496)" gradientUnits="userSpaceOnUse"><stop stopColor="var(--logo-comete-gradient-light)"/><stop offset=".736" stopColor="var(--logo-comete-gradient-dark)"/></radialGradient></defs></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="var(--logo-comete-default)" fillRule="evenodd" d="M5.466 12.651 0 0l12.565 5.195c2.047.842 3.399 2.86 3.434 5.111.046 3.094-2.38 5.647-5.415 5.694h-.087c-2.175 0-4.15-1.31-5.03-3.349" clipRule="evenodd"/><path fill="url(#paint0_radial_620_7372)" fillRule="evenodd" d="M8.875 14.734a4.9 4.9 0 0 1-2-1.317v-2.259a.3.3 0 0 1 .126-.21.3.3 0 0 1 .16-.047H8.59q.088 0 .16.048a.3.3 0 0 1 .126.21zm2.808-6.282a.3.3 0 0 0-.114-.153.3.3 0 0 0-.162-.049H9.982a.29.29 0 0 0-.286.259v6.308a.2.2 0 0 0 .004.065v.005q0 .01.006.021l.002.006.012.028q.368.058.742.058h.076q.587-.009 1.154-.157V8.537a.3.3 0 0 0-.01-.085m2.833 1.319v3.058a4.9 4.9 0 0 1-2 1.72V9.77a.29.29 0 0 1 .257-.286h1.485a.3.3 0 0 1 .21.126.3.3 0 0 1 .048.16" clipRule="evenodd"/><defs><radialGradient id="paint0_radial_620_7372" cx="0" cy="0" r="1" gradientTransform="matrix(22.1227 0 0 22.5628 5.041 5.197)" gradientUnits="userSpaceOnUse"><stop stopColor="var(--logo-comete-gradient-light)"/><stop offset=".736" stopColor="var(--logo-comete-gradient-dark)"/></radialGradient></defs></> }
    }
};

export function CometeBi({
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

CometeBi.displayName = "CometeBi";
