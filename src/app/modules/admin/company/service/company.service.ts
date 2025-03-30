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
            .post(
                environment.baseURL + '/api/getcheckpoduct',
                dataTablesParameters
            )
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }

    create(formData: FormData): Observable<any> {
        return this._httpClient
            .post(environment.baseURL + '/api/checkpoduct', formData)
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
            .get(environment.baseURL + `/api/checkpoduct/${Id}`)
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    update(word: any,Id:any): Observable<any> {
        console.log("ssssss");
        return this._httpClient
            .put(environment.baseURL + `/api/checkpoduct/${Id}`, {
                word: word,

            })
            .pipe();
    }

    // update(Id: any, data: FormData): Observable<any> {
    //     return this._httpClient
    //         .put(environment.baseURL + `api/customer/${Id}`, data)
    //         .pipe();
    // }

    delete(Id: any): Observable<any> {
        return this._httpClient
            .delete(environment.baseURL + `/api/checkpoduct/${Id}`)
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


    getPagetest(dataTablesParameters: any): Observable<any> {
        // Mock data for testing
        const mockResponse = {
          data: [
            {
                name: "นที พานที",
                section: 'โดนเบี้ยวนัด',
                detail: 'โดนเบี้ยวนัดจากนาย กวี ปีแสง สั่งเเล้วตกลงเเล้ว แต่ไม่มาส่ง',
              },
              {
                name: "นารา พาไป",
                section: 'คุกคาม',
                detail: 'โดนคุกคามจากนาย นที พานที ในเเชท',
              },
          ],
          totalRecords: 3,
          currentPage: dataTablesParameters.page || 1,
          perPage: dataTablesParameters.perPage || 10,
        };
    
        return of(mockResponse); // Return mocked data as an Observable
      }
}
