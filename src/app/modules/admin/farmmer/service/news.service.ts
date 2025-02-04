import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { param } from 'jquery';
import { Observable, map, of, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NewsService {
    // delete(id: any) {
    //     throw new Error('Method not implemented.');
    // }

    constructor(private _httpClient: HttpClient) { }

    getPage(dataTablesParameters: any): Observable<any> {
        return this._httpClient
            // .post('https://asha-tech.co.th/trr-api/public/api/frammer_page', dataTablesParameters)
            .post(environment.baseURL + '/api/getlocations', dataTablesParameters)
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }

    getPagecane(dataTablesParameters: any): Observable<any> {
        return this._httpClient
            // .post('https://asha-tech.co.th/trr-api/public/api/factoryactivity_page', dataTablesParameters)
            .post('http://192.168.1.162/trr-api/public/api/factoryactivity_page', dataTablesParameters)
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }

    Savedata(formData: FormData): Observable<any> {
        return this._httpClient
            .post(environment.baseURL + '/api/locations', formData)
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
    getAPIFarmmer(search: any, page: number): Observable<any> {
        return this._httpClient
            .post('https://canegrow.com:28099/api/profile_farmer', {
                FacID: '0',
                page: page.toString(),
                skip: '1',
                take: '10',
                search: search,
            })
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }

    getEvents(quatas: any): Observable<any> {
        return this._httpClient
            .post(environment.baseURL + '/api/frammer_events', {
                year: new Date().getFullYear(),
                quotas: quatas,
            })
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }

    groupyear(id: any): Observable<any> {
        return this._httpClient
            .post('https://canegrow.com:28099/api/group_years', {
                FacID: 1,
                QuotaID: id,
            })
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }

    getplotframmer(id: any): Observable<any> {
        const currentYear = new Date().getFullYear();
        return this._httpClient
            .post(environment.baseURL + '/api/get_frammer_area', {
                frammer_id: id,
                year: currentYear
            })
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }

    getsugarcane(id: number, begin_date: any, end_date: any, sugartype: any, search: any, plot: any, activity: any, page: number): Observable<any> {
        // if(activity == null){
        //     activity = "";
        // }
        return this._httpClient
            // .post('https://asha-tech.co.th/trr-api/public/api/factoryactivity_page',{
            .post(environment.baseURL + '/api/factoryactivity_page', {
                columns: [],
                length: 10,
                order: [
                    {
                        column: 0,
                        dir: "asc"
                    }
                ],
                search: {
                    value: search
                },
                start: page,
                start_date: begin_date,
                end_date: end_date,
                activitytype: activity,
                frammer_id: id,
                plotsugar_id: plot,
                sugartype: sugartype
            })
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }

    myplot(id: number, begin_date: any, end_date: any): Observable<any> {
        return this._httpClient
            // .post('https://asha-tech.co.th/trr-api/public/api/factoryactivity_page',{
            .post(environment.baseURL + '/api/factoryactivity_page', {
                columns: [],
                length: 10,
                order: [
                    {
                        column: 1,
                        dir: "asc"
                    }
                ],
                search: {
                    value: ""
                },
                start: 0,
                // activitytype: 0,
                start_date: begin_date,
                end_date: end_date,
                // start_date: "2023-01-01",
                // end_date: "2024-12-31",
                frammer_id: id,
                // sugartype: ""
            })
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }

    getAPICCS(id: number, begin_date: any, end_date: any): Observable<any> {
        return this._httpClient
            .post('https://canegrow.com:28099/api/ccs', {
                factory_id: 1,
                quota_id: id,
                begin_date: begin_date,
                end_date: end_date,
                // begin_date: '2023-12-01',
                // end_date: '2023-12-31',
            })
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }

    profile(id: number, begin_date: any, end_date: any): Observable<any> {
        return this._httpClient
            .post('https://canegrow.com:28099/api/profile', {
                FacID: 1,
                QuotaNO: id,
                Begin_year: begin_date,
                End_year: end_date,
                // Begin_year: 5758,
                // End_year: 6768,
            })
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }

    profiles(id: number): Observable<any> {
        return this._httpClient
            .post('https://canegrow.com:28099/api/profile', {
                FacID: 1,
                QuotaNO: id,
                Begin_year: 5758,
                End_year: 6768,
            })
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }



    plot(id: number, begin_date: any): Observable<any> {
        return this._httpClient
            .post('https://canegrow.com:28099/api/plot_user', {
                FacID: 1,
                QuotaNO: id,
                Year: begin_date,
            })
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }

    getById(Id: any): Observable<any> {
        return this._httpClient
            .get(environment.baseURL + `/api/locations/${Id}`)
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    // update(Id: any, name: any): Observable<any> {
    //     return this._httpClient
    //         .put(environment.baseURL + `/api/locations/${Id}`, name: name)
    //         .pipe();
    // }


    update(name: any,Id:any): Observable<any> {
        console.log("ssssss");
        return this._httpClient
            .put(environment.baseURL + `/api/locations/${Id}`, {
                name: name,

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
            .delete(environment.baseURL + `/api/locations/${Id}`)
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

    getByFacId(): Observable<any> {
        const Id = {
            factory_id: 1
        }
        return this._httpClient
            .post(environment.baseURL + '/api/get_company_byfactory', Id)
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }


    create(formData: FormData): Observable<any> {
        return this._httpClient
            .put(environment.baseURL + '/api/company/1', formData)
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }

    dashboardactivitytype(Id: any): Observable<any> {

        return this._httpClient
            .post(environment.baseURL + '/api/get_byactivitytype', {
                frammer_id: Id
            })
            .pipe();
    }

    dashboardincomededuct(Id: any): Observable<any> {

        return this._httpClient
            .post(environment.baseURL + '/api/get_incomededuct', {
                frammer_id: Id
            })
            .pipe();
    }

    dashboardweekly(Id: any): Observable<any> {

        return this._httpClient
            .post(environment.baseURL + '/api/get_byweekly', {
                frammer_id: Id
            })
            .pipe();
    }

    receive(Id: any): Observable<any> {
        return this._httpClient
            .post('https://canegrow.com:28099/api/queue_quota', {
                FacID: 1,
                QuotaID: Id,
                Begin_date: '12/01/2023',
                End_date: '03/31/2024',
            })
            .pipe();
    }

    image(formData: FormData): Observable<any> {
        return this._httpClient
            .post(environment.baseURL + '/api/upload_images', formData)
            .pipe(
                switchMap((response: any) => {
                    return of(environment.baseURL + '/' + response.data);
                })
            );
    }
}
