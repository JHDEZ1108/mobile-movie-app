// Define the structure for colors within each theme
declare module 'ThemeTypes' {
  export interface ThemeColors {
    primary: string;
    primaryVariant: string;
    secondary: string;
    secondaryVariant: string;
    background: string;
    surface: string;
    error: string;
    onPrimary: string;  // Text color on primary background
    onBackground: string; // Primary text color on the main background
    onError: string; // Text color on error backgrounds
    disabled: string; // Color for text and icons that are not interactive
  }

  export interface Theme {
    light: ThemeColors;
    dark: ThemeColors;
  }
}
