import * as React from 'react';

interface IconProps {
    /**
     * Name of the icon to display (filename in the icons directory, without ".svg" extension.
     */
    name: string;
    /**
     * Additional css classes to apply.
     */
    className?: string;
    /**
     * Size of the icon to display, default size is 24.
     */
    size?: number;
}

/**
 * Displays an svg icon. Color can be controlled via css color or is chosen from the current text color.
 * @param props
 * @return {any}
 * @constructor
 */
const Icon: React.StatelessComponent<IconProps> = (props) => {
    const requireSvg = require.context('../../../../assets/svg/', false, /\.svg$/);
    const svgBox = (requireSvg('./' + props.name + '.svg') as {default: any}).default as {viewBox: string, id: string};

    return (
        <svg
            style={{width: `${props.size}px`, height: `${props.size}px`}}
            className={props.className}
            viewBox={svgBox.viewBox}
        >
            <use xlinkHref={'#' + svgBox.id} />
        </svg>
    );
};

Icon.defaultProps = {
    size: 24,
};

export default Icon;
