import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { AuthService } from 'app/core/auth/auth.service';
import { PermissionService } from '../service/permission.service';
// import { ImportOSMComponent } from '../card/import-osm/import-osm.component';

@Component({
    selector: 'form-permission',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    animations: fuseAnimations,
})
export class FormComponent implements OnInit, AfterViewInit, OnDestroy {
    showBranch: boolean = false; // variable to control branch visibility

    formData: FormGroup;
    flashErrorMessage: string;
    flashMessage: 'success' | 'error' | null = null;
    isLoading: boolean = false;
    searchInputControl: FormControl = new FormControl();
    selectedProduct: any | null = null;
    filterForm: FormGroup;
    tagsEditMode: boolean = false;
    supplierId: string | null;
    public UserAppove: any = [];
    files: File[] = [];
    files1: File[] = [];
    MemberType: any = [];
    MenuList: any = [];
    Customer_type: string[] = ['Individual', 'Corporate'];
    public MenuName: any = [];

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: FormBuilder,
        private _Service: PermissionService,
        private _matDialog: MatDialog,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService
    ) {
        this.formData = this._formBuilder.group({
            name: '',
            menu: this._formBuilder.array([]),
        });
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    //Hide Customer type

    /**
     * On init
     */
    ngOnInit(): void {
        this._Service.getAllMenu().subscribe((resp: any) => {
            this.MenuList = resp;
            console.log(this.MenuList, 'menu');
            for (const menu of this.MenuList) {
                let item = this._formBuilder.group({
                    name: menu.name,
                    menu_id: menu.id,
                    select_all: false,
                    view: false,
                    save: false,
                    edit: false,
                    delete: false,
                });
                this.permission().push(item);
            }
            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }

    permission(): FormArray {
        return this.formData.get('menu') as FormArray;
    }

    newPermission(): FormGroup {
        return this._formBuilder.group({
            name: '',
            menu_id: '',
            view: '',
            save: '',
            edit: '',
            delete: '',
        });
    }

    addPermission(): void {
        this.permission().push(this.newPermission());
    }

    removePermission(i: number): void {
        this.permission().removeAt(i);
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void {}

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
    }

    create(): void {
        const confirmation = this._fuseConfirmationService.open({
            title: 'เพิ่มข้อมูล',
            message: 'คุณต้องการเพิ่มข้อมูลใช่หรือไม่ ?',
            icon: {
                show: false,
                name: 'heroicons_outline:exclamation',
                color: 'warning',
            },
            actions: {
                confirm: {
                    show: true,
                    label: 'ตกลง',
                    color: 'primary',
                },
                cancel: {
                    show: true,
                    label: 'ยกเลิก',
                },
            },
            dismissible: true,
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {
            // If the confirm button pressed...
            if (result === 'confirmed') {
                const formValue = this.formData.value;
                formValue.Menu = formValue.menu.forEach((element) => {
                    element.view = element.view ? 1 : 0;
                    element.save = element.save ? 1 : 0;
                    element.edit = element.edit ? 1 : 0;
                    element.delete = element.delete ? 1 : 0;
                    delete element.name;
                });
                // console.log(formValue, 'FormData');
                this._Service.create(formValue).subscribe({
                    next: (resp: any) => {
                        this._router
                            .navigateByUrl('permission/list')
                            .then(() => {});
                    },
                    error: (err: any) => {
                        this.formData.enable();
                        this._fuseConfirmationService.open({
                            title: 'เกิดข้อผิดพลาด',
                            message: err.error.message,
                            icon: {
                                show: true,
                                name: 'heroicons_outline:exclamation',
                                color: 'warning',
                            },
                            actions: {
                                confirm: {
                                    show: false,
                                    label: 'ตกลง',
                                    color: 'primary',
                                },
                                cancel: {
                                    show: false,
                                    label: 'ยกเลิก',
                                },
                            },
                            dismissible: true,
                        });
                        console.log(err.error.message);
                    },
                });
            }
        });
    }
    showFlashMessage(arg0: string) {
        throw new Error('Method not implemented.');
    }
    backTo() {
        this._router.navigate(['permission/list']);
    }
    toggleAllSelection(data, i) {
        console.log(data.checked);
        let item = this.formData.value.menu;
        if (data.checked === true) {
            item[i] = {
                view: true,
                save: true,
                edit: true,
                delete: true,
            };
            this.formData.controls.menu.patchValue(item);
        } else {
            item[i] = {
                view: false,
                save: false,
                edit: false,
                delete: false,
            };
            this.formData.controls.menu.patchValue(item);
        }
    }
}
