export interface Color {
  symbol: string;
  altSymbol?: string;
  value: string;
}

export type Palette = Array<Color>;

export const paletteCommon: Palette = [
  { symbol: 'black', value: '#000000' },
  { symbol: 'white', value: '#FFFFFF' },
];

export const paletteBackground: Palette = [
  { symbol: 'bg-default', value: '#FAFAFA' },
  { symbol: 'bg-paper', value: '#FFFFFF' },
];

export const paletteGrey: Palette = [
  { symbol: 'grey-50', value: '#FAFAFA' },
  { symbol: 'grey-100', value: '#F5F5F5' },
  { symbol: 'grey-200', value: '#EEEEEE' },
  { symbol: 'grey-300', value: '#E0E0E0' },
  { symbol: 'grey-400', value: '#BDBDBD' },
  { symbol: 'grey-500', value: '#9E9E9E' },
  { symbol: 'grey-600', value: '#757575' },
  { symbol: 'grey-700', value: '#616161' },
  { symbol: 'grey-800', value: '#424242' },
  { symbol: 'grey-900', value: '#212121' },
];

export const palettePrimary: Palette = [
  { symbol: 'primary-50', value: '#DCEEFB' },
  { symbol: 'primary-100', value: '#B6E0FE' },
  { symbol: 'primary-200', value: '#84C5F4' },
  { symbol: 'primary-300', value: '#62B0E8' },
  { symbol: 'primary-400', value: '#4098D7' },
  { symbol: 'primary-500', altSymbol: 'primary-light', value: '#2680C2' },
  { symbol: 'primary-600', value: '#186FAF' },
  { symbol: 'primary-700', value: '#0F609B' },
  { symbol: 'primary-800', altSymbol: 'primary-main', value: '#0A558C' },
  { symbol: 'primary-900', altSymbol: 'primary-dark', value: '#003E6B' },
];

export const paletteSecondary: Palette = [
  { symbol: 'secondary-50', value: '#FFFBEA' },
  { symbol: 'secondary-100', value: '#FFF3C4' },
  { symbol: 'secondary-200', altSymbol: 'sec...-light', value: '#FCE588' },
  { symbol: 'secondary-300', value: '#FADB5F' },
  { symbol: 'secondary-400', altSymbol: 'sec...-main', value: '#F7C948' },
  { symbol: 'secondary-500', value: '#F0B429' },
  { symbol: 'secondary-600', value: '#DE911D' },
  { symbol: 'secondary-700', value: '#CB6E17' },
  { symbol: 'secondary-800', altSymbol: 'sec...-dark', value: '#B44D12' },
  { symbol: 'secondary-900', value: '#8D2B0B' },
];

export const paletteNeutral: Palette = [
  { symbol: 'neutral-50', altSymbol: 'neutral-light', value: '#F0F4F8' },
  { symbol: 'neutral-100', value: '#D9E2EC' },
  { symbol: 'neutral-200', value: '#BCCCDC' },
  { symbol: 'neutral-300', value: '#9FB3C8' },
  { symbol: 'neutral-400', value: '#829AB1' },
  { symbol: 'neutral-500', value: '#627D98' },
  { symbol: 'neutral-600', altSymbol: 'neutral-main', value: '#486581' },
  { symbol: 'neutral-700', value: '#334E68' },
  { symbol: 'neutral-800', value: '#243B53' },
  { symbol: 'neutral-900', altSymbol: 'neutral-dark', value: '#102A43' },
];

export const paletteBgDefault: Palette = [
  { symbol: 'text-default', altSymbol: 'neutral-900', value: '#102A43' },
  { symbol: 'text-muted', altSymbol: 'neutral-600', value: '#486581' },
];

export const paletteBgPrimary: Palette = [
  { symbol: 'text-primary-default', value: '#FFFFFF' },
  { symbol: 'text-primary-muted', altSymbol: 'n-200', value: '#BCCCDC' },
];

export const paletteBgSecondary: Palette = [
  { symbol: 'text-secondary-default', altSymbol: 'n-900', value: '#102A43' },
];
