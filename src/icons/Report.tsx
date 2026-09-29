import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M7.833 22 2 16.167V7.833L7.833 2h8.334L22 7.833v8.334L16.167 22zm7.39-2.222H8.777l-4.556-4.556V8.778l4.556-4.556h6.444l4.556 4.556v6.444zM12 17.556q.473 0 .792-.32t.32-.792q0-.471-.32-.791a1.08 1.08 0 0 0-.792-.32q-.473 0-.792.32t-.32.791.32.792.792.32m-1.111-4.445h2.222V6.444H10.89z" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M4.667 16 0 11.333V4.667L4.667 0h6.666L16 4.667v6.666L11.333 16zm.755-1.778h5.156l3.644-3.644V5.422l-3.644-3.644H5.422L1.778 5.422v5.156z" clipRule="evenodd"/><path fill="currentColor" d="M7.111 8.889H8.89V3.556H7.11zM8 12.444a.86.86 0 0 0 .633-.255.86.86 0 0 0 .256-.633.86.86 0 0 0-.256-.634.86.86 0 0 0-.633-.255.86.86 0 0 0-.633.255.86.86 0 0 0-.256.634.86.86 0 0 0 .256.633.86.86 0 0 0 .633.255"/></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M7.833 22 2 16.167V7.833L7.833 2h8.334L22 7.833v8.334L16.167 22zm3.056-8.889h2.222V6.444H10.89zm1.903 4.125q-.32.32-.792.32t-.792-.32a1.08 1.08 0 0 1-.32-.792q0-.471.32-.791t.792-.32q.473 0 .792.32t.32.791-.32.792" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="currentColor" fillRule="evenodd" d="M4.667 16 0 11.333V4.667L4.667 0h6.666L16 4.667v6.666L11.333 16zM8 12.444a.86.86 0 0 0 .633-.255.86.86 0 0 0 .256-.633.86.86 0 0 0-.256-.634.86.86 0 0 0-.633-.255.86.86 0 0 0-.633.255.86.86 0 0 0-.256.634.86.86 0 0 0 .256.633.86.86 0 0 0 .633.255m.889-3.555H7.11V3.556h1.78z" clipRule="evenodd"/></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="var(--icon-critical)" fillRule="evenodd" d="M7.833 22 2 16.167V7.833L7.833 2h8.334L22 7.833v8.334L16.167 22zm.945-2.222h6.444l4.556-4.556V8.778l-4.556-4.556H8.778L4.222 8.778v6.444z" clipRule="evenodd"/><path fill="var(--icon-critical)" d="M10.889 13.111h2.222V6.444H10.89zM12 17.556q.473 0 .792-.32t.32-.792q0-.471-.32-.791a1.08 1.08 0 0 0-.792-.32q-.473 0-.792.32t-.32.791.32.792.792.32"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><path fill="var(--icon-critical)" fillRule="evenodd" d="M4.667 16 0 11.333V4.667L4.667 0h6.666L16 4.667v6.666L11.333 16zm.755-1.778h5.156l3.644-3.644V5.422l-3.644-3.644H5.422L1.778 5.422v5.156z" clipRule="evenodd"/><path fill="var(--icon-critical)" d="M7.111 8.889H8.89V3.556H7.11zM8 12.444a.86.86 0 0 0 .633-.255.86.86 0 0 0 .256-.633.86.86 0 0 0-.256-.634.86.86 0 0 0-.633-.255.86.86 0 0 0-.633.255.86.86 0 0 0-.256.634.86.86 0 0 0 .256.633.86.86 0 0 0 .633.255"/></> }
    }
};

export function Report({
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

Report.displayName = "Report";
