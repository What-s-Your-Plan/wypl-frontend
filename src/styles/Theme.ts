const color = {
  /** Primary */
  brown: '#876445',
  brown900: '#654131',
  brown800: '#7A513D',
  brown700: '#8D624D',
  /** Default */
  brown600: '#A0735E',
  brown500: '#B3846F',
  brown400: '#C69581',
  brown300: '#D8A692',
  brown200: '#E9B8A4',
  brown100: '#FBCAC5',

  /** Secondary */
  green: '#50C878',
  green900: '#3DA660',
  green800: '#47B06C',
  green700: '#52BA78',
  green600: '#5DC484',
  green500: '#67CE90',
  green400: '#71D89C',
  green300: '#7BE2A8',
  green200: '#85EAB4',
  green100: '#8FF2C0',

  white: '#FAFAF9',
  white900: '#F2F2F0',
  white800: '#E6E6E3',
  white700: '#D9D9D6',
  white600: '#CCCCCA',
  white500: '#BFBFBD',
  white400: '#B3B3B1',
  white300: '#A6A6A4',
  white200: '#999998',
  white100: '#8C8C8B',

  /** Heading Text */
  black: '#000000',
  /** Default Text */
  black900: '#2A2E34',
  black800: '#44474D',
  black700: '#5E6166',
  black600: '#787A80',
  black500: '#929498',
  black400: '#ACAEB1',
  black300: '#C6C7CA',
  black200: '#E0E1E2',
  black100: '#F5F5F6',

  red: '#8B0000',
  red900: '#9C1A1A',
  red800: '#AD3333',
  red700: '#BE4D4D',
  red600: '#CF6666',
  red500: '#DF8080',
  red400: '#EFA9A9',
  red300: '#FFBFBF',
  red200: '#FFCCCC',
  red100: '#FFD9D9',
} as const;

const circleLabelColor = [
  'brown',
  'red',
  'pink',
  'orange',
  'yellow',
  'green',
  'leaf',
  'blue',
  'sky',
  'navy',
  'indigo',
  'purple',
  'lavender',
  'charcoal',
] as const;

const labelColor = {
  /** default */
  brown: '#876445',
  red: '#F2594F',
  pink: '#FFA9A3',
  orange: '#FF9548',
  yellow: '#FFD662',
  green: '#62C434',
  leaf: '#98DF7B',
  blue: '#4970FA',
  sky: '#9DC8FA',
  navy: '#1D3B88',
  indigo: '#7F99D9',
  purple: '#8627C1',
  lavender: '#C483EC',
  charcoal: '#5E5E5E',
} as const;

const borderRadius = {
  small: '4px',
  /** default */
  medium: '8px',
  large: '16px',
} as const;

export type ColorType = keyof typeof color;
export type LabelColorType = keyof typeof labelColor;

export const Theme = {
  color,
  labelColor,
  borderRadius,
  circleLabelColor,
};
