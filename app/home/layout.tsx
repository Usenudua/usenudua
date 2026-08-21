import type { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div aria-hidden="true" className="hero-bg" />
      {children}
    </>
  );
}
