import type { SVGProps } from "react";

export function BeeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {/* wings */}
      <ellipse cx="8.5" cy="7.5" rx="4.5" ry="3.5" fill="currentColor" opacity={0.18} />
      <ellipse cx="15.5" cy="7.5" rx="4.5" ry="3.5" fill="currentColor" opacity={0.18} />
      <path d="M8.5 7.5 C6.5 5.5 5 6.8 5.2 8.6" />
      <path d="M15.5 7.5 C17.5 5.5 19 6.8 18.8 8.6" />
      {/* body */}
      <ellipse cx="12" cy="14.5" rx="5.2" ry="6.2" fill="currentColor" opacity={0.95} stroke="none" />
      <ellipse cx="12" cy="14.5" rx="5.2" ry="6.2" />
      {/* stripes */}
      <path d="M8.2 13.2 H15.8" stroke="#0D2B52" strokeWidth={1.35} opacity={0.95} />
      <path d="M7.6 15.3 H16.4" stroke="#0D2B52" strokeWidth={1.35} opacity={0.95} />
      <path d="M8.2 17.4 H15.8" stroke="#0D2B52" strokeWidth={1.35} opacity={0.95} />
      {/* head */}
      <circle cx="12" cy="6.8" r="2.35" fill="#0D2B52" stroke="none" />
      <circle cx="12" cy="6.8" r="2.35" />
      {/* antennae */}
      <path d="M10.6 5.1 C9.8 3.8 9.2 3.2 8.4 2.9" />
      <path d="M13.4 5.1 C14.2 3.8 14.8 3.2 15.6 2.9" />
      <circle cx="8.1" cy="2.7" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="15.9" cy="2.7" r="0.9" fill="currentColor" stroke="none" />
      {/* stinger */}
      <path d="M12 20.7 L12 21.9 L11.1 20.5 Z" fill="currentColor" stroke="none" />
    </svg>
  );
}
