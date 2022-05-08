// import { createStyles, makeStyles } from '@mui/styles';
//
// const useStylesTextField = makeStyles((theme) => ({
//     searchBarStyle: {
//         height: "40px",
//         width: "200px",
//         margin: "0 0 0 0",
//         float: "right",
//         "& .MuiOutlinedInput-root": {
//             "& fieldset": {
//                 borderRadius: "20px",
//                 borderColor: "#000fff"
//             },
//         "&.Mui-focused fieldset": {
//             borderColor: "#C52328",
//             borderWidth: "2px"
//         }
//     }
//   }
//   }));
//
// export default useStylesTextField;
//
//   // import { ThemeOptions } from '@mui/styles/createMuiTheme';
// import { ThemeOptions } from '@mui/material';
// import { createTheme } from '@mui/material/styles';
// import { orange, blue } from '@mui/material/colors';
//
// export const magenta = '#ff7f27';
//
// const themeMeandro: ThemeOptions = createTheme({
//   palette: {
//     type: 'light',
//     palette: {
//       type: 'light',
//       primary: {
//         main: '#ff7f27',
//       },
//       secondary: {
//         main: '#f50057',
//       },
//       info: {
//         main: '#ff7f27',
//       },
//     },
//     text: {
//       primary: magenta,
//       secondary: '#5a1078',
//       disabled: 'rgba(129,107,0,0.38)',
//       hint: magenta,
//     },
//     divider: magenta,
//   },
//   typography: {
//     h6: {
//       fontWeight: 400,
//       fontSize: '1.25em',
//     },
//   },
//   components: {
//     MuiButton: {
//       variants: [
//         {
//           props: { variant: 'special' },
//           style: {
//             color: '#FFFFFF',
//             backgroundColor: magenta,
//             textTransform: 'none',
//             border: `1px solid ${magenta}`,
//             "&:focus": {
//               color: "#FFFFFF",
//               backgroundColor: '#460988'
//             }
//           },
//         },
//       ],
//     },
//       MuiTab: {
//         root: {
//           "&:hover": {
//             backgroundColor: "#F56705",
//             color: "#e3f595"
//           },
//           "&$selected": {
//             backgroundColor: "#060F78",
//             color: "black",
//             "&:hover": {
//                backgroundColor: "grenn",
//                color: "#027808"
//             }
//           },
//         },
//         "textColorInherit":{
//           color: "black"
//         }
//       },
//     // MuiInputBase-colorPrimary MuiInputBase-formControl
//     MuiCard: {
//       variants: [
//         {
//           props: { variant: 'special' },
//           style: {
//             textTransform: 'none',
//             border: `1px solid ${blue[700]}`,
//             backgroundImage: `url(assets/images/color2.jpg)`,
//             backgroundSize: 'cover',
//             margin: '5px'
//           },
//         },
//       ],
//     },
//     /*MuiTypography: {
//       defaultProps: {
//         variantMapping: {
//           h1: 'h2',
//           h2: 'h2',
//           h3: 'h2',
//           h4: 'h2',
//           h5: 'h2',
//           h6: 'h2',
//           subtitle1: 'h2',
//           subtitle2: 'h3',
//           body1: 'span',
//           body2: 'span',
//         },
//       },
//     },*/
//   },
//   typography: {
//     fontFamily: [
//       'SifonnPro',
//       'sans-serif',
//     ].join(','),
//  }
// });
//
// export default themeMeandro;
//
//
// /*
// link :  https://bareynol.github.io/mui-theme-creator/#Buttons
//
// import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
//
// export const themeOptions: ThemeOptions = {
//   palette: {
//     type: 'light',
//     primary: {
//       main: '#f11524',
//     },
//     secondary: {
//       main: '#f50057',
//     },
//     background: {
//       default: '#b5cdf7',
//       paper: '#60f9a9',
//     },
//     text: {
//       primary: 'rgba(32,29,29,0.87)',
//       secondary: 'rgba(72,54,54,0.54)',
//       disabled: 'rgba(107,60,60,0.38)',
//       hint: 'rgba(160,54,54,0.38)',
//     },
//   },
//   typography: {
//     h6: {
//       fontWeight: 400,
//       fontSize: '1.25em',
//     },
//   },
// };
//
// */
//
// /*https://codesandbox.io/s/mui-3-how-to-override-tab-theme-forked-vcg5hh?file=/demo.js*/
// /*
// * import React from "react";
// import PropTypes from "prop-types";
// import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
// import AppBar from "@material-ui/core/AppBar";
// import Tabs from "@material-ui/core/Tabs";
// import Tab from "@material-ui/core/Tab";
// import Typography from "@material-ui/core/Typography";
// import { orange, pink, green } from "@material-ui/core/colors";
//
// function TabContainer(props) {
//   return (
//     <Typography component="div" style={{ padding: 8 * 3 }}>
//       {props.children}
//     </Typography>
//   );
// }
//
// TabContainer.propTypes = {
//   children: PropTypes.node.isRequired
// };
//
// const theme = createMuiTheme({
//   overrides: {
//     MuiTabs: {
//       indicator: {
//         backgroundColor: "#aadeff"
//       }
//     },
//     MuiTab: {
//       root: {
//         "&:hover": {
//           backgroundColor: "green",
//           color: "#e3f595"
//         },
//         "&$selected": {
//           backgroundColor: "yellow",
//           color: "black",
//           "&:hover": {
//             backgroundColor: green[100],
//             color: green[700]
//           }
//         }
//       },
//       textColorInherit: {
//         color: "black"
//       }
//     }
//   }
// });
//
// class SimpleTabs extends React.Component {
//   state = {
//     value: 0
//   };
//
//   handleChange = (event, value) => {
//     this.setState({ value });
//   };
//
//   render() {
//     const { classes } = this.props;
//     const { value } = this.state;
//
//     return (
//       <MuiThemeProvider theme={theme}>
//         <div>
//           <AppBar position="static">
//             <Tabs value={value} onChange={this.handleChange}>
//               <Tab label="Item One" />
//               <Tab label="Item Two" />
//               <Tab label="Item Three" href="#basic-tabs" />
//             </Tabs>
//           </AppBar>
//           {value === 0 && <TabContainer>Item One</TabContainer>}
//           {value === 1 && <TabContainer>Item Two</TabContainer>}
//           {value === 2 && <TabContainer>Item Three</TabContainer>}
//         </div>
//       </MuiThemeProvider>
//     );
//   }
// }
//
// SimpleTabs.propTypes = {
//   classes: PropTypes.object.isRequired
// };
//
// export default SimpleTabs;
//
// * */
