import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Observable, map, of, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class JournalService {
    // delete(id: any) {
    //     throw new Error('Method not implemented.');
    // }

    constructor(private _httpClient: HttpClient) {}

    getPage(dataTablesParameters: any): Observable<any> {
        return this._httpClient
            .get(
                environment.baseURL + '/api/admin',
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
    //             'http://127.0.0.1:8000/api/categories_page',
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
                // no: "พัดลม",
                name: 'นาวี พาไว',
              },
              {
                // no: "พัดลม",
                name: 'กรุณา พาที',
              },
              {
                // no: "พัดลม",
                name: 'สมศรี จามาล',
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
            .post(environment.baseURL + '/api/journal', formData)
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }

    createtest(formData: FormData): Observable<any> {
        return this._httpClient
            .post('http://127.0.0.1:8000/api/categories', formData)
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }

    updatetest(formData: FormData,Id: any): Observable<any> {
        return this._httpClient
            .put(`http://127.0.0.1:8000/api/categories/${Id}`, formData)
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }

    getByIdtest(Id: any): Observable<any> {
        return this._httpClient
            .get(`http://127.0.0.1:8000/api/categories/${Id}`)
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    deletetest(Id: any): Observable<any> {
        return this._httpClient
            .delete(`http://127.0.0.1:8000/api/categories/${Id}`)
            .pipe(
                switchMap((response: any) => {
                    return of(response);
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
            .get(environment.baseURL + `/api/journal/${Id}`)
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }

    update(formData: FormData): Observable<any> {
        return this._httpClient
            .post(environment.baseURL + `/api/update_journal`, formData)
            .pipe();
    }

    // update(Id: any, data: FormData): Observable<any> {
    //     return this._httpClient
    //         .put(environment.baseURL + `api/customer/${Id}`, data)
    //         .pipe();
    // }

    delete(Id: any): Observable<any> {
        return this._httpClient
            .delete(environment.baseURL + `/api/journal/${Id}`)
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
