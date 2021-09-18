import * as React from 'react';
import * as classNames from 'classnames';
import style from './button.less';
// import TooltipContainer from './tooltip-container';
import LegacyIcon from '../legacy/legacy-icon';
import Icon from './icon';
import {extractDataProps} from './jsx_helper';

interface WithIcon {
    icon: string;
    iconPath?: never;
}

interface WithLegacyIcon {
    icon?: never;
    iconPath: string;
}

type IconButtonProps = (WithIcon | WithLegacyIcon) & {
    title?: string;
    /**
     * Additional css classes to apply.
     */
    className?: string;
    disabled?: boolean;
    inline?: boolean;

    onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
}

const IconButton: React.StatelessComponent<IconButtonProps> = (props) => {
    function renderIconButton() {
        return (
            <button
                className={classNames(props.className, style.button, style.icon, props.inline ? style.inline : style.raised)}
                disabled={props.disabled}
                onClick={props.onClick}
                {...extractDataProps(props)}
            >
                {props.icon
                    ? <Icon name={props.icon} size={props.inline ? 20 : 24} />
                    : <LegacyIcon path={props.iconPath} size={props.inline ? 20 : 24} />}
            </button>
        );
    }

    if (props.title) {
        render(renderIconButton());
        // return (
        //     <TooltipContainer
        //         wrapper={<div className={style.tooltip} />}
        //         text={props.title}
        //     >
        //
        //     </TooltipContainer>
        // );
    } else {
        return renderIconButton();
    }
};

IconButton.defaultProps = {
    disabled: false,
    inline: false,
};

export default IconButton;
