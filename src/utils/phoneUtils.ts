/**
 * Phone number utility functions
 * Format: (XXX) XXX-XXXX for US phone numbers
 */

/**
 * Extract only digits from a string
 * @param value - Any string containing phone number
 * @returns Only digits (e.g., "5551234567")
 */
export const getPhoneRawDigits = (value: string): string => {
  return value.replace(/\D/g, "");
};

/**
 * Format raw digits to display format
 * @param value - Raw digits or formatted string
 * @returns Formatted phone: "(555) 123-4567"
 */
export const formatPhoneDisplay = (value: string): string => {
  const digits = getPhoneRawDigits(value);

  if (digits.length === 0) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
};

/**
 * Format phone as user types (for input masking)
 * @param value - Current input value
 * @returns Formatted phone string (max 10 digits)
 */
export const formatPhoneAsYouType = (value: string): string => {
  const digits = getPhoneRawDigits(value);
  const limitedDigits = digits.slice(0, 10);
  return formatPhoneDisplay(limitedDigits);
};

/**
 * Validate phone number (must be exactly 10 digits)
 * @param value - Phone value (can be formatted or raw)
 * @returns true if valid 10-digit phone
 */
export const isValidPhone = (value: string): boolean => {
  const digits = getPhoneRawDigits(value);
  return digits.length === 10;
};
