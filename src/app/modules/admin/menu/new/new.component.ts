import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { debounceTime, lastValueFrom, map, merge, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { AuthService } from 'app/core/auth/auth.service';
import { sortBy, startCase } from 'lodash-es';
import { AssetType, CustomerPagination } from '../menu.types';
import { MenuService } from '../menu.service';
import { ItemTypeService } from '../../item-type/item-type.service';
import { LocationService } from '../../location/location.service';
import { VendorService } from '../../vendor/vendor.service';
import { PositionService } from '../../position/position.service';
import { DepartmentService } from '../../department/department.service';
// import { ImportOSMComponent } from '../card/import-osm/import-osm.component';

@Component({
    selector: 'new',
    templateUrl: './new.component.html',
    styleUrls: ['./new.component.scss'],
    animations: fuseAnimations
})

export class NewComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;

    formData: FormGroup
    uploadPic: FormGroup
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

    itemtypeData: any = [];
    vendorData: any = [];
    files: File[] = [];
    supplierId: string | null;
    pagination: CustomerPagination;
    departmentData: any = []
    positionData: any = []
    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: FormBuilder,
        private _matDialog: MatDialog,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,

        private _Service: MenuService,
        private _ServicePosition: PositionService,
        private _ServiceDepartment: DepartmentService,
        private _ServiceItemtemType: ItemTypeService,
        private _ServiceLocation: LocationService,
        private _ServiceVendor: VendorService,

    ) {

        this.formData = this._formBuilder.group({
            department_id: '',
            position_id: '',
            name: '',
            email: '',
            phone: '',
            line_token: '',
            skill: '',
            monk_age: '',
            image: ''
        })


    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    async ngOnInit(): Promise<void> {

        const position = await lastValueFrom(this._ServicePosition.getPosition())
        this.departmentData = position.data;

        const department = await lastValueFrom(this._ServiceDepartment.getDepartment())
        this.positionData = department.data;

        this.formData = this._formBuilder.group({
            department_id: '',
            position_id: '',
            name: '',
            email: '',
            phone: '',
            line_token: '',
            skill: '',
            monk_age: '',
            image: ''
        })
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void {

    }


    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions

    }


    CreateItem(): void {
        this.flashMessage = null;
        this.flashErrorMessage = null;
        // Return if the form is invalid
        // if (this.formData.invalid) {
        //     return;
        // }
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            "title": "เพิ่มพระใหม่",
            "message": "คุณต้องการเพิ่มพระใหม่ใช่หรือไม่ ",
            "icon": {
                "show": false,
                "name": "heroicons_outline:exclamation",
                "color": "warning"
            },
            "actions": {
                "confirm": {
                    "show": true,
                    "label": "ยืนยัน",
                    "color": "primary"
                },
                "cancel": {
                    "show": true,
                    "label": "ย้อนกลับ"
                }
            },
            "dismissible": true
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {

            // If the confirm button pressed...
            if (result === 'confirmed') {
                const formValue = this.formData.value
                // console.log('formData', formValue)
                console.log('this.files[0]', this.files[0])

                this.formData.patchValue({
                    image: this.files[0],
                });
                console.log('formValue', formValue)
                const formData = new FormData();
                Object.entries(formValue).forEach(
                    ([key, value]: any[]) => {
                        formData.append(key, value);
                    }
                );
                console.log('formData', formData);



            }
        });
    }

    onSelect(event) {
        console.log(event);
        this.files[0] = event.addedFiles[0];
        // this.files.push(...event.addedFiles);

        // Trigger Image Preview

        this._changeDetectorRef.detectChanges()

        this.formData.patchValue({
            image: this.files[0],
        });
        console.log(this.formData.value)
    }

    onRemove(event) {
        // console.log('1', event);
        this.files.splice(this.files.indexOf(event), 1);
        this.formData.patchValue({
            image: '',
        });
        console.log(this.formData.value)
    }


}
