import * as React from 'react';
import style from './location_details.less';

interface ILocationDetails {
    locations: ReadonlyArray<{ value: number, label: string, hints: string}>;
}

export default class LocationDetails extends React.Component<ILocationDetails, {}> {

    constructor(props: any) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className={style.container}>
                <div className={style.line}></div>
                <div className={style.lineLocations}>
                    {this.props.locations.map((l, k) =>
                        <div className={style.location} key={k}>
                            <div className={style.circle}></div>
                            <div>
                                <div>{l.label}</div>
                                {l.hints && l.hints !== '' && <div><small><i>{l.hints}</i></small></div>}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

}
