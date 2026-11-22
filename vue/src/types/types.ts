import type { INotification, IDashboardItem, IMenuItem, IDialog, IPackage, ISuggestion } from 'vuesp-components/types';
import type { IMessageInfo, IMessageProgress, IMessagePort, IMessageMessage, IMessageDallas, IMessageDiscovery, IMessageDevice } from './protocol';

import type { TTypeMessage, IMyMessageSettings, IDraw, ISensors } from './custom';

export type * from './custom';

type TypeMessageMap = { [K in TTypeMessage['key']]: Extract<TTypeMessage, { key: K }>['object'] };

export type TTypeSend = <K extends keyof TypeMessageMap>(key: K, object?: TypeMessageMap[K]) => void;

// ======== IWebSocketStore ===========

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

// ======== IWebSocket ===========

export interface IWebSocket {
  socket: WebSocket | null;
  pingClient: number;
  pingDevice: number;
  isInit: boolean;
  infoLoaded: boolean;
}

// ======== IWebSocketStore ===========

export interface IWebSocketStore {
  settings: IMyMessageSettings;
  main: IStateMain;
  progress: IMessageProgress;
  message: IMessageMessage;
}

export interface IStateMain {
  dallas: Record<string, IMessageDallas>;
  discovery: Record<string, IMessageDiscovery>;
  info: IMessageInfo;
  ports: Record<string, IMessagePort>;
  device: IMessageDevice;
  slots: Record<number, IMessageMessage>;
  draw: IDraw;
  sensors: ISensors;
}
