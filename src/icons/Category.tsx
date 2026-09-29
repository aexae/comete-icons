import type { IconProps } from "../types";
import { getIconClass } from "../utils";

const svgData: Record<string, Record<string, { viewBox: string; paths: React.JSX.Element }>> = {
    outlined: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="m6 11 5.5-9 5.5 9zm11 11q-1.875 0-3.187-1.312Q12.5 19.375 12.5 17.5t1.313-3.187T17 13t3.188 1.313T21.5 17.5t-1.312 3.188T17 22m-14.5-.5v-8h8v8zM17 20q1.05 0 1.775-.725T19.5 17.5t-.725-1.775T17 15t-1.775.725T14.5 17.5t.725 1.775T17 20m-12.5-.5h4v-4h-4zM9.55 9h3.9L11.5 5.85z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><g clip-path="url(#clip0_620_3050)"><path fill="currentColor" d="M3.25 7 7.5 0l4.25 7zM12 16q-1.458 0-2.48-1.02Q8.5 13.957 8.5 12.5t1.02-2.48Q10.543 9 12 9t2.48 1.02q1.02 1.022 1.02 2.48t-1.02 2.48Q13.457 16 12 16M.5 15.5v-6h6v6zm11.495-1q.838 0 1.422-.578A1.92 1.92 0 0 0 14 12.505q0-.838-.578-1.422a1.92 1.92 0 0 0-1.417-.583q-.838 0-1.422.579A1.92 1.92 0 0 0 10 12.495q0 .838.579 1.422a1.92 1.92 0 0 0 1.416.583M2 14h3v-3H2zm3.917-8.5h3.166L7.5 2.896z"/></g></> }
    },
    filled: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" d="m6 11 5.5-9 5.5 9zm11 11q-1.875 0-3.187-1.312Q12.5 19.375 12.5 17.5t1.313-3.187T17 13t3.188 1.313T21.5 17.5t-1.312 3.188T17 22m-14.5-.5v-8h8v8z"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><g clip-path="url(#clip0_620_3052)"><path fill="currentColor" d="M3.2 7.2 7.6 0 12 7.2zM12 16q-1.5 0-2.55-1.05T8.4 12.4t1.05-2.55T12 8.8t2.55 1.05 1.05 2.55-1.05 2.55T12 16M.4 15.6V9.2h6.4v6.4z"/></g></> }
    },
    duotone: {
      "default": { viewBox: "0 0 24 24", paths: <><path fill="currentColor" fillRule="evenodd" d="M11.5 2 6 11h11zm-9 11.5v8h8v-8zm6 6h-4v-4h4zm3-13.65L13.45 9h-3.9z" clipRule="evenodd"/><path fill="var(--icon-information)" fillRule="evenodd" d="M17 22q-1.875 0-3.187-1.312Q12.5 19.375 12.5 17.5t1.313-3.187T17 13t3.188 1.313T21.5 17.5t-1.312 3.188T17 22m1.775-2.725Q18.05 20 17 20t-1.775-.725T14.5 17.5t.725-1.775T17 15t1.775.725.725 1.775-.725 1.775" clipRule="evenodd"/></> },
      "none": { viewBox: "0 0 16 16", paths: <><g fillRule="evenodd" clip-path="url(#clip0_620_3054)" clipRule="evenodd"><path fill="currentColor" d="M7.5 0 3.25 7h8.5zm-7 9.5v6h6v-6zM5 14H2v-3h3zM7.5 2.896 9.083 5.5H5.917z"/><path fill="var(--icon-information)" d="M12 16q-1.458 0-2.48-1.02Q8.5 13.957 8.5 12.5t1.02-2.48Q10.543 9 12 9t2.48 1.02q1.02 1.022 1.02 2.48t-1.02 2.48Q13.457 16 12 16m1.417-2.078a1.94 1.94 0 0 1-1.422.578 1.92 1.92 0 0 1-1.416-.583A1.94 1.94 0 0 1 10 12.495q0-.837.583-1.416a1.94 1.94 0 0 1 1.422-.579q.837 0 1.416.583.579.584.579 1.422a1.92 1.92 0 0 1-.583 1.416"/></g></> }
    }
};

export function Category({
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

Category.displayName = "Category";
