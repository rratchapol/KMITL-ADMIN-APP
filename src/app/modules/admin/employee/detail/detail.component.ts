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
        public activatedRoute: ActivatedRoute
    ) {
        this.activatedRoute.params.subscribe((params) => {
            this.Id = params.id;
        });
        this.addForm = this.formBuilder.group({
            id:'',
            no: '',
            title: '',
            detail: '',
            file: '',
            image: '',
            notify_status: '',
        });
    }

    ngOnInit(): void {
        // สร้าง Reactive Form
        if (this.Id) {
            this.activatedRoute.params.subscribe((params) => {
                // console.log(params);
                const id = params.id;
                this._service.getById(id).subscribe((resp: any) => {
                    this.item = resp;
                    this.addForm.patchValue({
                        ...this.item,
                    });

                    this.addForm.patchValue({
                        image: '',
                    });

                    this.addForm.patchValue({
                        file: '',
                    });
                    // console.log(this.item.image);
                    // this.files.push(this.item.image);
                    if (this.item.image) this.uploadedImages = this.item.image;

                    if (this.item.file) this.uploadedFile = this.item.file;
                });
            });
        } else {
            this.addForm.patchValue({
                id:'',
                no: '',
                title: '',
                detail: '',
                image: '',
                file: '',
                notify_status: '1',
            });
        }
    }

    selectedFile: File = null;
    onFileChange(event) {
        this.selectedFile = (event.target as HTMLInputElement).files[0];

        // if (this.selectedFile) {
        //     // ปรับให้เก็บข้อมูลที่คุณต้องการ ในที่นี้เป็นชื่อไฟล์
        //     this.addForm.patchValue({ image: this.selectedFile.name });
        //   }
        // this.addForm.get('image').updateValueAndValidity();
    }

    Submit(): void {
        console.log(this.addForm.value);
        // const end =  moment(this.addForm.value.register_date).format('YYYY-MM-DD')
        // console.log(end)
        // this.addForm.patchValue({
        //   register_date:end
        // })
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
                const formData = new FormData();
                Object.entries(this.addForm.value).forEach(
                    ([key, value]: any[]) => {
                        formData.append(key, value);
                    }
                );
                // if (!this.Id) {
                //     this._service.create(formData).subscribe({
                //         next: (resp: any) => {
                //             this._router
                //                 .navigateByUrl('admin/journal/list')
                //                 .then(() => {});
                //         },

                //         error: (err: any) => {
                //             console.log(err);
                //             this.addForm.enable();
                //             this._fuseConfirmationService.open({
                //                 title: 'เกิดข้อผิดพลาด',
                //                 message: err.error.message,
                //                 icon: {
                //                     show: true,
                //                     name: 'heroicons_outline:exclamation',
                //                     color: 'warning',
                //                 },
                //                 actions: {
                //                     confirm: {
                //                         show: false,
                //                         label: 'ตกลง',
                //                         color: 'primary',
                //                     },
                //                     cancel: {
                //                         show: false,
                //                         label: 'ยกเลิก',
                //                     },
                //                 },
                //                 dismissible: true,
                //             });
                //             console.log(err.error.message);
                //         },
                //     });
                // } else {
                //     this._service.update(formData).subscribe({
                //         next: (resp: any) => {
                //             this._router
                //                 .navigateByUrl('admin/journal/list')
                //                 .then(() => {});
                //         },

                //         error: (err: any) => {
                //             console.log(err);
                //             this.addForm.enable();
                //             this._fuseConfirmationService.open({
                //                 title: 'เกิดข้อผิดพลาด',
                //                 message: err.error.message,
                //                 icon: {
                //                     show: true,
                //                     name: 'heroicons_outline:exclamation',
                //                     color: 'warning',
                //                 },
                //                 actions: {
                //                     confirm: {
                //                         show: false,
                //                         label: 'ตกลง',
                //                         color: 'primary',
                //                     },
                //                     cancel: {
                //                         show: false,
                //                         label: 'ยกเลิก',
                //                     },
                //                 },
                //                 dismissible: true,
                //             });
                //             console.log(err.error.message);
                //         },
                //     });
                // }
            }
        });
    }

    files: File[] = [];
    url_logo: string;
    onSelect(event: { addedFiles: File[] }): void {
        this.files = [];

        // เพิ่มรูปใหม่
        const newFiles = event.addedFiles;
        this.files.push(...newFiles);
        const file = this.files[0];
        this.addForm.patchValue({
            image: file,
        });
    }

    onRemove(file: File): void {
        const index = this.files.indexOf(file);
        if (index >= 0) {
            this.files.splice(index, 1);
        }
    }

    files2: File[] = [];
    onSelect2(event: { addedFiles: File[] }): void {
        this.files2 = [];

        // เพิ่มรูปใหม่
        const newFiles = event.addedFiles;
        this.files2.push(...newFiles);
        const file = this.files2[0];
        this.addForm.patchValue({
            file: file,
        });
        this.uploadedFile = true;
    }

    onRemove2(file: File): void {
        const index = this.files2.indexOf(file);
        if (index >= 0) {
            this.files2.splice(index, 1);
        }
        this.uploadedFile = false;
    }

    backTo() {
        this._router.navigate(['admin/journal/list']);
    }
}
