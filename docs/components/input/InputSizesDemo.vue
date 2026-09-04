<template>
  <div class="lumen-demo-column">
    <LInput v-model="large" size="large" placeholder="Large input" />
    <LInput placeholder="Default input" />
    <LInput v-model="small" size="small" placeholder="Small input" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const large = ref('')
const small = ref('')
</script>
