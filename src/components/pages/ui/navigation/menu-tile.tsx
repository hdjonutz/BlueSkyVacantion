import * as React from 'react';
import style from './menu-tile.less';
import {NavLink} from 'react-router-dom';
import LegacyIcon from '../legacy/legacy-icon';
import Icon from '../utils/icon';
import {i18n} from '../../../../i18n/i18n';
import {MenuEntry} from './../../../../routes';

interface MenuTileProps {
    entry: MenuEntry;
}

const MenuTile: React.StatelessComponent<MenuTileProps> = (props) => {
    return (
        <NavLink to={props.entry.path} key={props.entry.path}>
            <button className={style.entry}>
                {props.entry.icon
                    ? <Icon name={props.entry.icon} size={64} />
                    : <LegacyIcon path={props.entry.iconPath} size={64} />}
                <div className={style.title}>
                    {props.entry.titleI18n
                        ? i18n(props.entry.titleI18n)
                        : props.entry.title}
                </div>
            </button>
        </NavLink>
    );
};

export default MenuTile;
