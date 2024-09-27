/**
 * Only accept numeric values on input
 */
export const onInputNumeric = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const originalValue = target.value;
    const sanitizedValue = originalValue.replace(/[^0-9]/g, '');
    if (sanitizedValue !== originalValue) {
      target.value = sanitizedValue;
    }
    target.value = sanitizedValue;
  };
  
/**
 * Ignores any characters other than numeric, delete, and left and right arrows
 */
export const onKeypressNumeric = (event: KeyboardEvent) => {
    const charCode: number = event.key || event.which ? event.which : event.keyCode; 
    // Allow control keys: backspace, delete, arrows
    if (
      charCode === 8 || // Backspace
      charCode === 46 || // Delete
      charCode === 37 || // Left arrow
      charCode === 39 || // Right arrow
      (charCode >= 16 && charCode <= 18) // Shift, Ctrl, Alt
    ) {
      return;
    }
    // Prevent non-numeric input
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  };
  
/** 
 * Only pastes numeric values from the clipboard into the input and ignores the rest.
 */
export const onPasteNumeric = (event: ClipboardEvent) => {
    const clipboardData = event.clipboardData || (window as any).clipboardData;
    const pastedData = clipboardData.getData('Text');
  
    const sanitizedData = pastedData.replace(/[^0-9]/g, '');
  
    event.preventDefault();
  
    if (sanitizedData) {
      const target = event.target as HTMLInputElement;
  
      const selectionStart = target.selectionStart || 0;
      const selectionEnd = target.selectionEnd || 0;
  
      const currentValue = target.value;
  
      const newValue =
        currentValue.substring(0, selectionStart) +
        sanitizedData +
        currentValue.substring(selectionEnd);
  
      target.value = newValue;
  
      const newCursorPosition = selectionStart + sanitizedData.length;
  
      target.setSelectionRange(newCursorPosition, newCursorPosition);
  
      target.dispatchEvent(new Event('input'));
    }
  };
  