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
    image1: FormGroup;
    imagepath: FormGroup;
    permissiondata: any[];
    Id: any;
    item: any;
    editorContent = '<p>Hello Quill</p>';
    uploadedImages: any;
    uploadedImages1: any;
    uploadedImages2: any;
    uploadedImages3: any;
    uploadedImages4: any;
    uploadedImages5: any;
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
            // factory_affiliation: '',
            head_office:'',
            phone: '',
            email: '',
            time_start: '',
            time_end: '',
            date_start: '',
            date_end: '',
            link1: '',
            link2: '',
            link3: '',
            link4: '',
            link5: '',
            image1: '',
            image2: '',
            image3: '',
            image4: '',
            image5: '',
        });
        this.imagepath = this.formBuilder.group({
            image: '',
            path:'images/company/',
        });
        
    }
    itemData:any;
    ngOnInit(): void {
        // this.http.get('https://asha-tech.co.th/trr-api/public/api/get_company_byfactory/1').subscribe(response => {
        //     this.itemData = response;
        //     console.log(response);
        //     this.addForm.patchValue({
        //         factory_affiliation: this.itemData.data.factory_affiliation,
        //         head_office: this.itemData.data.head_office,
        //         phone: this.itemData.data.phone,
        //         email: this.itemData.data.email,
        //         time_start: this.itemData.data.time_start,
        //         time_end: this.itemData.data.time_end,
        //         date_start: this.itemData.data.date_start,
        //         date_end: this.itemData.data.date_end,
        //         youtube: this.itemData.data.youtube,
        //         facebook: this.itemData.data.facebook,
        //         tiktok: this.itemData.data.tiktok,
        //         website: this.itemData.data.website,

        //     });console.log(this.itemData.data.head_office);
        // });

        this._service.getByFacId().subscribe(
            (resp: any) => {
                console.log("หา ของ", resp);
                this.itemData = resp;
                console.log("Prefix value:", this.itemData);

                this.addForm.patchValue({
                    // factory_affiliation: this.itemData.factory_affiliation,
                    head_office: this.itemData.head_office,
                    phone: this.itemData.phone,
                    email: this.itemData.email,
                    time_start: this.itemData.time_start,
                    time_end: this.itemData.time_end,
                    date_start: this.itemData.date_start,
                    date_end: this.itemData.date_end,
                    link1: this.itemData.link1,
                    link2: this.itemData.link2,
                    link3: this.itemData.link3,
                    link4: this.itemData.link4,
                    link5: this.itemData.link5,
                    image1: this.itemData.image1,
                    image2: this.itemData.image2,
                    image3: this.itemData.image3,
                    image4: this.itemData.image4,
                    image5: this.itemData.image5,

                });
                if (this.itemData.image1) this.uploadedImages1 = this.itemData.image1;
                if (this.itemData.image2) this.uploadedImages2 = this.itemData.image2;
                if (this.itemData.image3) this.uploadedImages3 = this.itemData.image3;
                if (this.itemData.image4) this.uploadedImages4 = this.itemData.image4;
                if (this.itemData.image5) this.uploadedImages5 = this.itemData.image5;
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
                // const formData = new FormData();
                // Object.entries(this.addForm.value).forEach(
                //     ([key, value]: any[]) => {
                //         formData.append(key, value);
                //     }
                // );
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


        // files: File[] = [];
    // onSelect(event: { addedFiles: File[] }): void {
    //     this.files = [];

    //     // เพิ่มรูปใหม่
    //     const newFiles = event.addedFiles;
    //     this.files.push(...newFiles);
    //     const file = this.files[0];
    //     this.addForm.patchValue({
    //         image1: file,
    //     });
    // }

    files: File[] = [];
    file1:any;
    file2:any;
    file3:any;
    file4:any;
    file5:any;
    onSelect1(event: { addedFiles: File[] }): void {
        this.files = [];
        this.uploadedImages1 = null;
        this.addForm.patchValue({
            image1: '',
        });
        // เพิ่มรูปใหม่
        const newFiles = event.addedFiles;
        this.files.push(...newFiles);
        const file = this.files[0];
        this.imagepath.patchValue({
            image: file,
        });
        const formData = new FormData();
        Object.entries(this.imagepath.value).forEach(
            ([key, value]: any[]) => {
                formData.append(key, value);
            }
        );
        this._service.image(formData).subscribe((resp: any) => {
            this.file1 = resp
            console.log("ดู profiles ชื่อ บัตร", this.file1);
            this.addForm.patchValue({
                image1: this.file1,
            });
            console.log(this.addForm.value)
        });
    }


    files2: File[] = [];
    onSelect2(event: { addedFiles: File[] }): void {
        this.files2 = [];
        this.uploadedImages2 = null;
        // เพิ่มรูปใหม่
        const newFiles = event.addedFiles;
        this.files2.push(...newFiles);
        const file = this.files2[0];
        this.imagepath.patchValue({
            image: file,
        });
        const formData = new FormData();
        Object.entries(this.imagepath.value).forEach(
            ([key, value]: any[]) => {
                formData.append(key, value);
            }
        );
        this._service.image(formData).subscribe((resp: any) => {
            this.file2 = resp
            console.log("ดู profiles ชื่อ บัตร", this.file2);
            this.addForm.patchValue({
                image2: this.file2,
            });
            console.log(this.addForm.value)
        });
    }

    files3: File[] = [];
    onSelect3(event: { addedFiles: File[] }): void {
        this.files3 = [];
        this.uploadedImages3 = null;
        // เพิ่มรูปใหม่
        const newFiles = event.addedFiles;
        this.files3.push(...newFiles);
        const file = this.files3[0];
        this.imagepath.patchValue({
            image: file,
        });
        const formData = new FormData();
        Object.entries(this.imagepath.value).forEach(
            ([key, value]: any[]) => {
                formData.append(key, value);
            }
        );
        this._service.image(formData).subscribe((resp: any) => {
            this.file3 = resp
            console.log("ดู profiles ชื่อ บัตร", this.file3);
            this.addForm.patchValue({
                image3: this.file3,
            });
            console.log(this.addForm.value)
        });
    }

    files4: File[] = [];
    onSelect4(event: { addedFiles: File[] }): void {
        this.files4 = [];
        this.uploadedImages4 = null;
        // เพิ่มรูปใหม่
        const newFiles = event.addedFiles;
        this.files4.push(...newFiles);
        const file = this.files4[0];
        this.imagepath.patchValue({
            image: file,
        });
        const formData = new FormData();
        Object.entries(this.imagepath.value).forEach(
            ([key, value]: any[]) => {
                formData.append(key, value);
            }
        );
        this._service.image(formData).subscribe((resp: any) => {
            this.file4 = resp
            console.log("ดู profiles ชื่อ บัตร",this.file4);
            this.addForm.patchValue({
                image4: this.file4,
            });
            console.log(this.addForm.value)
        });
    }

    files5: File[] = [];
    onSelect5(event: { addedFiles: File[] }): void {
        this.files5 = [];
        this.uploadedImages5 = null;
        this.addForm.patchValue({
            image5: '',
        });
        // เพิ่มรูปใหม่
        const newFiles = event.addedFiles;
        this.files5.push(...newFiles);
        const file = this.files5[0];
        this.imagepath.patchValue({
            image: file,
        });
        const formData = new FormData();
        Object.entries(this.imagepath.value).forEach(
            ([key, value]: any[]) => {
                formData.append(key, value);
            }
        );
        this._service.image(formData).subscribe((resp: any) => {
            this.file5 = resp
            console.log("ดู profiles ชื่อ บัตร",this.file5);
            this.addForm.patchValue({
                image5: this.file5,
            });
            console.log(this.addForm.value)
        });
    }

    onRemove(file: File): void {
        const index = this.files.indexOf(file);
        if (index >= 0) {
            this.files.splice(index, 1);
        }
    }
    onRemove2(file: File): void {
        const index = this.files2.indexOf(file);
        if (index >= 0) {
            this.files2.splice(index, 1);
        }
    }
    onRemove3(file: File): void {
        const index = this.files3.indexOf(file);
        if (index >= 0) {
            this.files3.splice(index, 1);
        }
    }
    onRemove4(file: File): void {
        const index = this.files4.indexOf(file);
        if (index >= 0) {
            this.files4.splice(index, 1);
        }
    }
    onRemove5(file: File): void {
        const index = this.files5.indexOf(file);
        if (index >= 0) {
            this.files5.splice(index, 1);
        }
    }

}
