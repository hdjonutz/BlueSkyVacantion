import * as React from 'react';
import style from './error-display.less';
import Icon from './icon';

interface ErrorDisplayProps {
    title: string;
    details?: string;
}

const ErrorDisplay: React.StatelessComponent<ErrorDisplayProps> = (props) => {
    return (
        <div className={style.container}>
            <div className={style.header}>
                <div className={style.icon}>
                    <Icon name='error' size={48} />
                </div>
                <div className={style.text}>
                    <p className={style.title}>{props.title}</p>
                    {React.Children.map(props.children, (c) => <p>{c}</p>)}
                </div>
            </div>
            {props.details && <p className={style.stack}>{props.details}</p>}
        </div>
    );
};

export default ErrorDisplay;
