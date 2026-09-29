import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="m2 2 6.833 15.814c1.1 2.548 3.57 4.186 6.289 4.186h.108c3.794-.058 6.827-3.25 6.77-7.117-.046-2.815-1.735-5.337-4.294-6.39zm18.154 11.262-4.953-2.545a.65.65 0 0 0-.558 0L9.69 13.262c-.251.153-.255.429 0 .57l4.953 2.546a.65.65 0 0 0 .558 0l4.051-2.082v.714a.6.6 0 0 1 .394.013v-.929l.508-.26c.238-.135.24-.442 0-.571m-5.511 3.652a.65.65 0 0 0 .558 0l3.264-1.677v2.142c0 .889-1.586 1.608-3.543 1.608s-3.543-.72-3.543-1.608v-2.142zm4.41-.823-.074 1.345a.13.13 0 0 0 .129.131h.645a.13.13 0 0 0 .129-.13l-.042-1.346a.2.2 0 0 0-.007-.048.6.6 0 0 1-.778.023zm.377-.044c.25 0 .452-.205.452-.456a.454.454 0 0 0-.452-.456.454.454 0 0 0-.45.456c0 .252.201.456.45.456" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="m0 0 5.466 12.651C6.346 14.69 8.322 16 10.497 16h.087c3.035-.047 5.461-2.6 5.415-5.694-.036-2.251-1.387-4.269-3.434-5.111zm14.523 9.01-3.962-2.036a.52.52 0 0 0-.447 0L6.152 9.01c-.201.122-.204.343 0 .456l3.962 2.036a.52.52 0 0 0 .447 0l3.24-1.665v.57a.5.5 0 0 1 .316.011v-.743l.406-.208c.19-.108.192-.354 0-.457m-4.409 2.921a.52.52 0 0 0 .447 0l2.611-1.341v1.713c0 .711-1.269 1.287-2.834 1.287s-2.835-.576-2.835-1.287V10.59zm3.528-.658-.059 1.076c0 .058.046.105.103.105h.517a.104.104 0 0 0 .103-.105l-.034-1.076a.1.1 0 0 0-.006-.039.48.48 0 0 1-.622.019zm.302-.036c.2 0 .361-.163.361-.364a.363.363 0 0 0-.36-.365c-.2 0-.362.163-.362.365s.162.364.361.364" clipRule="evenodd"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="m2 2 6.833 15.814c1.1 2.548 3.57 4.186 6.289 4.186h.108c3.794-.058 6.827-3.25 6.77-7.117-.046-2.815-1.735-5.337-4.294-6.39zm18.154 11.262-4.953-2.545a.65.65 0 0 0-.558 0L9.69 13.262c-.251.153-.255.429 0 .57l4.953 2.546a.65.65 0 0 0 .558 0l4.051-2.082v.714a.6.6 0 0 1 .394.013v-.929l.508-.26c.238-.135.24-.442 0-.571m-5.511 3.652a.65.65 0 0 0 .558 0l3.264-1.677v2.142c0 .889-1.586 1.608-3.543 1.608s-3.543-.72-3.543-1.608v-2.142zm4.41-.823-.074 1.345a.13.13 0 0 0 .129.131h.645a.13.13 0 0 0 .129-.13l-.042-1.346a.2.2 0 0 0-.007-.048.6.6 0 0 1-.778.023zm.377-.044c.25 0 .452-.205.452-.456a.454.454 0 0 0-.452-.456.454.454 0 0 0-.45.456c0 .252.201.456.45.456" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="m0 0 5.466 12.651C6.346 14.69 8.322 16 10.497 16h.087c3.035-.047 5.461-2.6 5.415-5.694-.036-2.251-1.387-4.269-3.434-5.111zm14.523 9.01-3.962-2.036a.52.52 0 0 0-.447 0L6.152 9.01c-.201.122-.204.343 0 .456l3.962 2.036a.52.52 0 0 0 .447 0l3.24-1.665v.57a.5.5 0 0 1 .316.011v-.743l.406-.208c.19-.108.192-.354 0-.457m-4.409 2.921a.52.52 0 0 0 .447 0l2.611-1.341v1.713c0 .711-1.269 1.287-2.834 1.287s-2.835-.576-2.835-1.287V10.59zm3.528-.658-.059 1.076c0 .058.046.105.103.105h.517a.104.104 0 0 0 .103-.105l-.034-1.076a.1.1 0 0 0-.006-.039.48.48 0 0 1-.622.019zm.302-.036c.2 0 .361-.163.361-.364a.363.363 0 0 0-.36-.365c-.2 0-.362.163-.362.365s.162.364.361.364" clipRule="evenodd"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="var(--logo-comete-default)" d="m2 2 6.833 15.814c1.1 2.548 3.57 4.186 6.289 4.186h.108c3.794-.058 6.827-3.25 6.77-7.117-.046-2.815-1.735-5.337-4.294-6.39z"/><path fill="url(#paint0_radial_1038_3418)" d="M15.202 16.914a.65.65 0 0 1-.56 0l-3.263-1.677v2.142c0 .888 1.587 1.608 3.543 1.608s3.543-.72 3.543-1.608v-2.142z"/><path fill="url(#paint1_radial_1038_3418)" fillRule="evenodd" d="m15.202 10.717 4.952 2.545c.24.13.238.437 0 .571l-.508.261v.929a.6.6 0 0 0-.394-.013v-.714l-4.05 2.082a.65.65 0 0 1-.56 0L9.69 13.833c-.255-.142-.251-.418 0-.57l4.953-2.546a.65.65 0 0 1 .558 0m3.853 5.349-.002.025-.074 1.345a.13.13 0 0 0 .129.131h.645a.13.13 0 0 0 .129-.13l-.042-1.346a.2.2 0 0 0-.007-.048.6.6 0 0 1-.778.023" clipRule="evenodd"/><path fill="url(#paint2_radial_1038_3418)" d="M19.882 15.59a.454.454 0 0 1-.452.457.454.454 0 0 1-.45-.456c0-.252.201-.456.45-.456.25 0 .452.204.452.456"/><defs><radialGradient id="paint0_radial_1038_3418" cx="0" cy="0" r="1" gradientTransform="matrix(27.6534 0 0 28.2035 8.302 8.496)" gradientUnits="userSpaceOnUse"><stop stopColor="var(--logo-comete-gradient-light)"/><stop offset=".736" stopColor="var(--logo-comete-gradient-dark)"/></radialGradient><radialGradient id="paint1_radial_1038_3418" cx="0" cy="0" r="1" gradientTransform="matrix(27.6534 0 0 28.2035 8.302 8.496)" gradientUnits="userSpaceOnUse"><stop stopColor="var(--logo-comete-gradient-light)"/><stop offset=".736" stopColor="var(--logo-comete-gradient-dark)"/></radialGradient><radialGradient id="paint2_radial_1038_3418" cx="0" cy="0" r="1" gradientTransform="matrix(27.6534 0 0 28.2035 8.302 8.496)" gradientUnits="userSpaceOnUse"><stop stopColor="var(--logo-comete-gradient-light)"/><stop offset=".736" stopColor="var(--logo-comete-gradient-dark)"/></radialGradient></defs></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="var(--logo-comete-default)" d="m0 0 5.466 12.651C6.346 14.69 8.322 16 10.497 16h.087c3.035-.047 5.461-2.6 5.415-5.694-.036-2.251-1.387-4.269-3.434-5.111z"/><path fill="url(#paint0_radial_1038_3424)" d="M10.561 11.931a.52.52 0 0 1-.447 0l-2.61-1.341v1.713c0 .71 1.268 1.287 2.834 1.287 1.565 0 2.834-.576 2.834-1.287V10.59z"/><path fill="url(#paint1_radial_1038_3424)" fillRule="evenodd" d="m10.561 6.974 3.962 2.036c.192.103.19.35 0 .457l-.406.208v.743a.5.5 0 0 0-.315-.01v-.571l-3.241 1.665a.52.52 0 0 1-.447 0L6.152 9.466c-.204-.113-.201-.334 0-.456l3.962-2.036a.52.52 0 0 1 .447 0m3.083 4.279-.002.02-.059 1.076c0 .058.046.105.103.105h.517a.104.104 0 0 0 .103-.105l-.034-1.076a.1.1 0 0 0-.006-.039.48.48 0 0 1-.622.019" clipRule="evenodd"/><path fill="url(#paint2_radial_1038_3424)" d="M14.306 10.873a.363.363 0 0 1-.362.364.363.363 0 0 1-.36-.364c0-.202.161-.365.36-.365.2 0 .361.163.361.365"/><defs><radialGradient id="paint0_radial_1038_3424" cx="0" cy="0" r="1" gradientTransform="matrix(22.1227 0 0 22.5628 5.041 5.197)" gradientUnits="userSpaceOnUse"><stop stopColor="var(--logo-comete-gradient-light)"/><stop offset=".736" stopColor="var(--logo-comete-gradient-dark)"/></radialGradient><radialGradient id="paint1_radial_1038_3424" cx="0" cy="0" r="1" gradientTransform="matrix(22.1227 0 0 22.5628 5.041 5.197)" gradientUnits="userSpaceOnUse"><stop stopColor="var(--logo-comete-gradient-light)"/><stop offset=".736" stopColor="var(--logo-comete-gradient-dark)"/></radialGradient><radialGradient id="paint2_radial_1038_3424" cx="0" cy="0" r="1" gradientTransform="matrix(22.1227 0 0 22.5628 5.041 5.197)" gradientUnits="userSpaceOnUse"><stop stopColor="var(--logo-comete-gradient-light)"/><stop offset=".736" stopColor="var(--logo-comete-gradient-dark)"/></radialGradient></defs></> }
    }
};

export function CometeAcademie({
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

CometeAcademie.displayName = "CometeAcademie";
