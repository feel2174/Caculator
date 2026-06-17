"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

export function TaboolaPlacements() {
  const pathname = usePathname();
  const isLocaleHome = /^\/[a-z]{2}$/.test(pathname);

  if (isLocaleHome) {
    return null;
  }

  return (
    <>
      <aside
        className="fixed right-4 top-24 z-10 hidden w-[300px] 2xl:block"
        aria-label="Recommended content"
      >
        <div id="taboola-right-rail-thumbnails" />
        <Script
          id="taboola-right-rail-thumbnails-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
window._taboola = window._taboola || [];
_taboola.push({
  mode: 'thumbnails-rr',
  container: 'taboola-right-rail-thumbnails',
  placement: 'Right Rail Thumbnails',
  target_type: 'mix'
});
            `,
          }}
        />
      </aside>

      <div className="mx-auto w-full max-w-4xl px-4 py-8">
        <div id="taboola-below-article-thumbnails" />
        <Script
          id="taboola-below-article-thumbnails-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
window._taboola = window._taboola || [];
_taboola.push({
  mode: 'alternating-thumbnails-a',
  container: 'taboola-below-article-thumbnails',
  placement: 'Below Article Thumbnails',
  target_type: 'mix'
});
            `,
          }}
        />
      </div>
    </>
  );
}
