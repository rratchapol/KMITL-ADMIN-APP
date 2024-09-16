import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { PdpaService } from '../service/pdpa.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-form-pdpa',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
    isLoading: boolean = false;
    formFieldHelpers: string[] = ['fuse-mat-dense'];
    addForm: FormGroup;
    permissiondata: any[];
    Id: any;
    item: any;
    editorContent = '<p>Hello Quill</p>';
    uploadedImages: any;

    constructor(
        private _router: Router,
        private formBuilder: FormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _service: PdpaService,
        public activatedRoute: ActivatedRoute
    ) {
        this.activatedRoute.params.subscribe((params) => {
            this.Id = params.id;
        });
        this.addForm = this.formBuilder.group({
            id: '',
            title: '',
            detail: '<p>Hello Quill</p>..',
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
                    // console.log(this.item.image);
                    // this.files.push(this.item.image);
                    if (this.item.image) this.uploadedImages = this.item.image;
                });
            });
        } else {
            this.addForm.patchValue({
                id: '',
                title: '',
                detail: '<p>กรอกรายระเอียด</p>',
                image: '',
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
                if (!this.Id) {
                    this._service.create(formData).subscribe({
                        next: (resp: any) => {
                            this._router
                                .navigateByUrl('admin/news/list')
                                .then(() => {});
                        },

                        error: (err: any) => {
                            console.log(err);
                            this.addForm.enable();
                            this._fuseConfirmationService.open({
                                title: 'ไม่สามารถบันทึกข้อมูลได้',
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
                } else {
                    this._service.update(formData).subscribe({
                        next: (resp: any) => {
                            this._router
                                .navigateByUrl('admin/news/list')
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

    backTo() {
        this._router.navigate(['admin/news/list']);
    }
}
