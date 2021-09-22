import 'reflect-metadata';
import { Container, interfaces } from 'inversify';
import { fluentProvide } from 'inversify-binding-decorators';

import {CounterService} from './CounterService';
import {AuthenticationService} from "./authentication_service";
import {VersionService} from "./version_service";
import {HttpClient} from "./http_client";
import {SnackbarService} from "./snackbar_service";
import {LocalConfigurationService} from "./local_configuration_service";
import {ApiService} from "./api_service";
import getDecorators from "inversify-inject-decorators";

const container: Container = new Container();

    container.bind(CounterService).toSelf().inSingletonScope();

    container.bind(AuthenticationService).toSelf().inSingletonScope();

    container.bind(HttpClient).toSelf().inSingletonScope();
    container.bind(ApiService).toSelf().inSingletonScope();
    container.bind(SnackbarService).toSelf().inSingletonScope();
    container.bind(LocalConfigurationService).toSelf().inSingletonScope();


    container.bind(VersionService).to(VersionService);

export { container };

const provideSingleton = function <T>(identifier: interfaces.ServiceIdentifier<T>) {
    return fluentProvide(identifier)
        .inSingletonScope()
        .done();
};

export { provideSingleton };

// test jaloo to update

// https://tsoa-community.github.io/docs/di.html#inversifyjs


const { lazyInject } = getDecorators(container, false);
export { lazyInject };