import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 -960 960 960", paths: <><path fill="currentColor" d="M395-475q-35-35-35-85t35-85q35-35 85-35t85 35q35 35 35 85t-35 85q-35 35-85 35t-85-35ZM240-40v-309q-38-42-59-96t-21-115q0-134 93-227t227-93q134 0 227 93t93 227q0 61-21 115t-59 96v309l-240-80-240 80Zm410-350q70-70 70-170t-70-170q-70-70-170-70t-170 70q-70 70-70 170t70 170q70 70 170 70t170-70ZM320-159l160-41 160 41v-124q-35 20-75.5 31.5T480-240q-44 0-84.5-11.5T320-283v124Zm160-62Z"/></> },
      "none": { viewBox: "0 -960 960 960", paths: <><path fill="currentColor" d="M395-467q-35-35-35-85t35-85q35-35 85-35t85 35q35 35 35 85t-35 85q-35 35-85 35t-85-35ZM263-48v-280q-43-37-69-99t-26-125q0-130 91-221t221-91q130 0 221 91t91 221q0 64-24 125.5T696-327v279L480-96 263-48Zm387-334q70-70 70-170t-70-170q-70-70-170-70t-170 70q-70 70-70 170t70 170q70 70 170 70t170-70ZM335-138l145-32 144 32v-138q-33 18-69.5 27t-74.5 9q-38 0-75-8.5T335-276v138Zm145-70Z"/></> }
    },
    filled: {
      "default": { viewBox: "0 -960 960 960", paths: <><path fill="currentColor" d="M240-40v-309q-38-42-59-96t-21-115q0-134 93-227t227-93q134 0 227 93t93 227q0 61-21 115t-59 96v309l-240-80-240 80Zm240-280q100 0 170-70t70-170q0-100-70-170t-170-70q-100 0-170 70t-70 170q0 100 70 170t170 70Zm-85-155q-35-35-35-85t35-85q35-35 85-35t85 35q35 35 35 85t-35 85q-35 35-85 35t-85-35Z"/></> },
      "none": { viewBox: "0 -960 960 960", paths: <><path fill="currentColor" d="M263-48v-280q-43-37-69-99t-26-125q0-130 91-221t221-91q130 0 221 91t91 221q0 64-24 125.5T696-327v279L480-96 263-48Zm217-272q100 0 170-70t70-170q0-100-70-170t-170-70q-100 0-170 70t-70 170q0 100 70 170t170 70Zm-85-147q-35-35-35-85t35-85q35-35 85-35t85 35q35 35 35 85t-35 85q-35 35-85 35t-85-35Z"/></> }
    },
    duotone: {
      "default": { viewBox: "0 -960 960 960", paths: <><path fill="var(--icon-information)" d="M395-475q-35-35-35-85t35-85q35-35 85-35t85 35q35 35 35 85t-35 85q-35 35-85 35t-85-35Z"/><path fill="currentColor" d="M240-40v-309q-38-42-59-96t-21-115q0-134 93-227t227-93q134 0 227 93t93 227q0 61-21 115t-59 96v309l-240-80-240 80Zm410-350q70-70 70-170t-70-170q-70-70-170-70t-170 70q-70 70-70 170t70 170q70 70 170 70t170-70ZM320-159l160-41 160 41v-124q-35 20-75.5 31.5T480-240q-44 0-84.5-11.5T320-283v124Zm160-62Z"/></> },
      "none": { viewBox: "0 -960 960 960", paths: <><path fill="var(--icon-information)" d="M395-467q-35-35-35-85t35-85q35-35 85-35t85 35q35 35 35 85t-35 85q-35 35-85 35t-85-35Z"/><path fill="currentColor" d="M263-48v-280q-43-37-69-99t-26-125q0-130 91-221t221-91q130 0 221 91t91 221q0 64-24 125.5T696-327v279L480-96 263-48Zm387-334q70-70 70-170t-70-170q-70-70-170-70t-170 70q-70 70-70 170t70 170q70 70 170 70t170-70ZM335-138l145-32 144 32v-138q-33 18-69.5 27t-74.5 9q-38 0-75-8.5T335-276v138Zm145-70Z"/></> }
    }
};

export function License({
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

License.displayName = "License";
