// import { ThemeOptions } from '@mui/styles/createMuiTheme';
import { ThemeOptions } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { green, orange, blue } from '@mui/material/colors';

export const magentaLight = '#7212dd';
export const magenta = '#640ec3';
export const magentaDarker = '#5b0faf';
const color =  magenta;

const themeMeandro: ThemeOptions = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: magenta,
      contrastText: magenta,
      white: '#FFFFFF',
    },
    secondary: {
      main: '#f50057',
    },
    info: {
      main: magenta,
    },
    background: {
      /*default: '#b5cdf7',*/
      /*paper: '#60f9a9',*/
    },
    text: {
      primary: magenta,
      secondary: '#5a1078',
      disabled: 'rgba(129,107,0,0.38)',
      hint: magenta,
    },
    divider: magenta,
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            color: '#FFFFFF',
            backgroundColor: magenta,
            textTransform: 'none',
            border: `1px solid ${magenta}`,
            "&:focus": {
              color: "#FFFFFF",
              backgroundColor: magentaDarker,
            },
            "&:hover": {
              color: "#FFFFFF",
              backgroundColor: magentaLight
            }
          },
        },
      ],
    },
    MuiCard: {
      variants: [
        {
          props: { variant: 'special' },
          style: {
            /*textTransform: 'none',
            border: `1px solid ${blue[700]}`,
            backgroundImage: `url(assets/images/color2.jpg)`,
            backgroundSize: 'cover',
            margin: '5px' */
            backgroundColor: '#f5f1f0',
            borderRadius: 0
          },
        },
      ],
    },
    MuiIconButton: {
      styleOverrides: {
        sizeMedium: {
          color,
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color,
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color,
        }
      }
    }
  },
  typography: {
    fontFamily: [
      'SifonnPro',
      'sans-serif',
    ].join(','),
  },
});

export default themeMeandro;


/*
link :  https://bareynol.github.io/mui-theme-creator/#Buttons

import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

export const themeOptions: ThemeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: '#f11524',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#b5cdf7',
      paper: '#60f9a9',
    },
    text: {
      primary: 'rgba(32,29,29,0.87)',
      secondary: 'rgba(72,54,54,0.54)',
      disabled: 'rgba(107,60,60,0.38)',
      hint: 'rgba(160,54,54,0.38)',
    },
  },
  typography: {
    h6: {
      fontWeight: 400,
      fontSize: '1.25em',
    },
  },
};

*/