import * as React from 'react';
import style from './firstDetails.less';
import {chunkArrayInGroups} from '../../../util/helpers';

export default class FirstDetails extends React.PureComponent {

    private FINAL_DETAILS_ITEM_LIST = '1';

    render() {
        const j: any = this.props;
        const columns = j.details.length % 2 === 1
            ? chunkArrayInGroups(j.details, Math.floor(j.details.length / 2) + 1 )
            : chunkArrayInGroups(j.details, j.details.length / 2) ;

        return (
            <div className={style.rowColumn}>
                {
                    columns.map((tab) =>
                        <div className={style.column}>
                            {tab.map((row) =>
                                <div className={style.row}>
                                    <img src={`assets/icons/item_${row.icon}.svg`} style={{height: '32px'}}/>
                                    <span>{row.name}</span>
                                </div>
                            )}
                        </div>
                    )
                }
            </div>
        )
    }
}
