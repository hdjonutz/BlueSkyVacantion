import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

export default class CopyrightPureComponent extends React.PureComponent {

  render() {
    const { props } = this.props;

    return (
        <Typography variant="body2" color="inherit" align="center" {...props}>
            {'Copyright © '} 
            <Link color="inherit" href="/policy">
              {new Date().getFullYear()} {COMPANY_NAME}
            </Link>{' '}<br />
            <Link color="inherit" href="/policy">
              All Rights Reserved |
            </Link> {' '}
            <Link color="inherit" href="/policy">
              Privacy Policy.
            </Link>
        </Typography>
      );
  }
}
