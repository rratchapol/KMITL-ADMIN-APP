import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataTablesResponse } from 'app/shared/datatable.types';
import { environment } from 'environments/environment.development';
import { Observable, map, of, switchMap } from 'rxjs';
const token = localStorage.getItem('accessToken') || null;
@Injectable({
    providedIn: 'root',
})
export class SupplierService {
    // delete(id: any) {
    //     throw new Error('Method not implemented.');
    // }

    constructor(private _httpClient: HttpClient) {}
    httpOptionsFormdata = {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
    };
    getPage(dataTablesParameters: any): Observable<DataTablesResponse> {
        return this._httpClient
            .post(
                environment.baseURL + '/api/supplier_page',
                dataTablesParameters,
                this.httpOptionsFormdata
            )
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }

    Savedata(formData: FormData): Observable<any> {
        return this._httpClient
            .post(environment.baseURL + '/api/supplier', formData)
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }
    Updatedata(id: any, formData: FormData): Observable<any> {
        return this._httpClient
            .put(environment.baseURL + `/api/supplier/${id}`, formData)
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
            .get(environment.baseURL + `/api/supplier/${Id}`)
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }

    update(Id: any, data: any): Observable<any> {
        return this._httpClient
            .put(environment.baseURL + `api/supplier`, data)
            .pipe();
    }

    // update(Id: any, data: FormData): Observable<any> {
    //     return this._httpClient
    //         .put(environment.baseURL + `api/customer/${Id}`, data)
    //         .pipe();
    // }

    delete(Id: any): Observable<any> {
        return this._httpClient
            .delete(environment.baseURL + `/api/supplier/${Id}`)
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
