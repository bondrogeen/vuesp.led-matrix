import type { IMessageDevice, IMessageSettings, TypeConstMessage, TypeKEYS } from './protocol';

export interface IDraw {
  key?: number;
  command: number;
  effect: number;
  brightness: number;
  buffer: number[];
}

export interface ISensors {
  key?: number;
  command: number;
  status: number;
  bmpTemperature: number;
  bmpPressure: number;
  bmpAltitude: number;
  ahtTemperature: number;
  ahtHumidity: number;
}

export type TMyTypeKEYS = (TypeKEYS & {}) | 'DEVICE' | 'DRAW' | 'SENSORS';

interface IKeyMessageDevice {
  key: Extract<TMyTypeKEYS, 'DEVICE'>;
  object?: IMessageDevice | Partial<IMessageDevice>;
}

interface IKeyMessageDraw {
  key: Extract<TMyTypeKEYS, 'DRAW'>;
  object?: IDraw | Partial<IDraw>;
}

interface IKeyMessageSensors {
  key: Extract<TMyTypeKEYS, 'SENSORS'>;
  object?: ISensors | Partial<ISensors>;
}

export type TTypeMessage = (TypeConstMessage & {}) | IKeyMessageDevice | IKeyMessageDraw | IKeyMessageSensors;

export interface IMyMessageSettings extends IMessageSettings {
  EthIp?: [];
  EthSubnet?: [];
  EthGateway?: [];
  EthDns?: [];
}
