import {
    HttpClient,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpHeaders,
    HttpInterceptor,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
    BehaviorSubject,
    filter,
    map,
    Observable,
    of,
    switchMap,
    take,
    tap,
    throwError,
} from 'rxjs';
import {
    AssetItem,
    Store,
    AssetType,
    Chat,
    StoreType,
    AssetSize,
    Supplier,
    Division,
} from './menu.types';
import { environment } from 'environments/environment';
import { AssetCategory } from 'app/shared/asset-category';
import { DataTablesResponse } from 'app/shared/datatable.types';
// import { UserDetail } from '../user/user.types';
const token = localStorage.getItem('accessToken') || null;
@Injectable({
    providedIn: 'root',
})
export class MenuService {
    // Private
    private _product: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _products: BehaviorSubject<any[] | null> = new BehaviorSubject(
        null
    );
    private _chat: BehaviorSubject<Chat> = new BehaviorSubject(null);
    private _chats: BehaviorSubject<Chat[]> = new BehaviorSubject(null);
    private _asset_types: BehaviorSubject<AssetType[] | null> =
        new BehaviorSubject(null);
    // private _suppliers: BehaviorSubject<UserDetail[] | null> = new BehaviorSubject(null);
    // private _two_approvers: BehaviorSubject<UserDetail[] | null> = new BehaviorSubject(null);
    private _store_types: BehaviorSubject<StoreType[] | null> =
        new BehaviorSubject(null);
    private _stores: BehaviorSubject<Store[] | null> = new BehaviorSubject(
        null
    );
    private _seasons: BehaviorSubject<any[] | null> = new BehaviorSubject(null);
    private _asset_sizes: BehaviorSubject<any[] | null> = new BehaviorSubject(
        null
    );
    private _divisions: BehaviorSubject<any[] | null> = new BehaviorSubject(
        null
    );
    private _materials: BehaviorSubject<any[] | null> = new BehaviorSubject(
        null
    );
    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) { }

    httpOptionsFormdata = {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
    };

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for chat
     */
    get chat$(): Observable<Chat> {
        return this._chat.asObservable();
    }

    /**
     * Getter for product
     */
    get product$(): Observable<any> {
        return this._product.asObservable();
    }

    /**
     * Getter for products
     */
    get products$(): Observable<any[]> {
        return this._products.asObservable();
    }

    /**
     * Getter for chats
     */
    get chats$(): Observable<Chat[]> {
        return this._chats.asObservable();
    }

    /**
     * Getter for tags
     */
    // get suppliers$(): Observable<UserDetail[]> {
    //     return this._suppliers.asObservable();
    // }

    // /**
    //     * Getter for tags
    //     */
    // get two_approvers$(): Observable<UserDetail[]> {
    //     return this._two_approvers.asObservable();
    // }

    /**
     * Getter for asset type
     */
    get asset_types$(): Observable<AssetType[]> {
        return this._asset_types.asObservable();
    }

    /**
     * Getter for store type
     */
    get store_types$(): Observable<StoreType[]> {
        return this._store_types.asObservable();
    }

    /**
     * Getter for store type
     */
    get stores$(): Observable<Store[]> {
        return this._stores.asObservable();
    }

    /**
     * Getter for season
     */
    get seasons$(): Observable<any[]> {
        return this._seasons.asObservable();
    }

    /**
     * Getter for division
     */
    get divisions$(): Observable<any[]> {
        return this._divisions.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get chats
     */
    getChat(id: string): Observable<any> {
        return this._httpClient
            .get<Chat>('api/apps/chat/chat', { params: { id } })
            .pipe(
                map((chat) => {
                    // Update the chat
                    this._chat.next(chat);

                    // Return the chat
                    return chat;
                }),
                switchMap((chat) => {
                    if (!chat) {
                        return throwError(
                            'Could not found chat with id of ' + id + '!'
                        );
                    }

                    return of(chat);
                })
            );
    }

    /**
     * Get chat
     *
     * @param id
     */
    getChatById(id: string): Observable<any> {
        return this._httpClient
            .get<Chat>('api/apps/chat/chat', { params: { id } })
            .pipe(
                map((chat) => {
                    // Update the chat
                    this._chat.next(chat);

                    // Return the chat
                    return chat;
                }),
                switchMap((chat) => {
                    if (!chat) {
                        return throwError(
                            'Could not found chat with id of ' + id + '!'
                        );
                    }

                    return of(chat);
                })
            );
    }

    /**
     * Get comment
     */

    getComments(assetId: any): Observable<any[]> {
        return this._httpClient
            .post<any[]>(
                environment.API_URL + 'api/assets/get_asset_by_brief',
                {
                    brief_id: assetId,
                },
                this.httpOptionsFormdata
            )
            .pipe(
                take(1),
                map((products) => {
                    return products;
                }),
                switchMap((product) => {
                    if (!product) {
                        return throwError(
                            'Could not found product with id of !'
                        );
                    }

                    return of(product);
                })
            );
    }

    /**
     * Get products
     *
     *
     * @param page
     * @param size
     * @param sort
     * @param order
     * @param search
     */

    /**
     * Get product by id
     */
    getProductById(id: string): Observable<any> {
        // this.getProducts();
        return this._httpClient
            .get<any>(environment.API_URL + 'api/briefs/' + id, {
                headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
                params: {
                    'populate[0]': 'translation_supplier_id',
                    'populate[1]': 'artwork_supplier_id',
                    'populate[2]': 'production_supplier_id',
                    'populate[3]': 'assets.asset_artworks.artwork_file',
                    'populate[4]': 'translation_file',
                    'populate[5]': 'brief_file',
                    'populate[6]': 'assets.item',
                    'populate[7]': 'asset_type.asset_sizes',
                    'populate[8]': 'brief_translation_files.file',
                    'populate[9]': 'assets.asset_comments.user_id',
                    'populate[10]': 'assets.asset_comments.file',
                    'populate[11]': 'assets.division',
                    'populate[12]': 'assets.store_type',
                    'populate[13]': 'assets.asset_size',
                },
            })
            .pipe(
                take(1),
                map((products) => {
                    // Find the product
                    // const product = this._products_prod/.;
                    // products[0].data;
                    // var thumbnail = "";
                    // var images = [];

                    // thumbnail = 'assets/images/artworks/artwork-1.png';
                    // images = [
                    //     'assets/images/artworks/artwork-1.png',
                    //     'assets/images/artworks/artwork-1.png',
                    //     'assets/images/artworks/artwork-1.png'
                    // ];

                    // products.data.attributes.thumbnail = thumbnail;
                    // products.data.attributes.images = images;

                    // // // Update the product
                    this._product.next(products.data);

                    // // Return the product
                    return products.data;
                }),
                switchMap((product) => {
                    // if (!product) {
                    //     return throwError('Could not found product with id of ' + id + '!');
                    // }

                    return of(product);
                })
            );
    }

    /**
     * Get product by id
     */

    comment(data: any): Observable<any> {
        return this._httpClient
            .post(
                environment.API_URL + 'api/asset-comments',
                data,
                this.httpOptionsFormdata
            )
            .pipe(
                switchMap((response: any) => {
                    // Return a new observable with the response
                    return of(response);
                })
            );
    }

    uploadFile(item: FormData): Observable<any> {
        return this._httpClient
            .post<any>(
                environment.API_URL + 'api/upload',
                item,
                this.httpOptionsFormdata
            )
            .pipe(catchError(this.handlerError));
    }

    getLastNumber(req: any): Observable<any> {
        console.log(req);
        return this._httpClient.post<any>(
            environment.API_URL + 'api/assets/get_last_number',
            req,
            this.httpOptionsFormdata
        );
    }

    getAssetItems(req: any): Observable<AssetItem> {
        // return this._httpClient.get<AssetItem>(environment.API_URL + 'api/items?filters[size_for_ec][$eq]=' + req.size_for_ec + '&filters[store_type][$eq]=' + req.store_type + '&filters[season][$eq]=' + req.season + '&filters[division][$eq]=' + req.division + '&pagination[limit]=1').pipe(
        return this._httpClient
            .get<AssetItem>(
                environment.API_URL +
                'api/items?filters[season][$eq]=' +
                req.season +
                '&filters[division][$eq]=' +
                req.division +
                '&pagination[limit]=1',
                this.httpOptionsFormdata
            )
            .pipe(
                take(1),
                map((products) => {
                    return products;
                }),
                switchMap((product) => {
                    if (!product) {
                        return throwError(
                            'Could not found product with id of !'
                        );
                    }

                    return of(product);
                })
            );
    }

    getAssetCategory(): Observable<AssetCategory[]> {
        return this._httpClient
            .get<AssetCategory[]>(
                environment.API_URL +
                'api/asset-categories?populate=*&pagination[withCount]=false',
                this.httpOptionsFormdata
            )
            .pipe();
    }

    handlerError(error): Observable<never> {
        let errorMessage = 'Error unknown';
        if (error) {
            errorMessage = `${error.error.message}`;
        }
        // window.alert(errorMessage);
        return throwError(errorMessage);
    }

    setSchedule(data: any): Observable<any> {
        return this._httpClient.post<any>(
            environment.API_URL + 'api/set-job-schedule',
            data,
            { headers: this.httpOptionsFormdata.headers }
        );
    }

    ///create branch////
    newBank(bank: any): Observable<any> {
        // Throw error, if the user is already logged in
        //  if (this._authenticated) {
        //     return throwError('User is already logged in.');
        // }
        return this._httpClient
            .post(
                environment.API_URL + 'api/bank',
                bank,
                this.httpOptionsFormdata
            )
            .pipe(
                switchMap((response: any) => {
                    // Return a new observable with the response
                    return of(response);
                })
            );
    }

    getAll(dataTablesParameters: any): Observable<any> {
        return this._httpClient
            .post<any>(
                `${environment.API_URL}api/branch_page`,
                dataTablesParameters,
                this.httpOptionsFormdata
            )
            .pipe(
                map((resp: any) => {
                    return resp;
                })
            );
    }

    // get Users //
    getUsers(): Observable<any[]> {
        return this._httpClient
            .get<any[]>(environment.API_URL + 'api/get_user')
            .pipe(
                tap((meterial) => {
                    this._materials.next(meterial);
                })
            );
    }

    // get Branch //
    getMenu(): Observable<any> {
        return this._httpClient.get<any>(environment.API_URL + 'api/get_main_menu');
    }

    getBankTranById(bankId: string): Observable<any> {
        return this._httpClient.get<any>(
            environment.API_URL + 'api/bank_trans/' + bankId
        );
    }

    //   * get branch by id
    getBankById(bankId: string): Observable<any> {
        return this._httpClient.get<any>(
            environment.API_URL + 'api/bank/' + bankId
        );
    }

    //   * get branch by id
    getUserById(Id: string): Observable<any> {
        return this._httpClient.get<any>(
            environment.API_URL + 'api/user/' + Id
        );
    }

    //   * update branch
    updateBank(branch: any, branchId): Observable<any> {
        return this._httpClient
            .put(
                environment.API_URL + 'api/bank/' + branchId,
                branch,
                this.httpOptionsFormdata
            )
            .pipe(
                switchMap((response: any) => {
                    // Return a new observable with the response
                    return of(response);
                })
            );
    }

    setPermissionMenu(data: any): Observable<any> {
        return this._httpClient
            .post(
                environment.API_URL + 'api/menu_permission',
                data,
                this.httpOptionsFormdata
            )
            .pipe(
                switchMap((response: any) => {
                    // Return a new observable with the response
                    return of(response);
                })
            );
    }

    setPermissionAll(data: any): Observable<any> {
        return this._httpClient
            .post(
                environment.API_URL + 'api/checkAll',
                data,
                this.httpOptionsFormdata
            )
            .pipe(
                switchMap((response: any) => {
                    // Return a new observable with the response
                    return of(response);
                })
            );
    }

    getTransactionPage(
        dataTablesParameters: any
    ): Observable<DataTablesResponse> {
        return this._httpClient
            .post(
                environment.API_URL + 'api/bank_trans_page',
                dataTablesParameters,
                this.httpOptionsFormdata
            )
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }

    getBankPage(dataTablesParameters: any): Observable<DataTablesResponse> {
        return this._httpClient
            .post(
                environment.API_URL + 'api/bank_page',
                dataTablesParameters,
                this.httpOptionsFormdata
            )
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }

    getBankAll(): Observable<any> {
        return this._httpClient.get<any>(environment.API_URL + 'api/get_bank');
    }

    getUser(): Observable<any> {
        return this._httpClient.get<any>(environment.API_URL + 'api/get_user');
    }

    uploadImg(img: FormData): Observable<any> {
        return this._httpClient
            .post(
                environment.API_URL + 'api/upload_images',
                img,
                this.httpOptionsFormdata
            )
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }

    newTransaction(data: FormData): Observable<any> {
        return this._httpClient.post<any>(
            environment.API_URL + 'api/bank_trans',
            data,
            { headers: this.httpOptionsFormdata.headers }
        );
    }

    updateTransaction(data: FormData): Observable<any> {
        return this._httpClient.post<any>(
            environment.API_URL + 'api/update_bank_trans',
            data,
            { headers: this.httpOptionsFormdata.headers }
        );
    }
}
