<template>
  <div class="!pb-3">
    <button 
      type="button" 
      class="cursor-pointer bg-button hover:bg-button-hover rounded-sm text-sm !p-[6px] font-medium" 
      @click="$emit('confirm')">
      {{ buttonText }}
    </button>
    <button 
      type="button" 
      class="!ml-2 !px-[8px] !py-[4px] text-gray-400 cursor-pointer rounded-sm font-medium hover:bg-greenish" 
      @click="$emit('cancel')">
      ✖
    </button>
  </div>
</template>
  
<script setup lang="ts">
interface Props {
  buttonText: string
}

defineProps<Props>()

defineEmits<{ (e: 'confirm'): void; (e: 'cancel'): void }>()
</script>