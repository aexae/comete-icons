import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M8.833 17.814 2 2l15.706 6.493c2.56 1.053 4.248 3.575 4.293 6.39.058 3.867-2.975 7.059-6.769 7.117h-.108c-2.72 0-5.189-1.638-6.29-4.186m9.253-5.051a2.63 2.63 0 0 1-2.622 2.637 2.63 2.63 0 0 1-2.621-2.637 2.63 2.63 0 0 1 2.621-2.638 2.63 2.63 0 0 1 2.621 2.638m1.92 5.272c-1.116 1.501-2.884 2.684-4.881 2.715h-.096c-1.623 0-3.145-.837-4.279-1.925a2.5 2.5 0 0 1 2.486-2.37h4.456c1.049 0 1.947.656 2.314 1.58" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M5.466 12.651 0 0l12.565 5.195c2.047.842 3.399 2.86 3.434 5.111.046 3.094-2.38 5.647-5.415 5.694h-.087c-2.175 0-4.15-1.31-5.03-3.349m7.402-4.04c0 1.164-.939 2.11-2.097 2.11a2.104 2.104 0 0 1-2.097-2.11c0-1.166.94-2.111 2.097-2.111s2.097.945 2.097 2.11m1.537 4.217c-.893 1.2-2.307 2.147-3.905 2.172h-.077C9.124 15 7.907 14.33 7 13.46a2 2 0 0 1 1.989-1.896h3.565c.838 0 1.557.525 1.85 1.264" clipRule="evenodd"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M8.833 17.814 2 2l15.706 6.493c2.56 1.053 4.248 3.575 4.293 6.39.058 3.867-2.975 7.059-6.769 7.117h-.108c-2.72 0-5.189-1.638-6.29-4.186m9.253-5.051a2.63 2.63 0 0 1-2.622 2.637 2.63 2.63 0 0 1-2.621-2.637 2.63 2.63 0 0 1 2.621-2.638 2.63 2.63 0 0 1 2.621 2.638m1.92 5.272c-1.116 1.501-2.884 2.684-4.881 2.715h-.096c-1.623 0-3.145-.837-4.279-1.925a2.5 2.5 0 0 1 2.486-2.37h4.456c1.049 0 1.947.656 2.314 1.58" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M5.466 12.651 0 0l12.565 5.195c2.047.842 3.399 2.86 3.434 5.111.046 3.094-2.38 5.647-5.415 5.694h-.087c-2.175 0-4.15-1.31-5.03-3.349m7.402-4.04c0 1.164-.939 2.11-2.097 2.11a2.104 2.104 0 0 1-2.097-2.11c0-1.166.94-2.111 2.097-2.111s2.097.945 2.097 2.11m1.537 4.217c-.893 1.2-2.307 2.147-3.905 2.172h-.077C9.124 15 7.907 14.33 7 13.46a2 2 0 0 1 1.989-1.896h3.565c.838 0 1.557.525 1.85 1.264" clipRule="evenodd"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="var(--logo-comete-default)" fillRule="evenodd" d="M8.833 17.814 2 2l15.706 6.493c2.56 1.053 4.248 3.575 4.293 6.39.058 3.867-2.975 7.059-6.769 7.117h-.108c-2.72 0-5.189-1.638-6.29-4.186" clipRule="evenodd"/><path fill="url(#paint0_radial_620_7332)" fillRule="evenodd" d="M15.125 20.75c1.997-.031 3.765-1.214 4.88-2.715a2.49 2.49 0 0 0-2.312-1.58h-4.457a2.5 2.5 0 0 0-2.486 2.37c1.134 1.088 2.656 1.926 4.279 1.926zm2.96-7.987a2.63 2.63 0 0 1-2.62 2.637 2.63 2.63 0 0 1-2.622-2.637 2.63 2.63 0 0 1 2.621-2.638 2.63 2.63 0 0 1 2.621 2.638" clipRule="evenodd"/><defs><radialGradient id="paint0_radial_620_7332" cx="0" cy="0" r="1" gradientTransform="matrix(27.6534 0 0 28.2035 8.302 8.496)" gradientUnits="userSpaceOnUse"><stop stopColor="var(--logo-comete-gradient-light)"/><stop offset=".736" stopColor="var(--logo-comete-gradient-dark)"/></radialGradient></defs></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="var(--logo-comete-default)" fillRule="evenodd" d="M5.466 12.651 0 0l12.565 5.195c2.047.842 3.399 2.86 3.434 5.111.046 3.094-2.38 5.647-5.415 5.694h-.087c-2.175 0-4.15-1.31-5.03-3.349" clipRule="evenodd"/><path fill="url(#paint0_radial_620_7338)" fillRule="evenodd" d="M10.5 15c1.598-.025 3.012-.971 3.905-2.172a1.995 1.995 0 0 0-1.851-1.263H8.989A2 2 0 0 0 7 13.46c.907.87 2.124 1.54 3.423 1.54zm2.368-6.39c0 1.165-.939 2.11-2.097 2.11a2.104 2.104 0 0 1-2.097-2.11c0-1.165.94-2.11 2.097-2.11s2.097.945 2.097 2.11" clipRule="evenodd"/><defs><radialGradient id="paint0_radial_620_7338" cx="0" cy="0" r="1" gradientTransform="matrix(22.1227 0 0 22.5628 5.041 5.197)" gradientUnits="userSpaceOnUse"><stop stopColor="var(--logo-comete-gradient-light)"/><stop offset=".736" stopColor="var(--logo-comete-gradient-dark)"/></radialGradient></defs></> }
    }
};

export function CometeLink({
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

CometeLink.displayName = "CometeLink";
