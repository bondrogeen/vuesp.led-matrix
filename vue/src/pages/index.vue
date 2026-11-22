<script setup lang="ts">
import { computed } from 'vue';

import { VIcon, VCard } from 'vuesp-components/components';
import { secToTime } from 'vuesp-components/helpers';

import { useConnection } from '@/composables/useConnection';
import { useLocale } from '@/composables/useLocale';
import { KEYS } from '@/utils/const';

const { $t } = useLocale();

const { pkg, main, isInit } = useConnection((send) => {
  send(KEYS.INFO);
  send(KEYS.DEVICE);
});

const info = computed(() => main.value.info);
const device = computed(() => main.value.device);

const firmware = computed(() => (info.value.firmware ?? []).join('.') || '—');
const uptime = computed(() => secToTime(info.value.uptime ?? 0).trim());

function formatBytes(value: number): string {
  if (!value) return '0 B';
  if (value < 1024) return `${value} B`;
  if (value < 1024 * 1024) return `${(value / 1024).toFixed(1)} KB`;
  return `${(value / (1024 * 1024)).toFixed(1)} MB`;
}

const memoryUsed = computed(() => formatBytes(info.value.usedBytes ?? 0));
const memoryTotal = computed(() => formatBytes(info.value.totalBytes ?? 0));
const memoryPercent = computed(() => {
  const total = info.value.totalBytes || 0;
  return total ? Math.min(100, Math.round(((info.value.usedBytes || 0) / total) * 100)) : 0;
});
const portsCount = computed(() => Object.keys(main.value.ports ?? {}).length);
const sensorsCount = computed(() => Object.keys(main.value.dallas ?? {}).length);
const deviceTime = computed(() => (device.value.now ? new Date(device.value.now * 1000).toLocaleString() : '—'));

const quickLinks = computed(() => [
  { to: '/dashboard/', icon: 'dashboard', title: $t('menu.dashboard'), text: $t('homePage.dashboardText') },
  { to: '/device/gpio/', icon: 'gpio', title: $t('menu.gpio'), text: $t('homePage.gpioText') },
  { to: '/script/', icon: 'script', title: $t('menu.script'), text: $t('homePage.scriptsText') },
  { to: '/device/settings/', icon: 'settings', title: $t('menu.settings'), text: $t('homePage.settingsText') },
  { to: '/device/storage/', icon: 'storage', title: $t('menu.fs'), text: $t('homePage.storageText') },
]);

const resources = computed(() => [
  { href: 'https://docs.vuesp.ru/', icon: 'book', title: $t('homePage.docs'), text: $t('homePage.docsText') },
  { href: 'https://docs.vuesp.ru/vuesp-components-examples', icon: 'grid', title: $t('homePage.components'), text: $t('homePage.componentsText') },
  { href: 'https://docs.vuesp.ru/web-ui', icon: 'code', title: $t('homePage.webUi'), text: $t('homePage.webUiText') },
  { href: 'https://github.com/bondrogeen/vuesp-components', icon: 'github', title: 'vuesp-components', text: $t('homePage.componentsSource') },
]);
</script>

<template>
  <div class="container mx-auto space-y-6 pb-10">
    <section class="flex flex-wrap items-start justify-between gap-4">
      <div class="max-w-2xl">
        <p class="text-sm font-medium text-cyan-main">{{ $t('home') }}</p>
        <h1 class="mt-1">{{ info.name || pkg.name }}</h1>
        <p class="mt-2 text-sm leading-relaxed text-gray-dark-25 dark:text-gray-main">{{ pkg.description }}</p>
        <div class="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-gray-dark-25 dark:text-gray-main">
          <span class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1" :class="isInit ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'">
            <span class="size-1.5 rounded-full" :class="isInit ? 'bg-emerald-500' : 'bg-amber-500'" />
            {{ isInit ? $t('homePage.online') : $t('homePage.offline') }}
          </span>
          <span class="rounded-full bg-white/5 px-2.5 py-1">{{ $t('menu.dashboard') }} · {{ firmware }}</span>
        </div>
      </div>
    </section>

    <section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <VCard :title="$t('homePage.firmware')" hover>
        <p class="text-2xl font-bold">{{ firmware }}</p>
        <p class="mt-1 text-xs text-gray-dark-25 dark:text-gray-main">web · {{ pkg.version }}</p>
      </VCard>

      <VCard :title="$t('homePage.uptime')" hover>
        <p class="text-2xl font-bold">{{ uptime }}</p>
        <p class="mt-1 text-xs text-gray-dark-25 dark:text-gray-main">{{ $t('homePage.deviceTime') }}: {{ deviceTime }}</p>
      </VCard>

      <VCard :title="$t('homePage.memory')" hover>
        <div class="flex items-baseline justify-between gap-2">
          <p class="text-2xl font-bold">{{ memoryPercent }}%</p>
          <p class="text-xs text-gray-dark-25 dark:text-gray-main">{{ memoryUsed }} / {{ memoryTotal }}</p>
        </div>
        <div class="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div class="h-full rounded-full bg-cyan-main transition-all" :style="{ width: `${memoryPercent}%` }" />
        </div>
      </VCard>

      <VCard :title="$t('homePage.id')" hover>
        <p class="font-mono text-2xl font-bold">{{ (info.id || 0).toString(16).toUpperCase() }}</p>
        <p class="mt-1 text-xs text-gray-dark-25 dark:text-gray-main">{{ portsCount }} {{ $t('homePage.ports') }} · {{ sensorsCount }} {{ $t('homePage.sensors') }}</p>
      </VCard>
    </section>

    <section>
      <div class="mb-3 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 class="text-xl font-bold">{{ $t('homePage.quick') }}</h2>
          <p class="mt-1 text-sm text-gray-dark-25 dark:text-gray-main">{{ $t('homePage.quickText') }}</p>
        </div>
      </div>

      <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <VCard as="router-link"
          v-for="link of quickLinks"
          :key="link.to"
          :to="link.to"
         variant="glass" padding="lg" hover class="group flex items-center gap-3 transition-colors">
          <span class="grid size-10 shrink-0 place-items-center rounded-md bg-cyan-main/10 text-cyan-main">
            <VIcon name="dashboard" v-if="link.icon === 'dashboard'" class="size-5" />
            <VIcon name="gpio" v-else-if="link.icon === 'gpio'" class="size-5" />
            <VIcon name="script" v-else-if="link.icon === 'script'" class="size-5" />
            <VIcon name="settings" v-else-if="link.icon === 'settings'" class="size-5" />
            <VIcon name="storage" v-else-if="link.icon === 'storage'" class="size-5" />
          </span>
          <span class="min-w-0 flex-1">
            <span class="block text-sm font-semibold">{{ link.title }}</span>
            <span class="mt-0.5 block text-xs text-gray-dark-25 dark:text-gray-main">{{ link.text }}</span>
          </span>
          <VIcon name="arrow-right" class="size-4 shrink-0 text-gray-main transition group-hover:text-cyan-main" />
        </VCard>
      </div>
    </section>

    <div class="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
      <VCard :title="$t('homePage.device')" hover>
        <dl class="grid gap-3 text-sm sm:grid-cols-2">
          <div class="rounded-md bg-white/5 p-3">
            <dt class="text-xs text-gray-dark-25 dark:text-gray-main">{{ $t('homePage.analog') }}</dt>
            <dd class="mt-1 font-mono">{{ device.analog ?? '—' }}</dd>
          </div>
          <div class="rounded-md bg-white/5 p-3">
            <dt class="text-xs text-gray-dark-25 dark:text-gray-main">{{ $t('homePage.message') }}</dt>
            <dd class="mt-1 truncate">{{ device.message || '—' }}</dd>
          </div>
          <div class="rounded-md bg-white/5 p-3">
            <dt class="text-xs text-gray-dark-25 dark:text-gray-main">{{ $t('homePage.ports') }}</dt>
            <dd class="mt-1 font-mono">{{ portsCount }}</dd>
          </div>
          <div class="rounded-md bg-white/5 p-3">
            <dt class="text-xs text-gray-dark-25 dark:text-gray-main">{{ $t('homePage.sensors') }}</dt>
            <dd class="mt-1 font-mono">{{ sensorsCount }}</dd>
          </div>
        </dl>
      </VCard>

      <VCard :title="$t('homePage.docs')" hover>
        <p class="text-sm leading-relaxed text-gray-dark-25 dark:text-gray-main">{{ $t('homePage.docsIntro') }}</p>
        <div class="mt-3 space-y-2">
          <a
            v-for="resource of resources"
            :key="resource.href"
            :href="resource.href"
            target="_blank"
            rel="noreferrer"
            class="flex items-center gap-3 rounded-md bg-white/5 p-3 transition-colors hover:bg-white/10"
          >
            <VIcon name="book-open" v-if="resource.icon === 'book'" class="size-4 shrink-0 text-cyan-main" />
            <VIcon name="layout-grid" v-else-if="resource.icon === 'grid'" class="size-4 shrink-0 text-cyan-main" />
            <VIcon name="code" v-else-if="resource.icon === 'code'" class="size-4 shrink-0 text-cyan-main" />
            <VIcon name="github" v-else-if="resource.icon === 'github'" class="size-4 shrink-0 text-cyan-main" />
            <span class="min-w-0 flex-1">
              <span class="block text-xs font-medium">{{ resource.title }}</span>
              <span class="mt-0.5 block text-[10px] leading-snug text-gray-dark-25 dark:text-gray-main">{{ resource.text }}</span>
            </span>
            <VIcon name="external" class="size-3.5 shrink-0 text-gray-main" />
          </a>
        </div>
      </VCard>
    </div>

    <VCard :title="$t('homePage.start')" hover>
      <p class="max-w-2xl text-sm leading-relaxed text-gray-dark-25 dark:text-gray-main">{{ $t('homePage.startText') }}</p>
      <ol class="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <li class="rounded-md bg-white/5 p-3">
          <span class="text-xs font-bold text-cyan-main">1</span>
          <p class="mt-1 text-xs font-medium">{{ $t('homePage.stepWifi') }}</p>
        </li>
        <li class="rounded-md bg-white/5 p-3">
          <span class="text-xs font-bold text-cyan-main">2</span>
          <p class="mt-1 text-xs font-medium">{{ $t('homePage.stepGpio') }}</p>
        </li>
        <li class="rounded-md bg-white/5 p-3">
          <span class="text-xs font-bold text-cyan-main">3</span>
          <p class="mt-1 text-xs font-medium">{{ $t('homePage.stepDashboard') }}</p>
        </li>
        <li class="rounded-md bg-white/5 p-3">
          <span class="text-xs font-bold text-cyan-main">4</span>
          <p class="mt-1 text-xs font-medium">{{ $t('homePage.stepDocs') }}</p>
        </li>
      </ol>
    </VCard>
  </div>
</template>
