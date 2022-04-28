import {Observable, ReplaySubject} from 'rxjs';
import {Logger, LogLevel} from '../util/logger';
import {injectable} from 'inversify';

// const logger = Logger.create('ContainerClient', LogLevel.Info);
//
//
// export class ContainerClient {
//
//     setProduct() {
//
//     }
//     getProduct() {
//
//     }
//
//     setFilter() {
//
//     }
//
//     getFilter(): Observable<any> {
//
//     }
// }
//
//
// @injectable()
// export class ContainerClientService {
//     private filtersObservable: ReplaySubject<ContainerClient> = new ReplaySubject<ContainerClient>(1);
//     public constructor() {}
//
//     setFilters() {
//
//     }
//
//     getFilters(): Observable<any> {
//         return this.filtersObservable();
//     }
// }
//
// // homePage
// /*  product selected = null
// *   Filter = null => all products
// * */
//
// // productPage
// /*  product != null
// *   Filter != null OR null
// * */
