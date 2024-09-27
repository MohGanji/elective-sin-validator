<script setup lang="ts">
import IconHelp from '@/components/icons/IconHelp.vue';
import { ref, reactive } from 'vue';

const isHelpVisible = ref(false);

const toggleHelp = () => {
  isHelpVisible.value = !isHelpVisible.value;
};


const form = reactive({
  sin: '',
});

const errors = reactive({
  sin: '',
});

const isValidLuhn = (numberString: string) => {
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

  // If the total sum is a multiple of 10, the number is valid
  return sum % 10 === 0;
}


const validateField = (field: string) => {  
  
  if(field === 'sin') {
    let sin = form.sin.toString()
    
    if (sin.length && sin.length !== 9) {
      errors.sin = "SIN must be 9 digits"
      
    } else if (sin.length === 9 && !isValidLuhn(sin)) {
      errors.sin = "SIN is not valid (Luhn validation failed)"      
    }
     else {
      errors.sin = ''; // if SIN is correct, immediately remove error.
    }
  }
}

const isValidField = (field: string) => {
  if(field === 'sin') {
    return form.sin && !errors.sin.length
  }
}

</script>

<template>
  <div id="form-wrapper" class="w-full max-w-sm">
    
    <div id="sin-form" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-md font-bold mb-2" for="sin">
          Enter SIN here
        </label>
        <div class="flex flex-row" v-bind:class = "(errors.sin || isValidField('sin'))?'mb-2':''">
          <input 
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="sin" 
            type="number"
            inputmode="numeric"
            placeholder="000 000 000"
            v-model="form.sin"
            @input="validateField('sin')"
            v-bind:class = "(errors.sin)?'border-red-500':''"
          >
          <a 
            @click="toggleHelp"
            class="inline-block align-baseline font-bold text-sm hover:opacity-40" 
            href="#"
          >
            <IconHelp />
          
          </a>
        </div>
        
        <p class="text-red-500 text-sm italic" v-if="errors.sin">
          {{ errors.sin }}
        </p>
        <p class="text-green-500 text-sm italic" v-if="isValidField('sin')"> 
          SIN is valid
        </p>

        <div v-if="isHelpVisible" class="text-sm mt-4">
          SIN must be a 9 digit number and also a valid Luhn number. 
          Learn more about Luhn numbers <a class="text-blue-300" href="https://en.wikipedia.org/wiki/Luhn_algorithm" target="_blank">here</a>.
        </div>
      </div>
      
    </div>
    
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/base.scss';
/* Hide the spin buttons in WebKit browsers */
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button,
input[type='number'] {
  appearance: none !important;
  -webkit-appearance: none;
  margin: 0;
  -moz-appearance: textfield !important;
}


</style>
