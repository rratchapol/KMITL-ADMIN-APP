import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    contractorType: any[] = [];
    factory: any[] = [
    ];
    status: any[]=[

        {
            code: 'Yes',
            name: 'เปิดใช้งาน',
        },
        {
            code: 'No',
            name: 'ปิดใช้งาน',
        },
      
    ];


    constructor(
        private dialogRef: MatDialogRef<FormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _service: NewsService
    ) {
        this._service.getFeature().subscribe((resp: any)=>{
            this.contractorType = resp;
        })
        this._service.get_factory().subscribe((resp: any)=>{
            this.factory = resp;
        })
        this.addForm = this.formBuilder.group({
            id: '',
            name: [''],
            phone: [''],
            detail: [''],
            status: ['Yes'],
            features: this.formBuilder.array([]),
            factories: this.formBuilder.array([]),

        });
    }

    ngOnInit(): void {

        if(this.data) {
            this.addForm.patchValue({
                ...this.data
            })  
            this.data.features.forEach((data:any)=>{
                const features = this.addForm.get('features') as FormArray;
                const a = this.formBuilder.group({
                    feature_id: data.feature_id
                
                });
                features.push(a);
            })
            this.data.factories.forEach((data:any)=>{
                const factories = this.addForm.get('factories') as FormArray;
                const a = this.formBuilder.group({
                    factorie_id: data.factorie_id
                
                });
                factories.push(a);
              
            })
            console.log('data',this.addForm.value);
            
            this._changeDetectorRef.detectChanges();
            
        }


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

    Submit(): void {
    
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
               let formValue = this.addForm.value
       
                this._service.Savedata(formValue).subscribe({
                    next: (resp: any) => {
                        this.onCancelClick();
                    },

                    error: (err: any) => {
                        console.log(err);
                        this.addForm.enable();
                        this._fuseConfirmationService.open({
                            title: 'เกิดข้อผิดพลาด',
                            message: "เบอร์โทรศัพท์นี้มีแล้วในระบบ",
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


    addFeature(featureId: number) {
        const features = this.addForm.get('features') as FormArray;
    
        // ตรวจสอบว่า featureId มีอยู่ใน FormArray หรือไม่
        const index = features.value.findIndex((value: any) => value.feature_id === featureId);
        console.log(index)
        if (index === -1) {
            const value = this.formBuilder.group({
                feature_id: featureId,
            }); 
          features.push(value);
        } else {
          // ถ้ามีอยู่แล้วให้ลบออก
          features.removeAt(index);
        }
      }
    
      // ฟังก์ชันสำหรับการเพิ่ม factory จาก checkbox
      addFactory(factoryId: number) {
        const factories = this.addForm.get('factories') as FormArray;
    
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

      isFactoryChecked(factorie_id: number): boolean {
        const factoriesFormArray = this.addForm.get('factories') as FormArray;
        return factoriesFormArray.value.some((value: any) => value.factorie_id === factorie_id);
      }

      isFeatureChecked(featureId: number): boolean {
        const features = this.addForm.get('features') as FormArray;
        return features.value.some((value: any) => value.feature_id === featureId);
      }
}

