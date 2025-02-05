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
            .post(environment.baseURL + '/api/product', dataTablesParameters)
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }

    getPages(dataTablesParameters: any): Observable<any> {
        return this._httpClient
            .post(environment.baseURL + '/api/product', dataTablesParameters)
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }

    // getPagetest(dataTablesParameters: any): Observable<any> {
    //     return this._httpClient
    //         .post('http://127.0.0.1:8000/api/products_page', dataTablesParameters)
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
                product_name: 'Product A',
                item_type: 'Type 1',
                item_category: 'Category 1',
                product_qty: 50,
                product_price: 100,
                date_exp: '2025-12-31',
              },
              {
                No: 2,
                product_name: 'Product B',
                item_type: 'Type 2',
                item_category: 'Category 2',
                product_qty: 30,
                product_price: 200,
                date_exp: '2025-11-30',
              },
              {
                No: 3,
                product_name: 'Product C',
                item_type: 'Type 3',
                item_category: 'Category 3',
                product_qty: 20,
                product_price: 300,
                date_exp: '2025-10-31',
              },
          ],
          totalRecords: 3,
          currentPage: dataTablesParameters.page || 1,
          perPage: dataTablesParameters.perPage || 10,
        };
    
        return of(mockResponse); // Return mocked data as an Observable
      }

      getPagetests(dataTablesParameters: any): Observable<any> {
        // Mock data for testing
        const mockResponse = {
          data: [
            {
                No: 1,
                product_name: 'ปืน',
                item_type: 'Type 1',
                item_category: 'Category 1',
                product_qty: 50,
                product_price: 100,
                date_exp: '2025-12-31',
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
            .post(environment.baseURL + '/api/news', formData)
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
            .get(environment.baseURL + `/api/product/${Id}`)
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    updates(formData: FormData): Observable<any> {
        return this._httpClient
            .put(environment.baseURL + `/api/products/`, formData)
            .pipe();
    }

    update(form: any): Observable<any> {
        console.log("ssssss", form);
        console.log("Form data before request:", form);
        return this._httpClient
            .put(environment.baseURL + `/api/product/${form.id}`, {
                product_name: form.product_name,
                product_images: form.product_images,
                product_qty: form.product_qty,
                product_price: form.product_price,
                product_description: form.product_description,
                product_category: form.product_category,
                product_type: form.product_type,
                seller_id: form.seller_id,
                date_exp: form.date_exp,
                product_location: form.product_location,
                product_condition: form.product_condition,
                product_defect: form.product_defect,
                product_years: form.product_years,
                tag: form.tag,
                status: form.status,

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
            .delete(environment.baseURL + `/api/product/${Id}`)
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
