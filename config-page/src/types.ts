export interface ColorSetting {
  baseId: string;
  label: string;
  default: string;
}

export interface PebbleColor {
  name: string;
  identifier: string;
}

export interface Theme {
  [key: string]: string;
}

export type FormDataEntryValue = string | File;

export interface Settings {
  [key: string]: string | number;
}
