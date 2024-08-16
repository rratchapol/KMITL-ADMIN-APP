import { ChangeDetectorRef, Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { PageService } from '../page.service';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, NgClass } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule, ThemePalette } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import { NgxDropzoneModule } from 'ngx-dropzone';
@Component({
    selector: 'app-edit-dialog',
    templateUrl: './edit-dialog.component.html',
    styleUrls: ['./edit-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        MatIconModule,
        FormsModule,
        MatFormFieldModule,
        NgClass,
        MatInputModule,
        TextFieldModule,
        ReactiveFormsModule,
        MatButtonToggleModule,
        MatButtonModule,
        MatSelectModule,
        MatOptionModule,
        MatChipsModule,
        MatDatepickerModule,
        MatPaginatorModule,
        MatTableModule,
        MatRadioModule,
        CommonModule,
        MatSlideToggleModule,
        MatCardModule,
        NgxDropzoneModule
    ],
})
export class EditDialogComponent implements OnInit {
    formFieldHelpers: string[] = ['fuse-mat-dense'];
    flashMessage: 'success' | 'error' | null = null;
    editForm: FormGroup;
    positions: any[];
    factory: any[] = [];
    status: any[] = [
        {
            id: 1,
            name : 'เปิดใช้งาน'
        },{
        id: 0,
        name : 'ไม่เปิดใช้งาน'
    },
];
color: ThemePalette = 'primary';
checked = false;
disabled = false;
isInputDisabled: boolean = true;
permissions: any[] = [];
    constructor(private dialogRef: MatDialogRef<EditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _service: PageService
    ) {
        this._service.get_factory().subscribe((resp: any) => {
            this.factory = resp;
        });
        this.editForm = this.formBuilder.group({
            id: '',
            name: [''],
            phone: [''],
            email: [''],
            type: [''],
            password: [''],
            factories: this.formBuilder.array([]),
        });
     }

    ngOnInit(): void {
        this.editForm.patchValue({
            ...this.data.data,
            image : ''
        })
        console.log(this.editForm.value)
    }

    onSaveClick(): void {
        this.flashMessage = null;
        const confirmation = this._fuseConfirmationService.open({
            "title": "แก้ไขข้อมูล",
            "message": "คุณต้องการแก้ไขข้อมูลใช่หรือไม่ ",
            "icon": {
                "show": false,
                "name": "heroicons_outline:exclamation",
                "color": "warning"
            },
            "actions": {
                "confirm": {
                    "show": true,
                    "label": "ยืนยัน",
                    "color": "primary"
                },
                "cancel": {
                    "show": true,
                    "label": "ยกเลิก"
                }
            },
            "dismissible": true
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {
            if (result === 'confirmed') {
                const updatedData = this.editForm.value;
                this._service.update(updatedData, this.data.data.id).subscribe({
                    next: (resp: any) => {
                        this.showFlashMessage('success');
                        this.dialogRef.close(resp);
                    },
                    error: (err: any) => {
                        this.editForm.enable();
                        this._fuseConfirmationService.open({
                            "title": "กรุณาระบุข้อมูล",
                            "message": err.error.message,
                            "icon": {
                                "show": true,
                                "name": "heroicons_outline:exclamation",
                                "color": "warning"
                            },
                            "actions": {
                                "confirm": {
                                    "show": false,
                                    "label": "ยืนยัน",
                                    "color": "primary"
                                },
                                "cancel": {
                                    "show": false,
                                    "label": "ยกเลิก",

                                }
                            },
                            "dismissible": true
                        });
                    }
                })
            }
        })


        // แสดง Snackbar ข้อความ "complete"

    }

    onCancelClick(): void {

        this.dialogRef.close();
    }

    showFlashMessage(type: 'success' | 'error'): void {
        // Show the message
        this.flashMessage = type;

        // Mark for check
        this._changeDetectorRef.markForCheck();

        // Hide it after 3 seconds
        setTimeout(() => {

            this.flashMessage = null;

            // Mark for check
            this._changeDetectorRef.markForCheck();
        }, 3000);
    }

    files: File[] = [];
    onSelect(event: { addedFiles: File[] }): void {
        this.files.push(...event.addedFiles);
    }

    onRemove(file: File): void {
        const index = this.files.indexOf(file);
        if (index >= 0) {
            this.files.splice(index, 1);
        }
    }

    addFactory(factoryId: number) {
        const factories = this.editForm.get('factories') as FormArray;
    
        // ตรวจสอบว่า factoryId มีอยู่ใน FormArray หรือไม่
        const index = factories.value.findIndex((value: any) => value.factorie_id === factoryId);
    
        if (index === -1) {
            const value = this.formBuilder.group({
                factorie_id: factoryId,
            }); 
          factories.push(value);
        } else {
          // ถ้ามีอยู่แล้วให้ลบออก
          factories.removeAt(index);
        }
      }
}
