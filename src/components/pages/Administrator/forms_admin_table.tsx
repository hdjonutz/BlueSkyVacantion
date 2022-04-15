import * as React from 'react';
import {ThemeProvider} from '@mui/material/styles';
import themeMeandro from '../../Layout/Theme';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import classNames from 'classnames';
import style from './admin.less';
import Layout from '../../AppView/layout-page';
import {Ids} from '../../../formsIds';
import {resolve} from 'inversify-react';
import {AuthorizedApiService} from '../../../services/authorized_api_service';
import {ApiService} from '../../../services/api_service';
import Table from '../../table/table';
import InputLabel from '@mui/material/InputLabel';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import {IRowAttendands} from '../../table/forms';
import {combineLatest, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

interface IFormsPageStates {
    formId:         number;
    configForms:    {[key: string]: IRowAttendands} | null;
    data:           Array<any> | null;
    boxIsOpen:      boolean;
}


export default class FormsPage extends React.Component<{}, IFormsPageStates> {

    @resolve(AuthorizedApiService)      private authorizedApiService: AuthorizedApiService;
    @resolve(ApiService)                private apiService: ApiService;

    constructor(props: any) {
        super(props);

        this.state = {
            formId:         1001,
            configForms:    null,
            data:           null,
            boxIsOpen:      false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    componentDidMount() {
        this.refresh();
    }

    refresh(only_data?: boolean, formId?: number) {
        const form = formId || this.state.formId;
        combineLatest(
            [only_data ? of(null) : this.apiService.get('getFormConfig').pipe(map((res) => res.data || [])),
            this.apiService.get('getFormData', {formid: form}).pipe(map((res) => res.data || []))],
        ).subscribe(([configForms, data]) => {
            this.setState({
                configForms: configForms || this.state.configForms,
                data: data,
                formId: form
            });
            console.log(data);
        });
    }

    handleChange (event: SelectChangeEvent<any>) {
        this.refresh(null as any, +event.target.value)
        // this.setState({formId: event.target.value});
    }

    handleClose() {
        this.setState({boxIsOpen: false});
    }

    handleOpen() {
        this.setState({boxIsOpen: true});
    }

    render() {
        console.log(this.state.data, this.state.formId);
        return (
            <ThemeProvider theme={themeMeandro}>
                <Container component='main' maxWidth='xl' style={{display: 'flex', height: '100%'}}>
                    <CssBaseline />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <FormControl>
                            <InputLabel id='demo-controlled-open-select-label'>[TableId] Table name</InputLabel>
                            <Select
                                labelId='demo-controlled-open-select-label'
                                id='demo-controlled-open-select'
                                open={this.state.boxIsOpen}
                                value={this.state.formId}
                                label='Age'
                                onChange={this.handleChange}
                                onClose={this.handleClose}
                                onOpen={this.handleOpen}
                            >
                                <MenuItem value=''>
                                    <em>None</em>
                                </MenuItem>
                                {Object.keys(this.state.configForms || []).map((k) =>
                                    <MenuItem value={this.state.configForms[k].SRC.id}>
                                        [{this.state.configForms[k].SRC.id}]{this.state.configForms[k].TITEL_ANZEIGE}
                                    </MenuItem>)}
                            </Select>
                        </FormControl>
                        <br/>
                        <div className={classNames(style.container, style.column)}>
                            <div className={classNames(style.container, style.column)}>
                                <Layout footer={false}>
                                    <Table data={this.state.data}
                                           formId={this.state.formId.toString()}
                                           configForms={this.state.configForms}
                                           callback = {() => {
                                               const only_data = true;
                                               this.refresh(only_data);
                                           }}
                                    />
                                </Layout>
                            </div>
                        </div>
                    </Box>
                </Container>
            </ThemeProvider>
        )
    }
}
