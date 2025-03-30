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
    image:any;
    product_images: string[] = [];
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
            product_name: [this.data.product_name],
            product_images: [this.data.product_images],
            product_qty: [this.data.product_qty],
            product_price: [this.data.product_price],
            product_description: [this.data.product_description],
            product_category: [this.data.product_category],
            product_type: [this.data.product_type],
            seller_id: [this.data.seller_id],
            date_exp: [this.data.date_exp],
            product_location: [this.data.product_location],
            product_condition: [this.data.product_condition],
            product_defect: [this.data.product_defect],
            product_years: [this.data.product_years],
            tag: [this.data.tag],
            status: [this.data.status],
        });
        this._Service.getById(this.data).subscribe((resp: any) => {
            this.itemData = resp;
            console.log("ดูข้อมูลที่ส่งมา",this.itemData);
            console.log("ดูข้อมูลที่ส่งมา",this.itemData.product_images);
            this.image = "http://127.0.0.1:8000/storage/" + this.itemData.product_images;
            // this.product_images= this.image.split(',');
            this.product_images = this.itemData.product_images.map(img => "http://127.0.0.1:8000/storage/" + img);

            console.log("ดูข้อมูลที่ส่งมา",this.image);
            this.editForm.patchValue({
                id: this.itemData.id,
                product_name: this.itemData.product_name,
                product_images: this.itemData.product_images,
                product_qty: this.itemData.product_qty,
                product_price: this.itemData.product_price,
                product_description: this.itemData.product_description,
                product_category: this.itemData.product_category,
                product_type: this.itemData.product_type,
                seller_id: this.itemData.seller_id,
                date_exp: this.itemData.date_exp,
                product_location: this.itemData.product_location,
                product_condition: this.itemData.product_condition,
                product_defect: this.itemData.product_defect,
                product_years: this.itemData.product_years,
                tag: this.itemData.tag,
            })
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

    // onCancelClick(): void {
    //     this.delete(this.data.id);
    //     // this.dialogRef.close();
    // }
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
                this.editForm.value.status = 'ok';


                this.editForm.value.status = 'ok';
                console.log('formdata status ok', this.editForm.value.status);

                this._Service.update( this.editForm.value ).subscribe({
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


    delete(itemid: any) {
        const confirmation = this._fuseConfirmationService.open({
            title: 'ลบข้อมูล',
            message: 'คุณต้องการลบข้อมูลใช่หรือไม่ ?',
            icon: {
                show: true,
                name: 'heroicons_outline:exclamation-triangle',
                color: 'warning',
            },
            actions: {
                confirm: {
                    show: true,
                    label: 'Remove',
                    color: 'warn',
                },
                cancel: {
                    show: true,
                    label: 'Cancel',
                },
            },
            dismissible: true,
        });
        confirmation.afterClosed().subscribe((result) => {
            if (result === 'confirmed') {
                this._Service.delete(this.itemData.id).subscribe((resp) => {
                    // this.rerender();
                    this.dialogRef.close();
                });
            }
            error: (err: any) => {};
        });
    }


    onCancelClick(): void {
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

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe(async (result) => {
            // If the confirm button pressed...
            if (result === 'confirmed') {
                // this.editForm.value.status = 'reject';


                this.editForm.value.status = 'reject';
                console.log('formdata status ok', this.editForm.value.status);

                this._Service.update( this.editForm.value ).subscribe({
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

    cancelclick(): void {
        this.dialogRef.close();
    }

    openImageInNewWindow(image: string): void {
        window.open(image, '_blank');  // เปิดรูปในแท็บใหม่
    }

}
