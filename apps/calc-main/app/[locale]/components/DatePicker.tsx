"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { ko, enUS } from "date-fns/locale";
import { cn } from "@cal/ui";
import { Button } from "@cal/ui";
import { CalendarIcon, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@cal/ui";

interface DatePickerProps {
  date?: Date;
  onSelect: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  maxDate?: Date;
  minDate?: Date;
  locale?: "ko" | "en";
  className?: string;
}

export function DatePicker({
  date,
  onSelect,
  placeholder = "날짜 선택",
  disabled = false,
  maxDate,
  minDate,
  locale = "ko",
  className,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const localeObj = locale === "ko" ? ko : enUS;

  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      onSelect(selectedDate);
      setOpen(false);
    }
  };

  const clearDate = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(undefined);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-start text-left font-normal h-12 text-base",
            "border-2 hover:border-primary/50 transition-all duration-200",
            "shadow-sm hover:shadow-md",
            !date && "text-muted-foreground",
            date && "border-primary/20 bg-primary/5",
            className
          )}
        >
          <CalendarIcon className="mr-3 h-5 w-5 text-muted-foreground flex-shrink-0" />
          {date ? (
            <span className="flex-1 font-medium text-gray-900">
              {format(date, locale === "ko" ? "yyyy년 M월 d일" : "PPP", {
                locale: localeObj,
              })}
            </span>
          ) : (
            <span className="flex-1 text-gray-500">{placeholder}</span>
          )}
          {date && !disabled && (
            <button
              type="button"
              className="ml-auto mr-2 h-6 w-6 rounded-md opacity-60 hover:opacity-100 hover:bg-gray-100 transition-all duration-200 flex items-center justify-center"
              onClick={clearDate}
              aria-label="Clear date"
              onMouseDown={(e) => e.preventDefault()}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-6 shadow-2xl border-2 rounded-2xl bg-white"
        align="start"
        sideOffset={8}
      >
        <DayPicker
          mode="single"
          selected={date}
          onSelect={handleSelect}
          locale={localeObj}
          disabled={disabled}
          {...(maxDate && { toDate: maxDate })}
          {...(minDate && { fromDate: minDate })}
          initialFocus
          showOutsideDays={true}
          fixedWeeks
          classNames={{
            months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
            month: "space-y-4",
            caption: "grid grid-cols-[1fr_auto_1fr] items-center justify-center mb-6 px-1 gap-4",
            caption_label: "text-lg font-bold text-gray-900 text-center col-start-2 col-end-2",
            nav: "contents",
            button_reset: "hidden",
            nav_button: cn(
              "h-9 w-9 rounded-lg",
              "inline-flex items-center justify-center",
              "border-2 border-gray-200 bg-white shadow-sm",
              "hover:bg-gray-50 hover:border-primary hover:text-primary",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              "disabled:pointer-events-none disabled:opacity-50",
              "transition-all duration-200 active:scale-95"
            ),
            nav_button_previous: "col-start-1 col-end-1 justify-self-start",
            nav_button_next: "col-start-3 col-end-3 justify-self-end",
            table: "w-full border-collapse",
            head_row: "flex mb-4 gap-2",
            head_cell:
              "text-gray-500 rounded-lg w-12 font-bold text-xs uppercase tracking-wider flex items-center justify-center py-2",
            row: "flex w-full mt-2 gap-2",
            cell: "h-12 w-12 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
            day: cn(
              "h-12 w-12 p-0 font-semibold rounded-lg transition-all duration-200",
              "hover:bg-gray-100 hover:text-gray-900 hover:scale-110",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              "aria-selected:opacity-100 cursor-pointer active:scale-95"
            ),
            day_selected:
              "bg-primary text-white hover:bg-primary/90 hover:text-white focus:bg-primary focus:text-white font-bold shadow-lg scale-110",
            day_today:
              "bg-blue-50 text-primary font-bold border-2 border-primary/40",
            day_outside:
              "day-outside text-gray-400 opacity-40 aria-selected:bg-gray-100/50 aria-selected:text-gray-400 aria-selected:opacity-30",
            day_disabled:
              "text-gray-300 opacity-30 cursor-not-allowed hover:bg-transparent hover:text-gray-300 hover:scale-100",
            day_range_middle:
              "aria-selected:bg-gray-100 aria-selected:text-gray-900",
            day_hidden: "invisible",
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
