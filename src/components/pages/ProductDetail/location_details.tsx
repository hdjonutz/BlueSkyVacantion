import * as React from 'react';
import style from './location_details.less';

interface ILocationDetails {
    locations: ReadonlyArray<{ lna: number, sna: string, hints: string}>;
}

export default class LocationDetails extends React.Component<ILocationDetails, {}> {

    constructor(props: any) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        const locations = this.props.locations.filter((f: any) => f.lna !== '(or) any port (extra costs)');
        const hasExtraOpts = this.props.locations.find((f: any) => f.lna === '(or) any port (extra costs)');
        return (
            <React.Fragment>
                <div className={style.container}>
                    <div className={style.line}></div>
                    <div className={style.lineLocations}>
                        <div className={style.location}>
                            <div className={style.circle} style={{opacity: 0}}></div>
                            <div>
                                <div></div>
                                <div><small><i>&nbsp;</i></small></div>
                            </div>
                        </div>
                        {locations.map((l, k) =>
                            <div className={style.location} key={k}>
                                <div className={style.circle}></div>
                                <div>
                                    <div>{l.lna}</div>
                                    {l.hints && l.hints !== '' && <div><small><i>{l.hints}</i></small></div>}
                                </div>
                            </div>
                        )}
                        <div className={style.location}>
                            <div className={style.circle} style={{opacity: 0}}></div>
                            <div>
                                <div></div>
                                <div><small><i>&nbsp;</i></small></div>
                            </div>
                        </div>
                    </div>
                </div>
                {hasExtraOpts && <div>{'(or) any port (extra costs)'}</div>}
            </React.Fragment>
        );
    }

}
