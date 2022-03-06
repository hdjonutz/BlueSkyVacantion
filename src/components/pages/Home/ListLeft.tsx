import * as React from 'react';
import {Observable} from 'rxjs';
import 'reflect-metadata';
import Box from '@mui/material/Box';
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Grid from '@mui/material/Grid';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import themeMeandro from '../../Layout/Theme';

import classNames from 'classnames';
import CardPage from './Card';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import style from './listLeft.less';
import Link from '@mui/material/Link';
import {NavLink} from'react-router-dom';

export default class ListLeft extends React.Component<{}, {}> {

    constructor(props: any) {
        super(props);

        this.state = {}
    }


    render() {
        return (
            <Container className={style.container}>
                <CssBaseline />
                <Box sx={{ flexGrow: 1 }} className={style.leftSide}>
                    <div className={style.latestPost}>
                        <h2>Latest Post</h2>
                        <ul className={style.sidebarPosts}>
                            {
                                [0, 1, 2, 3, 4].map(() =>
                                <li>
                                    <NavLink to={'/online/home/products'} style={{textDecoration: 'none'}}>
                                        <div className={style.sidebarPostsImg}>
                                            <img src={'https://images.unsplash.com/photo-1589118949245-7d38baf380d6?w=164&h=164&fit=crop&auto=format'} />
                                        </div>
                                        <p className={style.sidebarPostTitle}>Cupidatat est esse</p>
                                        <p className={style.sidebarPostDate}>April 13, 2015</p>
                                    </NavLink>
                                </li>)
                            }
                        </ul>
                    </div>
                    <div className={style.latestGallery}>
                        <h2>Latest Gallery </h2>
                        <div className={style.sidebarPosts}>
                            {/*
                                [0, 1, 2, 3, 4, 5].map(() =>
                                    <div className={style.sidebarPostsImg}>
                                        <a href={'https://themes.thememasters.club/oriel/cupidatat-est-esse/'}>
                                            <img src={'https://themes.thememasters.club/oriel/wp-content/uploads/sites/5/2015/04/1-5-150x150.jpg'} />
                                        </a>
                                    </div>
                                )
                            */}
                            <ImageList sx={{height: 185 }} cols={3} rowHeight={70}>
                                    {[{
                                        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
                                        title: 'Breakfast',
                                        link: '/online/home/products/321321'
                                    },
                                    {
                                        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
                                        title: 'Burger',
                                        link: '/online/home/products/321321'
                                    },
                                    {
                                        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
                                        title: 'Camera',
                                        link: '/online/home/products/12432'
                                    },
                                    {
                                        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
                                        title: 'Coffee',
                                        link: '/online/home/products/12432'
                                    },
                                    {
                                        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
                                        title: 'Hats',
                                        link: '/online/home/products/423232'
                                    },
                                    {
                                        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
                                        title: 'Honey',
                                        link: '/online/home/products/423232'
                                    }].map((item) => (
                                        <Link color="inherit" to={item.link}>
                                            <ImageListItem key={item.img} >
                                                <img
                                                    src={`${item.img}?w=70&h=70&fit=crop&auto=format`}
                                                    srcSet={`${item.img}?w=70&h=70&fit=crop&auto=format&dpr=2 2x`}
                                                    alt={item.title}
                                                    loading="lazy"
                                                />
                                            </ImageListItem>
                                        </Link>
                                ))}
                            </ImageList>
                        </div>
                    </div>
                </Box>
            </Container>
        )
    }
}
