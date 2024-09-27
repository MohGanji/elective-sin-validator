export default function isValidLuhn (numberString: string) {
    if (!/^\d{9}$/.test(numberString)) {
      return false; // The input must be a 9-digit string consisting only of digits
    }
  
    let sum: number = 0;
    const digits: number[] = numberString.split('').map(Number);
  
    // Starting from the right, double every second digit
    for (let i: number = 0; i < digits.length; i++) {
      let digit: number = digits[digits.length - 1 - i]!;
  
      if (i % 2 === 1) {
        digit *= 2;
        // If doubling the digit results in a number greater than 9, calculate sum of digits.
        // Since it will never be over 18, for any n >= 10 and < 19 we can calculate n-10(this gives second digit) + 1 (first digit)
        if (digit > 9) {
          digit = digit - 10 + 1;
        }
      }
  
      sum += digit;
    }
  
    return sum % 10 === 0;
  }