import { onMounted, onUnmounted } from 'vue';
import { event } from '@/assets/js/';
import Queue from '@/assets/js/queue';

import { useStore } from '@/composables/useStore';

import type { TTypeMessage, TTypeSend } from '@/types';

export const useConnection = (init?: (send: TTypeSend) => void, messages?: (message: TTypeMessage) => void) => {
  const store = useStore();

  const queue = new Queue<{ key: TTypeMessage['key']; object?: TTypeMessage['object'] }>(100, ({ key, object }) => {
    store.wsSend(key, object);
  });

  const onSend = (key: TTypeMessage['key'], object?: TTypeMessage['object']) => {
    queue.add({ key, object });
  };

  const onInit = () => {
    if (!store.isInit.value && init) init(onSend);
  };

  const onMessages = (message: TTypeMessage) => {
    messages?.(message);
  };

  event.on('init', onInit);
  if (messages) event.on('messages', onMessages);

  onMounted(() => {
    if (store.isInit.value && init) init(onSend);
  });

  onUnmounted(() => {
    event.off('init', onInit);
    if (messages) event.off('messages', onMessages);
  });

  return { ...store, onSend };
};
