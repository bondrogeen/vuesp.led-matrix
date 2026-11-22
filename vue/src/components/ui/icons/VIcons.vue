<script setup lang="ts">
import { VIcon } from 'vuesp-components/components';
const { name } = defineProps<{ name: string }>();
</script>

<template>
  <VIcon :name="name" class="size-full" />
</template>
