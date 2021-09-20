import 'reflect-metadata';
import { Container } from 'inversify';
import {CounterService} from './services/CounterService';

let container = new Container();
container.bind(CounterService).toSelf().inSingletonScope();
export { container };

// const container = new Container();
// container.bind<ICounterService<Observable<string>>>("counterService").to(CounterService);
// const { lazyInject } = getDecorators(container);
// export {container};
// export {lazyInject};
