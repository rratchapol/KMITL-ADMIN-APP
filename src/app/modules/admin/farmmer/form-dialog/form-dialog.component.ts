import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { NewsService } from '../service/news.service';

@Component({
    selector: 'app-form-dialog-news',
    templateUrl: './form-dialog.component.html',
    styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent implements OnInit {

    formFieldHelpers: string[] = ['fuse-mat-dense'];
    addForm: FormGroup;
    permissiondata: any[];
    constructor(
        private dialogRef: MatDialogRef<FormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _service: NewsService
    ) {
        this.addForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            address: ['', [Validators.required]],
        });
    }

    ngOnInit(): void {
        // สร้าง Reactive Form
        this._service.getPermission().subscribe((res: any) => {
            this.permissiondata = res;
            console.log(this.permissiondata);
        });
    }

    onSaveClick(): void {
        if (this.addForm.valid) {
            const updatedData = this.addForm.value;
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
        console.log(this.onFileChange);
        console.log(event);
        this.selectedFile = (event.target as HTMLInputElement).files[0];

        // if (this.selectedFile) {
        //     // ปรับให้เก็บข้อมูลที่คุณต้องการ ในที่นี้เป็นชื่อไฟล์
        //     this.addForm.patchValue({ image: this.selectedFile.name });
        // }
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
            
            if (result === 'confirmed') {
                const formData = new FormData();
                Object.entries(this.addForm.value).forEach(
                    ([key, value]: any[]) => {
                        formData.append(key, value);
                        if (key === 'image') {
                            formData.append(key, this.selectedFile);
                        }
                    }
                );
                this._service.Savedata(formData).subscribe({
                    next: (resp: any) => {
                        this.onCancelClick();
                    },

                    error: (err: any) => {
                        console.log(err);
                        this.addForm.enable();
                        this._fuseConfirmationService.open({
                            title: 'เกิดข้อผิดพลาด',
                            message: "กรุณาตรวจสอบข้อมูลให้ถูกต้องและต้องไม่ซ้ำกับในระบบ",
                            icon: {
                                show: true,
                                name: 'heroicons_outline:exclamation',
                                color: 'warning',
                            },
                            actions: {
                                confirm: {
                                    show: false,
                                    label: 'Confirm',
                                    color: 'primary',
                                },
                                cancel: {
                                    show: false,
                                    label: 'Cancel',
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
    files: File[] = [];
    url_logo: string;
    onSelect(event: { addedFiles: File[] }): void {
        this.files.push(...event.addedFiles);
        const file =  this.files[0];
        this.addForm.patchValue({
            image: file
        });
    }

    onRemove(file: File): void {
        const index = this.files.indexOf(file);
        if (index >= 0) {
            this.files.splice(index, 1);
        }
    }
    

}

