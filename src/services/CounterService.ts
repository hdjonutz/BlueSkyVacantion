import 'reflect-metadata';
import { injectable } from 'inversify';
import {Observable} from 'rxjs';

@injectable()
export class CounterService {
    public count: number = 0;
    public increment(): void {
        this.count++;
    }
    getData(): Observable<string> {
        return Observable.of('test text Observable');
    }
}