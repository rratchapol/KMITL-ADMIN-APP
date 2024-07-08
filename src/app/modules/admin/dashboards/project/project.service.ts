import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { BehaviorSubject, Observable, of, switchMap, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ProjectService
{
    private _data: BehaviorSubject<any> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for data
     */
    get data$(): Observable<any>
    {
        return this._data.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get data
     */
    getData(): Observable<any>
    {
        return this._httpClient.get('api/dashboards/project').pipe(
            tap((response: any) =>
            {
                this._data.next(response);
            }),
        );
    }
    getFarmmerById(id: string): Observable<any>
    {
        return this._httpClient.get(environment.baseURL + '/api/frammer/' + id).pipe(
            tap((response: any) =>
            {
                this._data.next(response);
            }),
        );
    }

        getAPIFarmmer(): Observable<any> {
        return this._httpClient
            .post('https://canegrow.com:28099/api/profile_farmer', {
                FacID: '1',
                page: '1',
                skip: '1',
                take: '10',
            })
            .pipe(
                tap((response: any) =>
                {
                    this._data.next(response);
                }),
            );
    }
}
