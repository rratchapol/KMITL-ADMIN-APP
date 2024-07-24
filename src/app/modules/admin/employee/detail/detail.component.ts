import { items } from './../../../../mock-api/apps/file-manager/data';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { NewsService } from '../../farmmer/service/news.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor, NgIf, NgClass, CurrencyPipe, CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule, MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { FullCalendarModule } from '@fullcalendar/angular';
import { TranslocoModule } from '@ngneat/transloco';
import { DataTablesModule } from 'angular-datatables';
import { ShareModule } from 'app/share.module';
import { ThaiDatePipe } from 'app/shared/date-thai.component.pipe';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
    standalone: true,
    imports: [
        NgApexchartsModule,
        DataTablesModule,
        TranslocoModule,
        MatIconModule,
        MatButtonModule,
        MatRippleModule,
        MatMenuModule,
        MatTabsModule,
        MatButtonToggleModule,
        NgApexchartsModule,
        NgFor,
        NgIf,
        MatTableModule,
        NgClass,
        CurrencyPipe,
        MatStepperModule,
        MatFormFieldModule,
        MatStepperModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        MatButtonModule,
        MatCheckboxModule,
        MatRadioModule,
        FullCalendarModule,
        ShareModule,
        ThaiDatePipe,
        CommonModule,
        FormsModule,
        NgApexchartsModule,
        ShareModule,
        NgxDropzoneModule
    ],
    providers: [ThaiDatePipe, DatePipe]
})
export class DetailComponent implements OnInit {
    isLoading: boolean = false;
    formFieldHelpers: string[] = ['fuse-mat-dense'];
    addForm: FormGroup;
    permissiondata: any[];
    Id: any;
    item: any;
    editorContent = '<p>Hello Quill</p>';
    uploadedImages: any;
    uploadedFile: any;
    srcResult: any;
    defaultImages: string[] = ['https://logowik.com/content/uploads/images/adobe-pdf3324.jpg'];

    constructor(
        private _router: Router,
        private formBuilder: FormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _service: NewsService,
        public activatedRoute: ActivatedRoute,
        private http: HttpClient
    ) {
        this.activatedRoute.params.subscribe((params) => {
            this.Id = params.id;
        });
        this.addForm = this.formBuilder.group({
            factory_id: 1,
            factory_affiliation: '',
            head_office:'',
            phone: '',
            email: '',
            time_start: '',
            time_end: '',
            date_start: '',
            date_end: '',
            youtube: '',
            facebook: '',
            tiktok: '',
            website: '',
        });
        
    }
    itemData:any;
    ngOnInit(): void {
        this.http.get('https://asha-tech.co.th/trr-api/public/api/get_company_byfactory/1').subscribe(response => {
            this.itemData = response;
            console.log(response);
            this.addForm.patchValue({
                factory_affiliation: this.itemData.data.factory_affiliation,
                head_office: this.itemData.data.head_office,
                phone: this.itemData.data.phone,
                email: this.itemData.data.email,
                time_start: this.itemData.data.time_start,
                time_end: this.itemData.data.time_end,
                date_start: this.itemData.data.date_start,
                date_end: this.itemData.data.date_end,
                youtube: this.itemData.data.youtube,
                facebook: this.itemData.data.facebook,
                tiktok: this.itemData.data.tiktok,
                website: this.itemData.data.website,

            });console.log(this.itemData.data.head_office);
        });

        this._service.getByFacId().subscribe(
            (resp: any) => {
                console.log("หา ของ", resp);
                this.itemData = resp.data;
                console.log("Prefix value:", this.itemData);

                this.addForm.patchValue({
                    factory_affiliation: this.itemData.factory_affiliation,
                    head_office: this.itemData.head_office,
                    phone: this.itemData.phone,
                    email: this.itemData.email,
                    time_start: this.itemData.time_start,
                    time_end: this.itemData.time_end,
                    date_start: this.itemData.date_start,
                    date_end: this.itemData.date_end,
                    youtube: this.itemData.youtube,
                    facebook: this.itemData.facebook,
                    tiktok: this.itemData.tiktok,
                    website: this.itemData.website,

                });

            },
            (error) => {
                console.error('Error 888:', error);
            }
        );
       
    }


    Submit(): void {
        console.log(this.addForm.value);

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
        confirmation.afterClosed().subscribe((result) => {
            if (result === 'confirmed') {
                const formData = this.addForm.value
                    this._service.create(formData).subscribe({
                        next: (resp: any) => {
                            // this._router
                                // .navigateByUrl('admin/journal/list')
                                // .then(() => {});
                        },

                        error: (err: any) => {
                            console.log(err);
                            this.addForm.enable();
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
}
