"use client";

import { useEffect } from "react";

interface AdSenseProps {
  adSlot?: string;
  adFormat?: "auto" | "rectangle" | "vertical" | "horizontal";
  fullWidthResponsive?: boolean;
  style?: React.CSSProperties;
}

export function AdSense({
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = true,
  style,
}: AdSenseProps) {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{
        display: "block",
        ...style,
      }}
      data-ad-client="ca-pub-9196149361612087"
      {...(adSlot && { "data-ad-slot": adSlot })}
      data-ad-format={adFormat}
      data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
    />
  );
}

