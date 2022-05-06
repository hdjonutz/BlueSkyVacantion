import * as React from 'react';
import style from './admin.less';
import {NavLink} from 'react-router-dom';
import {RouteComponentProps} from 'react-router';
import routes from '../../../routes';
import {AuthorizedApiService} from '../../../services/authorized_api_service';
import {ApiService} from '../../../services/api_service';
import 'reflect-metadata';
import { resolve } from 'inversify-react';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Link from '@mui/material/Link';

import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Tooltip from '@mui/material/Tooltip/Tooltip';
import FirstDetails from './FirstDetails';

interface ICardLastOfferStates {
    expanded:   boolean;
    path:       string;
}

interface ICardLastOfferProps {
    jacht:   any;
}


export default class CardLastOffer extends React.Component<ICardLastOfferProps, ICardLastOfferStates> {
    private logo = `assets/svg/logo.svg`;

    constructor(props: any) {
        super(props);

        this.state = {
            expanded: false,
            path: this.props.jacht ? `assets/slider/products/${this.props.jacht.product_id}/small/01.jpg` : ''
        };

        this.setExpanded        = this.setExpanded.bind(this);
        this.handleExpandClick  = this.handleExpandClick.bind(this);
    }

    setExpanded(expanded: boolean) {
        this.setState({expanded});
    }

    handleExpandClick() {
        this.setExpanded(!this.state.expanded);
    };

    render() {
        const j = this.props.jacht;
        return (
            <>{ j && <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <img style={{display: 'none'}} src={this.state.path} onError={() => this.setState({path: this.logo})}/>
                <NavLink to={`/online/home/products/${j.product_id}`} style={{textDecoration: 'none'}} >
                    <Card variant={'special'}>
                        <CardMedia
                            component='img'
                            height='194'
                            image={this.state.path}
                            alt='Paella dish'
                            style={{background: '#d6f1f7'}}
                        />
                        <CardContent style={{minHeight: '263px'}}>
                            <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between'}}>
                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                    <Typography variant='h6' component='div'>
                                        {j.product_name}
                                    </Typography>
                                    <Typography variant='h7' component='div'>
                                        {j.product_model || j.product_marker}
                                    </Typography>
                                </div>
                                <div style={{display: 'flex', flexDirection: 'column', textAlign: 'end'}}>
                                    <Typography variant='h7' component='div'>
                                        40€
                                    </Typography>
                                    <Typography variant='h7' component='div' style={{color: '#3fb521'}}>
                                        +20%
                                    </Typography>
                                </div>
                            </div>
                            {this.props.jacht &&
                                <FirstDetails {...this.props.jacht} />
                            }
                        </CardContent>
                        <CardActions disableSpacing>
                            {/* <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton> */}
                            <Tooltip title='Show More'>
                                <ExpandMore
                                    expand={this.state.expanded}
                                    onClick={this.handleExpandClick}
                                    aria-expanded={this.state.expanded}
                                    aria-label='show more'
                                >
                                    <ExpandMoreIcon />
                                </ExpandMore>
                            </Tooltip>

                        </CardActions>
                        <Collapse in={this.state.expanded} timeout='auto' unmountOnExit>
                            <CardContent>
                                <Typography paragraph>Method:</Typography>
                                <Typography paragraph>
                                    Heat 1/2 cup of the broth in a pot until simmering, add saffron
                                    and set aside for 10 minutes.
                                </Typography>
                                <Typography paragraph>
                                    Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
                                    over medium-high heat. Add chicken, shrimp and chorizo, and cook,
                                    stirring occasionally until lightly browned, 6 to 8 minutes.
                                    Transfer shrimp to a large plate and set aside, leaving chicken
                                    and chorizo in the pan. Add pimentón, bay leaves, garlic,
                                    tomatoes, onion, salt and pepper, and cook, stirring often until
                                    thickened and fragrant, about 10 minutes. Add saffron broth and
                                    remaining 4 1/2 cups chicken broth; bring to a boil.
                                </Typography>
                                <Typography paragraph>
                                    Add rice and stir very gently to distribute. Top with artichokes
                                    and peppers, and cook without stirring, until most of the liquid
                                    is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
                                    reserved shrimp and mussels, tucking them down into the rice, and
                                    cook again without stirring, until mussels have opened and rice is
                                    just tender, 5 to 7 minutes more. (Discard any mussels that don’t
                                    open.)
                                </Typography>
                                <Typography>
                                    Set aside off of the heat to let rest for 10 minutes, and then
                                    serve.
                                </Typography>
                            </CardContent>
                        </Collapse>
                    </Card>
                </NavLink>
            </Grid>
            }</>
        );
    }
}

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));
