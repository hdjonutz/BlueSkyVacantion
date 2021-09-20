import 'reflect-metadata';
import { Container } from 'inversify';
import {CounterService, ICounterService} from './services/CounterService';
import { CachedWeatherService } from './services/CachedWeatherService';
import getDecorators from "inversify-inject-decorators";
import {Observable} from "rxjs/dist/types";

let container = new Container();
container.bind(CounterService).toSelf().inSingletonScope();
// container.bind(CachedWeatherService).toSelf().inSingletonScope();
export { container };

// export const container = new Container();
// container.bind<ICounterService<Observable<string>>>("counterService").to(CounterService);
//
// const { lazyInject } = getDecorators(container);
// export { lazyInject };