import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Observable, map, of, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class FaqService {
    // delete(id: any) {
    //     throw new Error('Method not implemented.');
    // }

    constructor(private _httpClient: HttpClient) {}

    getPage(dataTablesParameters: any): Observable<any> {
        return this._httpClient
            .get(
                environment.baseURL + '/api/customer',
                dataTablesParameters
            )
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }

    
    // getPagetest(dataTablesParameters: any): Observable<any> {
    //     return this._httpClient
    //         .post(
    //             'http://127.0.0.1:8000/api/users_page',
    //             dataTablesParameters
    //         )
    //         .pipe(
    //             switchMap((response: any) => {
    //                 return of(response.data);
    //             })
    //         );
    // }

    getPagetest(dataTablesParameters: any): Observable<any> {
        // Mock data for testing
        const mockResponse = {
          data: [
            {
              No: 1,
              name: 'John Doe',
              email: 'john.doe@example.com',
              mobile: '0812345678',
              faculty: 'Engineering',
              department: 'Computer Science',
              class_year: '3',
            },
            {
              No: 2,
              name: 'Jane Smith',
              email: 'jane.smith@example.com',
              mobile: '0898765432',
              faculty: 'Business',
              department: 'Marketing',
              class_year: '4',
            },
            {
              No: 3,
              name: 'Alan Turing',
              email: 'alan.turing@example.com',
              mobile: '0823456789',
              faculty: 'Science',
              department: 'Mathematics',
              class_year: '2',
            },
          ],
          totalRecords: 3,
          currentPage: dataTablesParameters.page || 1,
          perPage: dataTablesParameters.perPage || 10,
        };
    
        return of(mockResponse); // Return mocked data as an Observable
      }
    

    create(formData: FormData): Observable<any> {
        return this._httpClient
            .post(environment.baseURL + '/api/faq', formData)
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }

    getPermission(): Observable<any> {
        return this._httpClient
            .get(environment.baseURL + 'api/get_permission')
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }
    getById(Id: any): Observable<any> {
        return this._httpClient
            .get(environment.baseURL + `/api/faq/${Id}`)
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }

    update(formData: FormData): Observable<any> {
        return this._httpClient
            .post(environment.baseURL + `/api/update_faq`, formData)
            .pipe();
    }

    // update(Id: any, data: FormData): Observable<any> {
    //     return this._httpClient
    //         .put(environment.baseURL + `api/customer/${Id}`, data)
    //         .pipe();
    // }

    delete(Id: any): Observable<any> {
        return this._httpClient
            .delete(environment.baseURL + `/api/faq/${Id}`)
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }
    // getById(Id: any): Observable<any> {
    //   return this._httpClient
    //   .get<any>(environment.baseURL + '/api/news/' + Id)
    //   .pipe(
    //   map((resp: any) => {
    //   return resp.data;
    //   })
    //   );
    //   }
}
