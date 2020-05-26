// import {Inject, Injectable} from '@angular/core';
// import {HttpClient} from '@angular/common/http';
// import {Observable, throwError ,} from 'rxjs';
// import {catchError, map} from 'rxjs/operators';
// import {AppError} from '../common/app-error';
// import {NotFoundError} from '../common/not-found-error';
// import {BadInput} from '../common/bad-input';
// //TODO:have to refactor to fit all my services
// @Injectable({
//   providedIn: 'root'
// })
// export class DataService {
//
//   constructor(@Inject(String) private url: string,private http: HttpClient) {
//   }
//
//   getAll(){
//     return this.http.get(this.url).pipe(
//       map(data => {
//         return data;
//       }),
//
//       catchError((error:Response) => this.handleError(error)));
//   }
//
//   create(resource){
//     return this.http.post(this.url,resource)
//       .pipe(
//         map(data => {
//           return data;
//         }),
//         catchError((error:Response) => this.handleError(error)));
//   }
//
//   update(resource){
//     return this.http.patch(this.url + '/' + resource.id,JSON.stringify({isRead:true}))
//       .pipe(
//         map(data => {
//           return data;
//         }),
//         catchError((error:Response) => this.handleError(error)));
//   }
//
//   delete(id){
//     return this.http.delete(this.url + '/' + id)
//       .pipe(
//         map(data => {
//           return data;
//         }),
//         catchError( (error:Response) => this.handleError(error)));
//   }
//
//   private handleError(error:Response){
//     if(error.status === 404)
//       return Observable.throw(new NotFoundError(error.json()));
//     if(error.status === 400)
//       return Observable.throw(new BadInput(error.json()));
//
//     return Observable.throw(new AppError(error.json()));
//   }
// }
