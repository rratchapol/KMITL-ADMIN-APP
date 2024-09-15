import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { FaqService } from '../service/faq.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-edit-news',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
    isLoading: boolean = false;
    formFieldHelpers: string[] = ['fuse-mat-dense'];
    addForm: FormGroup;
    permissiondata: any[];
    item: any;
    imageUrls: string[] = [];
    constructor(
        private _router: Router,
        private formBuilder: FormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _service: FaqService,
        public activatedRoute: ActivatedRoute,
        private http: HttpClient
    ) {
        this.addForm = this.formBuilder.group({
            id: '',
            title: '',
            detail: '',
            image: '',
            notify_status: '',
            status: '',
        });
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params) => {
            // console.log(params);
            const id = params.id;
            this._service.getById(id).subscribe((resp: any) => {
                this.item = resp;
                this.addForm.patchValue({
                    ...this.item,
                });
                console.log(this.item.image);
                // this.files.push(this.item.image);
                this.imageUrls.push(this.item.image);
            });
        });
        // สร้าง Reactive Form
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

        const confirmation = this._fuseConfirmationService.open({
            title: 'แก้ไขข้อมูล',
            message: 'คุณต้องการแก้ไขข้อมูลใช่หรือไม่ ?',
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
                        if (
                            value !== '' &&
                            value !== 'null' &&
                            value !== null
                        ) {
                            formData.append(key, value);
                        }
                        if (key === 'image') {
                            formData.append(key, this.selectedFile);
                        }
                    }
                );
                this._service
                    .update(formData)
                    .subscribe({
                        next: (resp: any) => {
                            this._router
                                .navigateByUrl('news/list')
                                .then(() => {});
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
        console.log(this.addForm.value);
    }
    data(data: any, formData: FormData) {
        throw new Error('Method not implemented.');
    }

    Cancel(): void {
        this._router.navigateByUrl('news/list').then(() => {});
    }

    files: File[] = [];
    url_logo: string;
    onSelect(event: { addedFiles: File[] }): void {
        this.files = [];

        // เพิ่มรูปใหม่
        const newFiles = event.addedFiles;
        this.files.push(...newFiles);
        this.files.push(...event.addedFiles);
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
    backTo() {
        this._router.navigate(['news/list']);
    }
}
