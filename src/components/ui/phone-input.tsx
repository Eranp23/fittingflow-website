"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { formatPhoneAsYouType, getPhoneRawDigits } from "@/utils/phoneUtils";

interface PhoneInputProps {
  id?: string;
  value: string;
  onChange: (rawDigits: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

/**
 * Phone Input with auto-masking
 * - Displays: (555) 123-4567
 * - Returns via onChange: 5551234567 (raw digits only)
 */
export function PhoneInput({
  id,
  value,
  onChange,
  placeholder = "(555) 123-4567",
  className,
  disabled = false,
}: PhoneInputProps) {
  // Format the value for display
  const displayValue = React.useMemo(() => {
    return formatPhoneAsYouType(value || "");
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const rawDigits = getPhoneRawDigits(inputValue);

    // Limit to 10 digits
    const limitedDigits = rawDigits.slice(0, 10);

    // Return raw digits to parent
    onChange(limitedDigits);
  };

  return (
    <Input
      id={id}
      type="tel"
      inputMode="numeric"
      placeholder={placeholder}
      value={displayValue}
      onChange={handleChange}
      disabled={disabled}
      className={cn("", className)}
    />
  );
}
