"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@cal/ui";
import { cn } from "@cal/ui";

export function BookmarkButton() {
  const t = useTranslations("bookmark");
  const pathname = usePathname();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // 페이지 로드 시 북마크 상태 확인
    const bookmarks = getBookmarks();
    const currentUrl = pathname;
    setIsBookmarked(bookmarks.includes(currentUrl));
  }, [pathname]);

  const getBookmarks = (): string[] => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("calculator_bookmarks");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const toggleBookmark = () => {
    const currentUrl = pathname;
    const bookmarks = getBookmarks();
    
    if (isBookmarked) {
      // 북마크 제거
      const updated = bookmarks.filter((url) => url !== currentUrl);
      localStorage.setItem("calculator_bookmarks", JSON.stringify(updated));
      setIsBookmarked(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } else {
      // 북마크 추가
      const updated = [...bookmarks, currentUrl];
      localStorage.setItem("calculator_bookmarks", JSON.stringify(updated));
      setIsBookmarked(true);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  return (
    <>
      <button
        onClick={toggleBookmark}
        className={cn(
          "fixed bottom-6 right-6 z-50",
          "w-14 h-14 rounded-full shadow-lg",
          "flex items-center justify-center",
          "transition-all duration-300 hover:scale-110 active:scale-95",
          "bg-white border-2",
          isBookmarked
            ? "border-yellow-400 text-yellow-500 hover:bg-yellow-50"
            : "border-gray-300 text-gray-600 hover:bg-gray-50"
        )}
        aria-label={isBookmarked ? t("remove") : t("add")}
        title={isBookmarked ? t("remove") : t("add")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={cn("w-6 h-6", isBookmarked ? "fill-current" : "stroke-current")}
          fill={isBookmarked ? "currentColor" : "none"}
          strokeWidth={isBookmarked ? 0 : 2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
          />
        </svg>
      </button>

      {showToast && (
        <div
          className={cn(
            "fixed bottom-24 right-6 z-50",
            "px-4 py-3 rounded-lg shadow-lg",
            "bg-gray-900 text-white",
            "animate-in slide-in-from-bottom-2 duration-300"
          )}
        >
          <p className="text-sm font-medium">
            {isBookmarked ? t("added") : t("removed")}
          </p>
        </div>
      )}
    </>
  );
}

