import * as React from 'react';
import * as classNames from 'classnames';
import style from './icon.less';

interface LegacyIconProps {
    /**
     * Path to the icon, relative to the root of the assets/ directory.
     */
    path: string;
    /**
     * Size of the icon to display, default size is 24.
     */
    size?: number;
    /**
     * Additional css classes to apply.
     */
    className?: string;
}

/**
 * A legacy icon that supports and svg path (e.g. from the images/ directory). Do not use together with icons from the
 * icons/ directory!
 * @param props
 * @return {any}
 * @constructor
 */
const LegacyIcon: React.StatelessComponent<LegacyIconProps> = (props) => {
    if (props.path) {
        return (
            <img className={classNames(style.icon, props.className)}
                 src={props.path}
                 style={{width: `${props.size}px`, height: `${props.size}px`}} />
        );
    } else {
        // Display equal sizes space placeholder
        return (
            <div className={classNames(style.placeholder, props.className)}
                 style={{width: `${props.size}px`, height: `${props.size}px`}} />
        );
    }
};

LegacyIcon.defaultProps = {
    size: 24,
};

export default LegacyIcon;
