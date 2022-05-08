// import { ThemeOptions } from '@mui/styles/createMuiTheme';
import { ThemeOptions } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { green, orange, blue } from '@mui/material/colors';

// export const magentaLight = '#7212dd';
// export const magenta = '#ff7f27';
// export const magentaDarker = '#5b0faf';

export const colorWhite = '#f5f1f0';
export const colorBase = '#ff7f27';

export const colorPrimary = '#ff7f27';
export const colorPrimaryDarker = '#e07024';
export const colorPrimaryLighter = '#fa8a3d';

export const colorSecundary = '#fd9a59';
export const colorDisabled = '#fab083';
export const colorHint = '#bd6e37';

export const colorTextPrimary = '#343e45';
export const colorTextSecundary = '#37444d';
export const colorTextDisabled = '#52626c';
export const colorTextHint = '#252c31';

export const colorTextHover = '#ff7f271a';


const themeMeandro: ThemeOptions = createTheme({
  palette: {
    primary: {
      main: colorPrimary,
      contrastText: colorPrimary,
    },
    secondary: {
      main: colorSecundary,
    },
    info: {
      main: colorHint,
    },
    background: {
      /*default: '#b5cdf7',*/
      /*paper: '#60f9a9',*/
    },
    text: {
      primary: colorTextPrimary,
      secondary: colorTextSecundary,
      disabled: colorTextDisabled,
    },
    divider: colorTextDisabled,
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            color: colorWhite,
            backgroundColor: colorPrimary,
            textTransform: 'none',
            border: `1px solid ${colorPrimary}`,
            '&:focus': {
              color: colorWhite,
              backgroundColor: colorPrimaryDarker,
            },
            '&:hover': {
              color: colorWhite,
              backgroundColor: colorPrimaryLighter
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
            backgroundColor: colorWhite,
            borderRadius: 0
          },
        },
      ],
    },
    MuiIconButton: {
      styleOverrides: {
        sizeMedium: {
          colorBase,
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          colorBase,
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          colorBase,
        }
      }
    },
    // MuiInput: {
    //   styleOverrides: {
    //     root: {
    //       '::before': {
    //         borderBottom: `1px solid ${colorPrimary}`,
    //       },
    //       '::after': {
    //         borderBottom: `2px solid ${colorPrimary}`,
    //       },
    //       ':hover:not(.Mui-disabled):before': {
    //         backgroundColor: colorTextHover
    //       }
    //     }
    //   }
    // }
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
