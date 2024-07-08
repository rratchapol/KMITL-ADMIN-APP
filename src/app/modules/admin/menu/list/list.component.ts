import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
    debounceTime,
    lastValueFrom,
    map,
    merge,
    Observable,
    Subject,
    switchMap,
    takeUntil,
} from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { AuthService } from 'app/core/auth/auth.service';
import { sortBy, startCase } from 'lodash-es';
import { AssetType } from '../menu.types';
import { MenuService } from '../menu.service';
// import { ImportOSMComponent } from '../card/import-osm/import-osm.component';

@Component({
    selector: 'list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    animations: fuseAnimations,
})
export class ListComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;
    public UserAppove: any = [];
    itemData: any = [];
    UserData: any = [];
    MenuData: any = [];

    statusData = [
        { id: 0, name: 'ปิดการใช้งาน' },
        { id: 1, name: 'เปิดการใช้งาน' },
    ];

    menuData = [
        { id: 0, name: 'บัญชีธนาคาร' },
        { id: 1, name: 'ธุรกรรมทางการเงิน' },
        { id: 1, name: 'ผู้ใช้งาน' },
        { id: 1, name: 'พระ' },
        { id: 1, name: 'ศาลา' },
        { id: 1, name: 'สมาชิก' },
        { id: 1, name: 'ห้องอุปกรณ์' },
        { id: 1, name: 'อุปกรณ์' },
        { id: 1, name: 'ข่าวสาร' },
        { id: 1, name: 'แกลลอรี่' },
        { id: 1, name: 'วัตถุมงคล' },
        { id: 1, name: 'จัดการที่ดิน' },
        { id: 1, name: 'ยืมอุปกรณ์' },
    ];
    // branchId = 2;
    bankId: any;

    formData: FormGroup;
    flashErrorMessage: string;
    flashMessage: 'success' | 'error' | null = null;
    isLoading: boolean = false;
    searchInputControl: FormControl = new FormControl();
    selectedProduct: any | null = null;
    filterForm: FormGroup;
    tagsEditMode: boolean = false;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    env_path = environment.API_URL;

    // me: any | null;
    // get roleType(): string {
    //     return 'marketing';
    // }

    checkall: any;

    supplierId: string | null;
    pagination: any;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: FormBuilder,
        private _Service: MenuService,
        private _matDialog: MatDialog,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService
    ) {
        this.formData = this._formBuilder.group({
            user_id: ['', Validators.required],
            menu: this._formBuilder.array([]),
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    async ngOnInit(): Promise<void> {
        this.bankId = this._activatedRoute.snapshot.paramMap.get('id');

        const userdata = await lastValueFrom(this._Service.getUser());
        this.UserAppove = userdata.data;

        this._Service.getUser().subscribe((resp: any) => {
            this.UserData = resp.data;
        });
    }

    menu(): FormArray {
        return this.formData.get('menu') as FormArray;
    }

    NewMenu(item: any): FormGroup {
        // let view = false;
        // let add = false;
        // let edit = false;
        // if (this.itemData.menu) {
        //     for (const data of this.itemData.menu) {
        //         if (item.id == data.bank_id) {
        //             if (data.actions == 'View') {
        //                 view = true;
        //             }

        //             if (data.actions == 'Add') {
        //                 add = true;
        //             }

        //             if (data.actions == 'Edit') {
        //                 edit = true;
        //             }
        //         }
        //     }
        // }

        const arr = [];
        var check = true;
        item.Menus.forEach((element) => {
            this.itemData.menu_permission.forEach((element2) => {
                if (element2.menu_id == element.id) {
                    check = false;
                }
            });

            arr.push({
                main_menu_id: element.main_menu_id,
                name: element.name,
                checked: check,
            });
        });

        return this._formBuilder.group({
            user_id: '',
            name: item.name,
            menus: this._formBuilder.array(arr),
        });
    }

    addMenu(item: any): void {
        this.menu().push(this.NewMenu(item));
    }

    removeMenu(i: number): void {
        this.menu().removeAt(i);
    }

    menu_list(i: number): FormArray {
        return this.menu().at(i).get('menus') as FormArray;
    }

    NewMenuList(item: any): FormGroup {
        return this._formBuilder.group({
            menu_id: '',
            name: item.name,
        });
    }

    addMenuList(i: number, item: any): void {
        this.menu_list(i).push(this.NewMenuList(item));
    }

    removeMenuList(index: number, i: number): void {
        this.menu_list(index).removeAt(i);
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void { }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
    }

    updateBank(): void {
        this.flashMessage = null;
        this.flashErrorMessage = null;
        // Return if the form is invalid
        // if (this.formData.invalid) {
        //     return;
        // }
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'แก้ไขบัญชีธนาคาร',
            message: 'คุณต้องการแก้ไขบัญชีธนาคารใช่หรือไม่ ',
            icon: {
                show: false,
                name: 'heroicons_outline:exclamation',
                color: 'warning',
            },
            actions: {
                confirm: {
                    show: true,
                    label: 'ยืนยัน',
                    color: 'primary',
                },
                cancel: {
                    show: true,
                    label: 'ย้อนกลับ',
                },
            },
            dismissible: true,
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {
            // If the confirm button pressed...
            if (result === 'confirmed') {
                // Disable the form
                this.formData.disable();
                this._Service
                    .updateBank(this.formData.value, this.bankId)
                    .subscribe({
                        next: (resp: any) => {
                            this.showFlashMessage('success');
                            this._router
                                .navigateByUrl('bank/list')
                                .then(() => { });
                        },
                        error: (err: any) => {
                            this.formData.enable();
                            this._fuseConfirmationService.open({
                                title: 'กรุณาระบุข้อมูล',
                                message: err.error.message,
                                icon: {
                                    show: true,
                                    name: 'heroicons_outline:exclamation',
                                    color: 'warning',
                                },
                                actions: {
                                    confirm: {
                                        show: false,
                                        label: 'ยืนยัน',
                                        color: 'primary',
                                    },
                                    cancel: {
                                        show: false,
                                        label: 'ย้อนกลับ',
                                    },
                                },
                                dismissible: true,
                            });
                            console.log(err.error.message);
                        },
                    });

                // Sign in
                // this._Service.createUser(this.userForm.value)
                //     .subscribe({
                //         next: (res) => {
                //             console.log(res);
                //         },
                //         error: (err: HttpErrorResponse) => {
                //             this.userForm.enable();
                //             this.flashMessage = 'error';

                //             if (err.error.error['message'] === 'This attribute must be unique') {
                //                 this.flashErrorMessage = 'Username is already';
                //             } else {
                //                 this.flashErrorMessage = err.error.error['message'];
                //             }
                //         },
                //         complete: () => {
                //             this._location.back();
                //         },
                //     }
                //     );
            }
        });
    }

    showFlashMessage(type: 'success' | 'error'): void {
        // Show the message
        this.flashMessage = type;

        // Mark for check
        this._changeDetectorRef.markForCheck();

        // Hide it after 3 seconds
        setTimeout(() => {
            this.flashMessage = null;

            // Mark for check
            this._changeDetectorRef.markForCheck();
        }, 3000);
    }

    onChangeUser(event): void {
        this._Service.getUserById(event).subscribe((resp: any) => {
            this.itemData = resp.data;
            this.MenuData = [];
            this.menu().clear();

            this._Service.getMenu().subscribe((resp: any) => {
                this.MenuData = resp.data;

                console.log(this.MenuData);

                for (const item of this.MenuData) {
                    this.addMenu(item);
                }
                this._changeDetectorRef.markForCheck();
            });
        });
    }

    actionChangeAll(): void {
        if (this.checkall == true) {
            this.checkall = false;
        } else {
            this.checkall = true;
        }

        for (var i = 0; i <= this.menu().length - 1; i++) {
            const mainmenu = this.menu().at(i).get('menus') as FormArray;

            for (var j = 0; j <= mainmenu.length - 1; j++) {
                if (this.checkall == true) {
                    mainmenu.at(j).value.checked = false;
                } else {
                    mainmenu.at(j).value.checked = true;
                }
            }
        }

        let array;

        if (this.checkall == true) {
            array = {
                user_id: this.formData.value.user_id,
                check: false,
            };
        } else {
            array = {
                user_id: this.formData.value.user_id,
                check: true,
            };
        }

        this._Service.setPermissionAll(array).subscribe((resp: any) => {
            this._changeDetectorRef.markForCheck();
        });
    }

    actionChange(event, i, j): void {
        let array;
        array = {
            user_id: this.formData.value.user_id,
            menu_id: this.MenuData[i].Menus[j].id,
            actions: 'View',
        };

        const mainmenu = this.menu().at(i).get('menus') as FormArray;

        mainmenu.at(j).value.checked = false;

        this._Service.setPermissionMenu(array).subscribe((resp: any) => {
            this._changeDetectorRef.markForCheck();
        });
    }

    getMenus(index: number) {
        // this.MenuData[index].Menus.forEach((element) => {
        //     this.addMenuList(index, element);
        // });

        return this.menu().at(index).get('menus') as FormArray;
    }

    goBack(): void {
        this._router.navigate(['']);
    }

}
