import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NewsService } from '../service/news.service';
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
        private _Service: NewsService,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}

    ngOnInit(): void {
        this.editForm = this.formBuilder.group({
            id: [this.data.id],
            name: [this.data.name],

        });
        this._Service.getById(this.data).subscribe((resp: any) => {
            this.itemData = resp;
            console.log('this.itemData', this.itemData);
            this.editForm.patchValue({
                id: this.itemData.id,
                name: this.itemData.name,

            });
            console.log(this.editForm.value);
        });
    }

    // async onChange(event: any): Promise<void> {
    //     // //console.log('')
    //     var reader = new FileReader();
    //     reader.readAsDataURL(event.target.files[0]);
    //     setTimeout(() => {
    //         this._changeDetectorRef.detectChanges();
    //     }, 150);
    //     reader.onload = (e: any) => (this.url_pro = e.target.result);
    //     const file = event.target.files[0];
    //     //console.log('file', file);

    //     const formData1 = new FormData();
    //     formData1.append('file', file);
    //     formData1.append('path', 'package');
    //     const ImagePath = await lastValueFrom(
    //         this._uploadService.uploadFile(formData1)
    //     );
    //     this.editForm.patchValue({
    //         image: ImagePath,
    //     });
    //     this._changeDetectorRef.markForCheck();
    // }

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


    update(): void {
        this.flashMessage = null;
        this.flashErrorMessage = null;

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

        confirmation.afterClosed().subscribe(async (result) => {
            if (result === 'confirmed') {

                const formData = new FormData();
                Object.entries(this.editForm.value).forEach(
                    ([key, value]: any[]) => {
                        formData.append(key, value);
                    }
                );
                console.log("this.editForm.value",this.editForm.value),
                this._Service.update(this.editForm.value.name,this.editForm.value.id).subscribe({
                    
                    next: (resp: any) => {
                        this.dialogRef.close();
                    },
                    error: (err: any) => {
                        this._fuseConfirmationService.open({
                            title: 'กรุณาระบุข้อมูล',
                            message: "กรุณาตรวจสอบข้อมูลให้ถูกต้องและต้องไม่ซ้ำกับในระบบ",
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
