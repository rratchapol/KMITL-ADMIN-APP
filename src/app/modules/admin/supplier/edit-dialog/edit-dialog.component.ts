import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SupplierService } from '../service/supplier.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { lastValueFrom } from 'rxjs';

@Component({
    selector: 'app-edit-dialog-news',
    templateUrl: './edit-dialog.component.html',
    styleUrls: ['./edit-dialog.component.scss'],
})
export class EditDialogComponent implements OnInit {
    formFieldHelpers: string[] = ['fuse-mat-dense'];
    editForm: FormGroup;
    itemData: any;
    flashErrorMessage: null;
    flashMessage: null;
    formData: any;
    url_pro: any;
    _changeDetectorRef: any;
    _uploadService: any;

    constructor(
        private dialogRef: MatDialogRef<EditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,

        private formBuilder: FormBuilder,
        private _Service: SupplierService,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}

    ngOnInit(): void {
        this.editForm = this.formBuilder.group({
            id: [this.data.id],
            title: [this.data.title],
            detail: [this.data.detail],
            image: [this.url_pro],
            notify_status: [this.data.notify_status],
            status: [this.data.status],
        });
        this._Service.getById(this.data).subscribe((resp: any) => {
            this.itemData = resp;

            this.editForm.patchValue({
                id: this.itemData.id,
                title: this.itemData.title,
                detail: this.itemData.detail,
                image: this.itemData.image,
                notify_status: this.itemData.notify_status,
                status: this.itemData.status,
            });
            console.log(this.editForm.value);
            this.url_pro = this.itemData.image;
        });
    }

    async onChange(event: any): Promise<void> {
        // //console.log('')
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        setTimeout(() => {
            this._changeDetectorRef.detectChanges();
        }, 150);
        reader.onload = (e: any) => (this.url_pro = e.target.result);
        const file = event.target.files[0];
        //console.log('file', file);

        const formData1 = new FormData();
        formData1.append('file', file);
        formData1.append('path', 'package');
        const ImagePath = await lastValueFrom(
            this._uploadService.uploadFile(formData1)
        );
        this.editForm.patchValue({
            image: ImagePath,
        });
        this._changeDetectorRef.markForCheck();
    }

    onSaveClick(): void {
        if (this.editForm.valid) {
            const updatedData = this.editForm.value;
            this.dialogRef.close(updatedData);
            // แสดง SweetAlert2 ข้อความ "complete"
        }

        // แสดง Snackbar ข้อความ "complete"
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }
    selectedFile: File = null;
    onFileChange(event) {
        this.selectedFile = (event.target as HTMLInputElement).files[0];

        if (this.selectedFile) {
            // ปรับให้เก็บข้อมูลที่คุณต้องการ ในที่นี้เป็นชื่อไฟล์
            this.editForm.patchValue({ image: this.selectedFile.name });
        }
        this.editForm.get('image').updateValueAndValidity();
    }

    update(): void {
        this.flashMessage = null;
        this.flashErrorMessage = null;
        // Return if the form is invalid
        // if (this.formData.invalid) {
        // return;
        // }
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'แก้ไขข้อมูล',
            message: 'คุณต้องการแก้ไขข้อมูลใช่หรือไม่ ',
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
                    label: 'ยกเลิก',
                },
            },
            dismissible: true,
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe(async (result) => {
            // If the confirm button pressed...
            if (result === 'confirmed') {
                // if (this.files.length) {
                // const formData1 = new FormData();
                // formData1.append('file', this.files[0]);
                // formData1.append('path', 'package');
                // const ImgPath = await lastValueFrom(
                // this._uploadService.uploadFile(formData1)
                // );
                // this.formData.patchValue({
                // image: ImgPath,
                // });
                // }

                const formData = new FormData();
                Object.entries(this.editForm.value).forEach(
                    ([key, value]: any[]) => {
                        formData.append(key, value);
                    }
                );
                this._Service.update(this.data, formData).subscribe({
                    next: (resp: any) => {
                        this.dialogRef.close();
                    },
                    error: (err: any) => {
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
                                    label: 'ยกเลิก',
                                },
                            },
                            dismissible: true,
                        });
                    },
                });
            }
        });
    }
    files: File[] = [];
    url_logo: string;
    onSelect(event: { addedFiles: File[] }): void {
        this.files.push(...event.addedFiles);
        const file = this.files[0];
        this.editForm.patchValue({
            image: file,
        });
    }

    onRemove(file: File): void {
        const index = this.files.indexOf(file);
        if (index >= 0) {
            this.files.splice(index, 1);
        }
    }
}
