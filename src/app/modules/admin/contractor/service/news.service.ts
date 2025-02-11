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
            // .post('https://asha-tech.co.th/trr-api/public/api/contractor_page', dataTablesParameters)
            .get(environment.baseURL + '/api/tags', dataTablesParameters)
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }

    Savedata(formData: any): Observable<any> {
        return this._httpClient
            .post(environment.baseURL + '/api/tags', formData)
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }


    getcategories(): Observable<any> {
        const params = {
            status: null,
            draw: 1,
            columns: [],
            order: JSON.stringify([
                {
                    "column": 0,
                    "dir": "asc"
                }
            ]),
            start: 0,
            length: 10,
            search: JSON.stringify({
                "value": "",
                "regex": false
            })
        };
    
        return this._httpClient
            .get(environment.baseURL + '/api/categorie', { params })
            .pipe(
                switchMap((response: any) => {
                    console.log("categorie :::",response);
                    return of(response.data);
                    
                })
                
            );
    }
    

    getcategory(dataTablesParameters: any): Observable<any> {
        return this._httpClient
            // .post('https://asha-tech.co.th/trr-api/public/api/contractor_page', dataTablesParameters)
            .get(environment.baseURL + '/api/categories', dataTablesParameters)
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }

    updatedata(formData: any): Observable<any> {
        return this._httpClient
            .put(environment.baseURL + '/api/tags/' + formData.id, formData)
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
        console.log("ดูไอดี",Id);
        console.log('Base URL:', environment.baseURL);
        console.log('Full Delete URL:', environment.baseURL + `/api/tags/${Id}`);
        return this._httpClient
            .delete(environment.baseURL + `/api/tags/${Id}`)
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }

    getFeature(): Observable<any> {
        return this._httpClient
            .get(environment.baseURL + '/api/get_feature')
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }
    get_factory(): Observable<any> {
        return this._httpClient
            .get(environment.baseURL + '/api/get_factorie')
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
