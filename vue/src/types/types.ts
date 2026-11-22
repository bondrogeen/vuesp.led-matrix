import type { IDashboardItem, IDialog, IMenuItem, INotification, IPackage, ISuggestion } from 'vuesp-components/types';
import type { IDallas, IDevice, IDiscovery, IDraw, IEvent, IInfo, IBuffer, IMessage, IPort, IProgress, ISensors, ISettings, TKey } from '@/generated/protocol';

export type { TMessage } from '@/generated/protocol';

export type TSend = (key: TKey | number, object?: object) => void;


export interface IAppStore {
  menu: IMenuItem[];
  dashboard: IDashboardItem[];
  suggestions: ISuggestion[];
  theme: string;
  dialog: IDialog;
  dialogInfo: boolean;
  pkg: IPackage;
  notifications: INotification[];
}


export interface IWebSocket {
  socket: WebSocket | null;
  pingClient: number;
  pingDevice: number;
  isInit: boolean;
  infoLoaded: boolean;
}


export interface IWebSocketStore {
  settings: ISettings;
  main: IStateMain;
  progress: IProgress;
  message: IMessage;
}

export interface IStateMain {
  dallas: Record<string, IDallas>;
  discovery: Record<string, IDiscovery>;
  info: IInfo;
  ports: Record<string, IPort>;
  device: IDevice;
  draw: IDraw;
  sensors: ISensors;
  buffer: IBuffer;
  event: IEvent;
  slots: Record<number, IMessage>;
}
