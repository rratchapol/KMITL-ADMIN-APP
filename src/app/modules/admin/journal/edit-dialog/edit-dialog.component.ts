import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JournalService } from '../service/journal.service';
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
        private _Service: JournalService,
        private _fuseConfirmationService: FuseConfirmationService
    ) {console.log("doo id",localStorage.getItem('user')); }

    ngOnInit(): void {
        console.log("doo id",this.data);
        this.editForm = this.formBuilder.group({
            id: [localStorage.getItem('user')],
            name: ['', [Validators.required]],
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
        });
        this._Service.getById(localStorage.getItem('user')).subscribe((resp: any) => {
            this.itemData = resp;
            console.log("this.itemData",this.itemData[0].name);
            this.editForm.patchValue({
                id: this.itemData[0].id,
                name: this.itemData[0].name,
                username: this.itemData[0].username,
                // password: this.itemData.password,

            });
            console.log(this.editForm.value);
        });
    }

 

    onSaveClick(): void {
        if (this.editForm.valid) {
            const updatedData = this.editForm.value;
            this.dialogRef.close(updatedData);
            // แสดง SweetAlert2 ข้อความ "complete"
        }

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
    
        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe(async (result) => {
            // If the confirm button pressed...
            if (result === 'confirmed') {
                // Extract individual values from formData
                const { name, username, password, id } = this.editForm.value;
    
                // Pass the individual values to the update method
                this._Service.updates(name, username, password, id).subscribe({
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
    


}
