export function isValidNumber(value: string | number): boolean {
  if (typeof value === "number") return !isNaN(value) && isFinite(value);
  if (typeof value !== "string") return false;
  const num = Number(value);
  return !isNaN(num) && isFinite(num);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateRange(
  value: number,
  min: number,
  max: number,
  fieldName: string
): ValidationResult {
  if (isNaN(value) || !isFinite(value)) {
    return { valid: false, error: `${fieldName}은(는) 숫자여야 합니다.` };
  }
  if (value < min) {
    return { valid: false, error: `${fieldName}은(는) ${min} 이상이어야 합니다.` };
  }
  if (value > max) {
    return { valid: false, error: `${fieldName}은(는) ${max} 이하여야 합니다.` };
  }
  return { valid: true };
}

export function validatePositive(value: number, fieldName: string): ValidationResult {
  return validateRange(value, 0.01, Infinity, fieldName);
}

export function validateBMI(height: number, weight: number): ValidationResult {
  const heightValidation = validateRange(height, 50, 300, "키");
  if (!heightValidation.valid) return heightValidation;

  const weightValidation = validateRange(weight, 10, 500, "몸무게");
  if (!weightValidation.valid) return weightValidation;

  return { valid: true };
}

export function validateDate(date: Date, fieldName: string = "날짜"): ValidationResult {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return { valid: false, error: `올바른 ${fieldName}을(를) 입력해주세요.` };
  }
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  if (date > today) {
    return { valid: false, error: `${fieldName}은(는) 오늘 이후일 수 없습니다.` };
  }
  const minDate = new Date("1900-01-01");
  if (date < minDate) {
    return { valid: false, error: `${fieldName}은(는) 1900년 이후여야 합니다.` };
  }
  return { valid: true };
}

export function validatePercentage(value: number): ValidationResult {
  return validateRange(value, 0, 1000, "퍼센트");
}

export function validateInterestRate(value: number): ValidationResult {
  return validateRange(value, 0, 100, "이자율");
}

export function validateLoanAmount(value: number): ValidationResult {
  return validateRange(value, 1000, 100000000000, "대출 금액");
}

export function validatePeriod(value: number, maxYears: number = 100): ValidationResult {
  return validateRange(value, 0.1, maxYears, "기간");
}

