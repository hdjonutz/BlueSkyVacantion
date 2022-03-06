import * as React from 'react';
import style from './SliderComponent.less';
import Container from '@mui/material/Container';
import classnames from 'classnames';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import FiltersPage from '../pages/Products/Filters';

interface ISliderComponentState {
    default:    boolean;
    product:    string;
    height:     number;
    width:      number;
    timerSec:   number;
    changeImg:  number;
    isHome:     boolean;
    isProducts: boolean;
    isProduct:  number;
    updateImg:  boolean;
}

interface ISliderComponentprops {
    callback?: Function;
}

export default class SliderComponent extends React.Component<ISliderComponentprops, ISliderComponentState> {

    private height: number = 0;
    private width: number = 0;

    private refBoxImageSlider: any;
    private HEIGHT_IMG =       932;       // dpi:96
    private WIDTH_IMG  =       2000;      // dpi:96
    private images     =       ['slide1.jpg', 'slide2.jpg', 'slide3.jpg', 'slide4.jpg', 'slide5.jpg', 'slide6.jpg', 'slide7.jpg', 'slide8.jpg', 'slide9.jpg'];
    private timerSliderBar =       10;          // 10 sec
    private timerChangeImg =       1;           // s sec
    private subscription: Subscription = null as any;
    private observerTimer = new ReplaySubject(1);
    private observerChangeImg = new ReplaySubject(1);

    constructor(props: any) {
        super(props);

        this.state = {
            default:    true,
            height:     0,
            width:      0,
            timerSec:   0,
            changeImg:  0,
            isHome:     this.props.isHome,
            isProducts: this.props.isProducts,
            isProduct:  this.props.isProduct,
            updateImg:  true,
        };
        this.onResizeDivContainerImage  = this.onResizeDivContainerImage.bind(this);
        this.renderTimeSlider           = this.renderTimeSlider.bind(this);

        this.getClassA                  = this.getClassA.bind(this);
        this.getClassB                  = this.getClassB.bind(this);
    }

    // shouldComponentUpdate(nextProps, nextState: ISliderComponentState) {
    //     if (this.state.isHome !== nextProps.isHome
    //         || this.state.isProducts !== nextProps.isProducts
    //         || this.state.isProduct !== nextProps.isProduct
    //     ) {
    //         this.setState({
    //             isHome: nextProps.isHome,
    //             isProducts: nextProps.isProducts,
    //             isProduct: nextProps.isProduct
    //         });
    //         console.log('SliderComponentUpdate true');
    //         return true;
    //     } else if (this.state.updateImg !== nextState.updateImg) {
    //         return true;
    //     } else {
    //         console.log('SliderComponentUpdate false');
    //         return false;
    //     }
    // }

    componentWillUnmount() {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null as any;
        }

        if (this.observerTimer) {
            this.observerTimer.unsubscribe();
            this.observerTimer = null as any;
        }

        if (this.observerChangeImg) {
            this.observerChangeImg.unsubscribe();
            this.observerChangeImg = null as any;
        }
    }

    componentDidMount() {
        this.onResizeDivContainerImage();
        window.addEventListener('resize', () => {
            this.onResizeDivContainerImage();
        });
        this.renderTimeSlider();
    }

    onResizeDivContainerImage() {
        if (this.refBoxImageSlider) {
            this.height = this.refBoxImageSlider.clientHeight === 0 ? 500 : this.refBoxImageSlider.clientHeight;
        }
        if (this.refBoxImageSlider) {
            this.width = this.refBoxImageSlider.clientWidth;
        }

        if (this.state.height !== this.height || this.state.width !== this.width) {
            console.log(this.height, this.width);
            this.setState({height: this.height, width: this.width});
            if (this.props.callback) {
                this.props.callback(this.width, this.height);
            }
        }
    }

    calcStyleImg(): {[key: string]: string|number|boolean}|{} {
        const pH = this.state.height / this.HEIGHT_IMG;
        const pW = this.state.width / this.WIDTH_IMG;
        const procent = Math.max(pH, pW);
        const width = this.WIDTH_IMG * procent;
        const height = this.HEIGHT_IMG * procent;

        let top = 0;
        let left = 0;

        let styleImg = {
            width: width + 'px',
            height: height + 'px',
            position: 'absolute',
            transition: `all ${this.timerChangeImg}s`,
        };

        if (this.state.width === width) {
            console.log(this.state.width, width);
            top = (this.state.height - height) / 2;
        } else {
            left = (width - this.state.width) / -2;
        }
        styleImg = Object.assign(styleImg, {top: top + 'px', left: left + 'px'});
        const styleImg2 = Object.assign({}, styleImg, {left: width + left + 'px'});
        return {
            style1: styleImg,
            style2: styleImg2,
            obj: {
                _1: {left: left, width: width},
                _2: {left: width + left, width: width}
            }};
    }

    renderTimeSlider() {
        this.observerTimer.subscribe(() => {
            const tmp = Observable.timer(this.timerChangeImg * 1000).subscribe(() => {
                this.setState({
                    timerSec: 0,
                    changeImg: 2,
                    updateImg: !this.state.updateImg,
                });
                this.reorderImages(1);
                this.observerChangeImg.next(true);
                tmp.unsubscribe();
            });
        });

        this.observerChangeImg.subscribe(() => {
            this.setState({ timerSec: 1, changeImg: 0});
            const tmp = Observable.timer(this.timerSliderBar * 1000).subscribe(() => {
                this.setState({
                    timerSec: 2,
                    changeImg: 1,
                    updateImg: this.state.updateImg,
                });
                this.observerTimer.next(true);
                tmp.unsubscribe();
            });
        });
        this.observerChangeImg.next(true);
    }

    reorderImages(order: number): void {
        if (order) {
            // first to the end
            const first = this.images.splice(0, 1);
            this.images.push(first[0]);
        } else {
            const last = this.images.splice(0, this.images.length - 1);
            last.map((r) => this.images.push(r));
        }
        this.setState({});
    }

    getClassA(): string {
        if (this.state.timerSec < 2) {
            return style.colorTimer;
        } else {
            return style.nothing;
        }
    };

    getClassB(): string {
        if (this.state.timerSec < 2 && this.state.timerSec !== 0) {
            return style.start;
        } else {
            return '';
        }
    };

    render() {
        const styleImg: any = this.calcStyleImg();

        const imgShow = this.images.filter((k, i) => i === 0 || i === 1);
        const _first = styleImg.obj._1;
        const second = styleImg.obj._2;
        if (this.state.timerSec === 2) {
            styleImg.style1.left = _first.left - _first.width + 'px';
            styleImg.style2.left = second.left - second.width + 'px';
        } else if (this.state.timerSec === 1) {
            styleImg.style1.transition = 'none';
            styleImg.style2.transition = 'none';
        } else if (this.state.timerSec === 1) {
            console.log('nothing');
        }

        console.log(`states: isHome: ${this.state.isHome}, isProducts: ${this.state.isProducts} isProduct: ${this.state.isProduct}`);
        console.log(`props: isHome: ${this.props.isHome}, isProducts: ${this.props.isProducts} isProduct: ${this.props.isProduct}`);

        return(
            <>
                <Container className={style.absolute} > {/*maxWidth='xl'*/}
                    {this.state.default && <div className={style.content}>
                        <div className={classnames(style.container, 'slider-container')} ref={(ref) => this.refBoxImageSlider = ref}>
                            <div className={classnames(style.imagesSlider)} >
                                <img src={'./assets/slider/default/' + imgShow[0]} style={styleImg.style1} />
                                <img src={'./assets/slider/default/' + imgShow[1]} style={styleImg.style2} />
                            </div>
                            <div className={style.buttonsSlider}>
                                <div className={style.leftSlider} onClick={() => this.reorderImages(0)}>
                                    <img src='./assets/slider/images/left.png' />
                                </div>
                                <div className={style.rightSlider} onClick={() => this.reorderImages(1)}>
                                    <img src='./assets/slider/images/right.png' />
                                </div>
                            </div>
                            <div className={style.timeSlider}>
                                <div className={classnames(this.getClassA(), this.getClassB())}></div>
                            </div>
                            <div className={style.textContext}>
                                <div className={style.leftSide}>
                                    <div className={style.textLeftSide}>left</div>
                                </div>
                                <div className={style.rightSide}>
                                    <div className={style.textRightSide}>Right</div>
                                    {this.state.isProducts && <FiltersPage style={{height: this.state.height}} />}
                                </div>
                            </div>

                        </div>
                    </div>}
                    {!this.state.default &&
                        <>
                            <div className={style.content}>
                                <img src='./assets/slider/products/yacht_1_0932.jpg' />
                                <img src='./assets/slider/products/yacht_1_2833.jpg' />
                            </div>
                            <div className={style.content}>
                                <img src='./assets/slider/products/yacht_2_dqwe.jpg' />
                                <img src='./assets/slider/products/yacht_2_213s.jpg' />
                            </div>
                        </>
                    }
                </Container>
            </>
        )
    }
}
