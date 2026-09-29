import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="m1 21.5 11-19 11 19zm18.55-2H4.45L12 6.5zM11 15.49h2v-5h-2zm1 3.01c.28 0 .52-.1.71-.29s.29-.43.29-.71-.1-.52-.29-.71a.97.97 0 0 0-.71-.29c-.28 0-.52.1-.71.29s-.29.43-.29.71.1.52.29.71.43.29.71.29" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M0 14.818 8 1l8 13.818zm13.49-1.454H2.51L8 3.909zm-6.217-2.917h1.454V6.811H7.273zM8 12.637a.7.7 0 0 0 .516-.212.7.7 0 0 0 .211-.516.7.7 0 0 0-.21-.516.7.7 0 0 0-.517-.211.7.7 0 0 0-.516.21.7.7 0 0 0-.211.517q.002.307.21.516.21.21.517.211" clipRule="evenodd"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="m1 21.5 11-19 11 19zm11-3q.424 0 .713-.288A.97.97 0 0 0 13 17.5a.97.97 0 0 0-.287-.712A.97.97 0 0 0 12 16.5a.97.97 0 0 0-.713.288.97.97 0 0 0-.287.712q0 .424.287.712.288.288.713.288m1-3h-2v-5h2z" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M0 14.818 8 1l8 13.818zm8-2.182q.31 0 .518-.209.21-.21.21-.518a.7.7 0 0 0-.21-.518.7.7 0 0 0-.518-.21.7.7 0 0 0-.518.21.7.7 0 0 0-.21.518q0 .31.21.518.21.21.518.21m.727-2.181H7.273V6.817h1.454z" clipRule="evenodd"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="var(--icon-critical)" fillRule="evenodd" d="m1 21.5 11-19 11 19zm18.55-2L12 6.5l-7.55 13z" clipRule="evenodd"/><path fill="var(--icon-critical)" d="M11 15.5h2v-5h-2zm1 3q.424 0 .713-.288A.97.97 0 0 0 13 17.5a.97.97 0 0 0-.287-.712A.97.97 0 0 0 12 16.5a.97.97 0 0 0-.713.288.97.97 0 0 0-.287.712q0 .424.287.712.288.288.713.288"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="var(--icon-critical)" fillRule="evenodd" d="M0 14.818 8 1l8 13.818zm13.49-1.454L8 3.909l-5.49 9.455z" clipRule="evenodd"/><path fill="var(--icon-critical)" d="M7.273 10.455h1.454V6.817H7.273zM8 12.636q.31 0 .518-.209.21-.21.21-.518a.7.7 0 0 0-.21-.518.7.7 0 0 0-.518-.21.7.7 0 0 0-.518.21.7.7 0 0 0-.21.518q0 .31.21.518.21.21.518.21"/></> }
    }
};

export function Warning({
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

Warning.displayName = "Warning";
