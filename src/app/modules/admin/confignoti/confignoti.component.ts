import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfignotiService } from './confignoti.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-confignoti',
    templateUrl: './confignoti.component.html',
    styleUrls: ['./confignoti.component.scss'],
    providers: [DatePipe],
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
        private http: HttpClient,
        private datePipe: DatePipe
    ) {
        this.addForm = this.formBuilder.group({
            title: '',
            body: '',
            date: this.formBuilder.array([]),
        });
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params) => {
            // console.log(params);
            const id = params.id;

        });
        // สร้าง Reactive Form
    }
    get date() {
        return this.addForm.get("date") as FormArray;
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

    addDate(data?: any) {
        const d = this.formBuilder.group({
          day: '',
          time: this.formBuilder.array([]),
        });

        if (data) {
          d.patchValue({
            ...data,
          });
        }

        this.date.push(d);
      }
      addTime(data?: any) {
        const formvalueday = data.get("time") as FormArray;
        const t = this.formBuilder.group({
          hour: '',
        });

        if (data) {
          t.patchValue({
            ...data,
          });
        }
        formvalueday.push(t);
      }
      deletedate(){

      }
      removeDate(index: number) {
        this.date.removeAt(index);
      }
      removeTime(form: FormGroup, index: number) {
        console.log(form,index)
        const f = form.get("time") as FormArray;

        f.removeAt(index);
      }
    Submit(): void {

        const formattedData = this.addForm.value.date.map((group: any) => {
            return {
              ...group,
              day: this.datePipe.transform(group.day, 'yyyy-MM-dd')  // แปลงวันที่เป็นรูปแบบ yyyy-MM-dd
            };
          });

          const formData = {
            ...this.addForm.value,
            date: formattedData  // ใช้ข้อมูลที่แปลงแล้ว
          };

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
                    .Savedata(formData)
                    .subscribe({
                        next: (resp: any) => {
                            // this.addForm.reset()
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
