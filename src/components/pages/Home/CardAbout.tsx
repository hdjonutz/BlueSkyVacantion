import * as React from 'react';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface IcardAboutProps {
    title?:         string;
    description?:   string;
}
export default class CardAbout extends React.Component<IcardAboutProps, {}> {
    constructor(props: any) {
        super(props);

        this.state = {
            expanded: false,
        };
    }

    render() {
        return (
            <Grid item xs={12} sm={4} xl={4}>
                <Card variant={'special'} style={{margin: 0, border: 'none'}}>
                    <CardHeader style={{display: 'flex', flexDirection: 'column'}}
                        avatar={this.props.children}
                        title={<h2>{this.props.title}</h2>}
                    />
                    <CardContent>
                        <Typography variant='body2' color='text.secondary'>
                            This impressive paella is a perfect party dish and a fun meal to
                            cook together with your guests. Add 1 cup of frozen peas along with
                            the mussels, if you like.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        );
    }
}

