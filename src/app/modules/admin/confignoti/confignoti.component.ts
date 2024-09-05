import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfignotiService } from './confignoti.service';

@Component({
    selector: 'app-confignoti',
    templateUrl: './confignoti.component.html',
    styleUrls: ['./confignoti.component.scss'],
})
export class ConfignotiComponent implements OnInit {
    isLoading: boolean = false;
    formFieldHelpers: string[] = ['fuse-mat-dense'];
    addForm: FormGroup;
    permissiondata: any[];
    item: any;
    imageUrls: string[] = [];
    config = {
        placeholder: '',
        tabsize: 2,
        height: '200px',
        uploadImagePath: '/api/upload',
        toolbar: [
            ['misc', ['codeview', 'undo', 'redo']],
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['fontsize', ['fontname', 'fontsize']],
            ['para', ['ul', 'ol', 'paragraph', 'height']],
            ['insert'],
        ],
        fontNames: [
            'Helvetica',
            'Arial',
            'Arial Black',
            'Comic Sans MS',
            'Courier New',
            'Roboto',
            'Times',
        ],
    };
    constructor(
        private _router: Router,
        private formBuilder: FormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _service: ConfignotiService,
        public activatedRoute: ActivatedRoute,
        private http: HttpClient
    ) {
        this.addForm = this.formBuilder.group({
            title: '',
            body: '',

        });
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params) => {
            // console.log(params);
            const id = params.id;

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
            title: 'บันทึกข้อมูล',
            message: 'คุณต้องการบันทึกข้อมูลใช่หรือไม่ ?',
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
                // const formData = new FormData();
                // Object.entries(this.addForm.value).forEach(
                //     ([key, value]: any[]) => {
                //         if (value !== '' && value !== 'null' && value !== null){
                //             formData.append(key, value);
                //         }
                //     }
                // );
                this._service
                    .Savedata(this.addForm.value)
                    .subscribe({
                        next: (resp: any) => {
                            this.addForm.reset()
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
        this._router.navigateByUrl('config/edit/1').then(() => {});
    }

    files: File[] = [];
    url_logo: string;
    onSelect(event: { addedFiles: File[] }): void {
        this.files.push(...event.addedFiles);
        this.imageUrls = [];
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
        this._router.navigate(['config/edit/1']);
    }
}
