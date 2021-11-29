import * as React from 'react';
import 'reflect-metadata';
import style from './admin_page.less';
import ReactSelect from 'react-select';
import { resolve } from 'inversify-react';
import ReactJson from 'react-json-view';
import {RouteComponentProps} from 'react-router';
import {ApiService} from '../../../services/api_service';

export default class JsonViewerPage extends React.PureComponent<RouteComponentProps<{}>, {}> {

    @resolve(ApiService) private apiService: ApiService;

    private defaultProps = {
        theme:              'monokai',
        configForms:        {init: true},
        collapsed:          false,
        collapseStringsAfter: 15,
        onAdd:              true,
        onEdit:             true,
        onDelete:           true,
        displayObjectSize:  true,
        enableClipboard:    true,
        indentWidth:        4,
        displayDataTypes:   true,
        iconStyle:          'triangle'
    };

    constructor(props: any) {
        super(props);
        this.state = {
            configForms: null,
            collapseStringsAfter:   this.defaultProps.collapseStringsAfter,
            onAdd:                  this.defaultProps.onAdd,
            onEdit:                 this.defaultProps.onEdit,
            onDelete:               this.defaultProps.onDelete,
            displayObjectSize:      this.defaultProps.displayObjectSize,
            enableClipboard:        this.defaultProps.enableClipboard,
            theme:                  this.defaultProps.theme,
            iconStyle:              this.defaultProps.iconStyle,
            collapsed:              this.defaultProps.collapsed,
            indentWidth:            this.defaultProps.indentWidth,
            displayDataTypes:       this.defaultProps.displayDataTypes,
        };
    }

    componentDidMount() {
        this.refresh();
    }

    refresh() {
        this.apiService.get('getFormConfig')
            .map((res) => res.data || [])
            .subscribe((configForms) => {
                this.setState({ configForms });
            });
    }

    getIconStyleInput(iconStyle) {
        return (
            <ReactSelect
                name="icon-style"
                value={iconStyle}
                options={[
                    { value: 'circle', label: 'circle' },
                    { value: 'square', label: 'square' },
                    { value: 'triangle', label: 'triangle' }
                ]}
                onChange={val => {
                    this.set('iconStyle', val);
                }}
            />
        );
    };

    getEditInput(onEdit: any) {
        return (
            <ReactSelect
                name="enable-edit"
                value={onEdit}
                options={[
                    { value: true, label: 'true' },
                    { value: false, label: 'false' }
                ]}
                onChange={val => {
                    this.set('onEdit', val);
                }}
            />
        );
    };

    getAddInput(onAdd: any) {
        return (
            <ReactSelect
                name="enable-add"
                value={onAdd}
                options={[
                    { value: true, label: 'true' },
                    { value: false, label: 'false' }
                ]}
                onChange={val => {
                    this.set('onAdd', val);
                }}
            />
        );
    };

    getDeleteInput(onDelete: any) {
        return (
            <ReactSelect
                name="enable-delete"
                value={onDelete}
                options={[
                    { value: true, label: 'true' },
                    { value: false, label: 'false' }
                ]}
                onChange={val => {
                    this.set('onDelete', val);
                }}
            />
        );
    };

    getEnableClipboardInput(enableClipboard: any) {
        return (
            <ReactSelect
                name="enable-clipboard"
                value={enableClipboard}
                options={[
                    { value: true, label: 'true' },
                    { value: false, label: 'false' }
                ]}
                onChange={val => {
                    this.set('enableClipboard', val);
                }}
            />
        );
    };

    getObjectSizeInput(displayObjectSize: any) {
        return (
            <ReactSelect
                name="display-object-size"
                value={displayObjectSize}
                options={[
                    { value: true, label: 'true' },
                    { value: false, label: 'false' }
                ]}
                onChange={val => {
                    this.set('displayObjectSize', val);
                }}
            />
        );
    };

    getDataTypesInput(displayDataTypes: any) {
        return (
            <ReactSelect
                name="display-data-types"
                value={displayDataTypes}
                options={[
                    { value: true, label: 'true' },
                    { value: false, label: 'false' }
                ]}
                onChange={val => {
                    this.set('displayDataTypes', val);
                }}
            />
        );
    };

    getCollapsedStringsInput(collapseStringsAfter: any) {
        return (
            <ReactSelect
                name="collapse-strings"
                value={collapseStringsAfter}
                options={[
                    { value: false, label: 'false' },
                    { value: 5, label: 5 },
                    { value: 10, label: 10 },
                    { value: 15, label: 15 },
                    { value: 20, label: 20 }
                ]}
                onChange={val => {
                    this.set('collapseStringsAfter', val);
                }}
            />
        );
    };

    getCollapsedInput(collapsed: any) {
        return (
            <ReactSelect
                name="collapsed"
                value={collapsed}
                options={[
                    { value: true, label: 'true' },
                    { value: false, label: 'false' },
                    { value: 1, label: 1 },
                    { value: 2, label: 2 }
                ]}
                onChange={val => {
                    this.set('collapsed', val);
                }}
            />
        );
    };

    getIndentWidthInput(indentWidth: any) {
        return (
            <ReactSelect
                name="indent-width"
                value={indentWidth}
                options={[
                    { value: 0, label: 0 },
                    { value: 1, label: 1 },
                    { value: 2, label: 2 },
                    { value: 3, label: 3 },
                    { value: 4, label: 4 },
                    { value: 5, label: 5 },
                    { value: 6, label: 6 },
                    { value: 7, label: 7 },
                    { value: 8, label: 8 },
                    { value: 9, label: 9 },
                    { value: 10, label: 10 }
                ]}
                onChange={val => {
                    this.set('indentWidth', val);
                }}
            />
        );
    };

    getThemeInput(theme: any) {
        return (
            <ReactSelect
                name="theme-select"
                value={theme}
                options={[
                    { value: 'apathy', label: 'apathy' },
                    { value: 'apathy:inverted', label: 'apathy:inverted' },
                    { value: 'ashes', label: 'ashes' },
                    { value: 'bespin', label: 'bespin' },
                    { value: 'brewer', label: 'brewer' },
                    { value: 'bright:inverted', label: 'bright:inverted' },
                    { value: 'bright', label: 'bright' },
                    { value: 'chalk', label: 'chalk' },
                    { value: 'codeschool', label: 'codeschool' },
                    { value: 'colors', label: 'colors' },
                    { value: 'eighties', label: 'eighties' },
                    { value: 'embers', label: 'embers' },
                    { value: 'flat', label: 'flat' },
                    { value: 'google', label: 'google' },
                    { value: 'grayscale', label: 'grayscale' },
                    {
                        value: 'grayscale:inverted',
                        label: 'grayscale:inverted'
                    },
                    { value: 'greenscreen', label: 'greenscreen' },
                    { value: 'harmonic', label: 'harmonic' },
                    { value: 'hopscotch', label: 'hopscotch' },
                    { value: 'isotope', label: 'isotope' },
                    { value: 'marrakesh', label: 'marrakesh' },
                    { value: 'mocha', label: 'mocha' },
                    { value: 'monokai', label: 'monokai' },
                    { value: 'ocean', label: 'ocean' },
                    { value: 'paraiso', label: 'paraiso' },
                    { value: 'pop', label: 'pop' },
                    { value: 'railscasts', label: 'railscasts' },
                    { value: 'rjv-default', label: 'rjv-default' },
                    { value: 'shapeshifter', label: 'shapeshifter' },
                    {
                        value: 'shapeshifter:inverted',
                        label: 'shapeshifter:inverted'
                    },
                    { value: 'solarized', label: 'solarized' },
                    { value: 'summerfruit', label: 'summerfruit' },
                    {
                        value: 'summerfruit:inverted',
                        label: 'summerfruit:inverted'
                    },
                    { value: 'threezerotwofour', label: 'threezerotwofour' },
                    { value: 'tomorrow', label: 'tomorrow' },
                    { value: 'tube', label: 'tube' },
                    { value: 'twilight', label: 'twilight' }
                ]}
                onChange={val => {
                    this.set('theme', val);
                }}
            />
        );
    };

    set = (field, value) => {
        let state = {};
        state[field] = value.value;
        this.setState(state);
    };

    render() {
        const _style = {
            padding: '10px',
            borderRadius: '3px',
            margin: '10px 0px'
        };

        return (
            <div className={style.container}>
                <div className={style.scrollDesign}>
                    <ReactJson src={this.state.configForms}
                               name={false}
                               collapsed={true}
                               style={_style}
                               theme={this.state.theme}
                               collapseStringsAfterLength={this.state.collapseStringsAfter}
                               onEdit={(e) => {
                                           console.log(e);
                                           this.setState({ src: e.updated_src });
                                       }
                               }
                               onDelete={(e) => {
                                           console.log(e);
                                           this.setState({ src: e.updated_src });
                                       }
                               }
                               onAdd={(e)=> {
                                           console.log(e);
                                           this.setState({ src: e.updated_src });
                                       }
                               }
                               displayObjectSize={this.state.displayObjectSize}
                               enableClipboard={this.state.enableClipboard}
                               indentWidth={this.state.indentWidth}
                               displayDataTypes={this.state.displayDataTypes}
                               iconStyle={this.state.iconStyle}
                    />
                </div>
            </div>
        )
    }
}