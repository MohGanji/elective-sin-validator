<script setup lang="ts">
import IconHelp from '@/components/icons/IconHelp.vue';
import isValidLuhn from '@/utils/isVaildLuhn';
import {onInputNumeric, onKeypressNumeric, onPasteNumeric} from '@/utils/numericInput'
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
            type="text"
            
            @input="(e: Event) => {onInputNumeric(e); validateField('sin')}"
            @keypress="onKeypressNumeric"
            @paste="onPasteNumeric"

            placeholder="000 000 000"
            v-model="form.sin"
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
