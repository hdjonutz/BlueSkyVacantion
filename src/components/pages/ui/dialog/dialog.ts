import * as React from 'react';
import * as ReactDOM from 'react-dom';

export function showComponentAsDialog(createComponent: (onAfterClose: () => void) => React.ReactElement<any>): void {
    const hostContainer = document.createElement('div');
    const ofAfterClose = () => setTimeout(() => ReactDOM.unmountComponentAtNode(hostContainer), 0);
    const component = createComponent(ofAfterClose);

    ReactDOM.render(component, hostContainer);
}
