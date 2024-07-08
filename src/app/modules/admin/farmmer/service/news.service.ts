import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Observable, map, of, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NewsService {
    // delete(id: any) {
    //     throw new Error('Method not implemented.');
    // }

    constructor(private _httpClient: HttpClient) {}

    getPage(dataTablesParameters: any): Observable<any> {
        return this._httpClient
            .post('https://asha-tech.co.th/trr-api/public/api/frammer_page', dataTablesParameters)
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }

    Savedata(formData: FormData): Observable<any> {
        return this._httpClient
            .post(environment.baseURL + 'api/news', formData)
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

    getProvince(): Observable<any> {
        return this._httpClient
            .get(environment.baseURL + '/api/get_province')
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }
    getAPIFarmmer(): Observable<any> {
        return this._httpClient
            .post('https://canegrow.com:28099/api/profile_farmer', {
                FacID: '1',
                page: '1',
                skip: '1',
                take: '10',
                search: '', 
            })
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }
    getAPICCS(id: number): Observable<any> {
        return this._httpClient
            .post('https://canegrow.com:28099/api/ccs', {
                factory_id: 1,
                quota_id: id,
                begin_date: '2023-12-01',
                end_date: '2023-12-31',
            })
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }

    getById(Id: any): Observable<any> {
        return this._httpClient
            .get(environment.baseURL + `api/news/${Id}`)
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }

    update(Id: any, data: any): Observable<any> {
        return this._httpClient
            .post(environment.baseURL + `api/update_news`, data)
            .pipe();
    }

    // update(Id: any, data: FormData): Observable<any> {
    //     return this._httpClient
    //         .put(environment.baseURL + `api/customer/${Id}`, data)
    //         .pipe();
    // }

    delete(Id: any): Observable<any> {
        return this._httpClient
            .delete(environment.baseURL + `api/news/${Id}`)
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
