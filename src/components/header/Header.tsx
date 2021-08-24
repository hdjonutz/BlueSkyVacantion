import * as React from 'react';

export default class Footer extends React.PureComponent<{}, {}> {

    public render() {
        return (
            <header>
            </header>
        );
    }

    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}
