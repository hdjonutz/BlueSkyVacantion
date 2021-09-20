import 'reflect-metadata';
import { Container } from 'inversify';
import {CounterService} from './CounterService';
import { fluentProvide } from 'inversify-binding-decorators';

let container = new Container();
container.bind(CounterService).toSelf().inSingletonScope();
export { container };

const provideSingleton = (identifier: any) => {
    return fluentProvide(identifier)
        .inSingletonScope()
        .done();
};
export { provideSingleton };


// const container = new Container();
// container.bind<ICounterService<Observable<string>>>("counterService").to(CounterService);
// const { lazyInject } = getDecorators(container);
// export {container};
// export {lazyInject};
