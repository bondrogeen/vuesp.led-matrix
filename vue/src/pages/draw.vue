<script setup lang="ts">
import { computed } from 'vue';

import { KEY } from '@/utils/const';
import { useConnection } from '@/composables/useConnection';
import { useLocale } from '@/composables/useLocale';
import PageHeader from '@/components/ui/PageHeader.vue';

import MainPaint from '@/components/pages/main/MainPaint.vue';

const { $t } = useLocale();

const { main, onSend } = useConnection((send) => {
  send(KEY.DRAW);
});

const draw = computed(() => main.value.draw);

const onSendDraw = (data: Record<string, unknown>) => {
  onSend(KEY.DRAW, data);
};
</script>

<template>
  <div>
    <PageHeader :title="$t('menu.draw')" class="mb-6" />

    <MainPaint :draw="draw" @send="onSendDraw" />
  </div>
</template>
