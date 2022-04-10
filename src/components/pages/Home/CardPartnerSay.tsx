import * as React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

export default class CardPartnerSay extends React.Component<{}, {}> {

    constructor(props: any) {
        super(props);

        this.state = {
            expanded: false,
        };
    }

    render() {
        return (
            <Grid item xs={12} sm={12} xl={12}>
                <Card variant={'special'}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Lizard
                        </Typography>
                        <Typography gutterBottom variant="h7" component="div">
                            April 13, 2015 A
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
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
