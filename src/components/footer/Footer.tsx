
import * as React from 'react';
import style from './Footer.less';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import CopyrightPureComponent from '../CopyRight/Copyright';
import { ThemeProvider } from '@mui/material/styles';
import themeMeandro from '../Layout/Theme';

export default class Footer extends React.PureComponent<{}, {}> {
    public render() {
        // return (
        //     <React.Fragment>
        //         <div className={style.footer}>
        //             <div className={style.container}>
        //                 <div className={style.columns}>
        //                     <div className={style.column}>
        //                         <ul>
        //                             <li className={style.column_title}>Services</li>
        //                             <li>Tips</li>
        //                             <li>c1_li_2</li>
        //                             <li>c1_li_3</li>
        //                         </ul>
        //                     </div>
        //                     <div className={style.column}>
        //                         <ul>
        //                             <li className={style.column_title}>Domains</li>
        //                             <li>Trips</li>
        //                             <li>Coaching</li>
        //                             <li>c2_li_3</li>
        //                         </ul>
        //                     </div>
        //                     <div className={style.column}>
        //                         <ul>
        //                             <li className={style.column_title}>About Us</li>
        //                             <li>c3_li_1</li>
        //                             <li>c3_li_2</li>
        //                             <li>c3_li_3</li>
        //                         </ul>
        //                     </div>
        //                     <div className={style.column}>
        //                         <ul>
        //                             <li className={style.column_title}>Column 4 Title</li>
        //                             <li>c4_li_1</li>
        //                             <li>c4_li_2</li>
        //                             <li>c4_li_3</li>
        //                         </ul>
        //                     </div>
        //                 </div>
        //                 <div className={style.columns}>
        //                     <div className={classNames(style.column, style.noMarginBottom)}>
        //                         <ul><li className={style.column_title}>Contacts</li></ul>
        //                     </div>
        //                 </div>
        //                 <div className={style.columns}>
        //                     <div className={classNames(style.column, style.noMarginTop)}><ul><li>
        //                         <img src={'assets/icons/contacts_email.svg'} /> info@elinext.com
        //                     </li></ul>
        //                     </div>
        //                     <div className={classNames(style.column, style.noMarginTop)}><ul><li>
        //                         <img src={'assets/icons/contacts_phone.svg'} /> (+49) 07437 457362
        //                     </li></ul>
        //                     </div>
        //                     <div className={classNames(style.column, style.noMarginTop)}><ul><li>
        //                         <img src={'assets/icons/contacts_skype.svg'} /> blueskey.group
        //                     </li></ul>
        //                     </div>
        //                     <div className={classNames(style.column, style.noMarginTop)}><ul><li>
        //                         <button onClick={() => {}}>CONTACT ME</button>
        //                     </li></ul>
        //                     </div>
        //                     <div className={classNames(style.column, style.noMarginTop)}><ul><li>
        //                         <img src={'assets/icons/social_facebook.svg'} />
        //                         <img src={'assets/icons/social_instagram.svg'} />
        //                         <img src={'assets/icons/social_twitter.svg'} />
        //                         <img src={'assets/icons/social_linkedin.svg'} />
        //                     </li></ul>
        //                     </div>
        //                 </div>
        //                 <div className={classNames(style.columns, style.copyright)}>
        //                     <div className={style.column}>
        //                         <ul><li>
        //                             © 2021 Meandro Jachting LTD | All Rights Reserved | Privacy Policy
        //                         </li></ul>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </React.Fragment>
        // );
        return (
            <ThemeProvider theme={themeMeandro}>
              <Box
                px={{ xs: 3, sm: 5 }}
                py={{ xs: 5, sm: 5 }}
                bgcolor="text.primary"
                color="white"
              >
                <Container maxWidth="lg" >
                    {/*<Grid container spacing={5}>
                    <Grid item xs={12} sm={3}>
                      <Box borderBottom={1}>Help</Box>
                        <Box>
                        <Link href="/" color="inherit">
                          Contact
                        </Link>
                      </Box>
                      <Box>
                        <Link href="/" color="inherit">
                          Support
                        </Link>
                      </Box>
                      <Box>
                        <Link href="/" color="inherit">
                          Privacy
                        </Link>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Box borderBottom={1}>Account</Box>
                        <Box>
                        <Link href="/" color="inherit">
                          Login
                        </Link>
                      </Box>
                      <Box>
                        <Link href="/" color="inherit">
                          Register
                        </Link>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Box borderBottom={1}>Messages</Box>
                        <Box>
                        <Link href="/" color="inherit">
                          Backup
                        </Link>
                      </Box>
                      <Box>
                        <Link href="/" color="inherit">
                          History
                        </Link>
                      </Box>
                      <Box>
                        <Link href="/" color="inherit">
                          Roll
                        </Link>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Box borderBottom={1}>Messages</Box>
                        <Box>
                        <Link href="/" color="inherit">
                          Backup
                        </Link>
                      </Box>
                      <Box>
                        <Link href="/" color="inherit">
                          History
                        </Link>
                      </Box>
                      <Box>
                        <Link href="/" color="inherit">
                          Roll
                        </Link>
                      </Box>
                    </Grid>
                  </Grid>  */}
                  <Box textAlign='center'> {/* pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}*/}
                    <CopyrightPureComponent />
                  </Box>
                </Container>
              </Box>
            </ThemeProvider>
          );
    }
}
