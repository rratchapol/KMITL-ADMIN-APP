import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { NewsService } from '../service/news.service';
import { MatPaginator } from '@angular/material/paginator';
import { DataTableDirective } from 'angular-datatables';

@Component({
    selector: 'app-form-dialog-news',
    templateUrl: './form-dialog.component.html',
    styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent implements OnInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;
    dtOptions: DataTables.Settings = {};
    @ViewChild(DataTableDirective)
    dtElement!: DataTableDirective;
    dataRow: any = [];   

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

    category:any;


    constructor(
        private dialogRef: MatDialogRef<FormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _service: NewsService
    ) {

        this.addForm = this.formBuilder.group({
            id: '',
            category_id: '',
            name: [''],

        });
        this.loadTable();

        this._service.getcategories().subscribe({
            next: (resp: any) => {
                console.log("categorie:::::::::",resp.data);
                this.category = resp.data;
                
            },
           
        });


    }

    ngOnInit(): void {
        console.log("console.log(this.category)",this.category)
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
                            message: "ห้ามเว้นว่างหรือมีข้อมูลนี้ในระบบแล้ว",
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

    update(): void {
    
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
       
                this._service.updatedata(formValue).subscribe({
                    next: (resp: any) => {
                        this.onCancelClick();
                    },

                    error: (err: any) => {
                        console.log(err);
                        this.addForm.enable();
                        this._fuseConfirmationService.open({
                            title: 'เกิดข้อผิดพลาด',
                            message: "ห้ามเว้นว่างหรือมีข้อมูลนี้ในระบบแล้ว",
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

      pages = { current_page: 1, last_page: 1, per_page: 10, begin: 0 };loadTable(): void {
        console.log("sssssssssssss");
    
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            serverSide: true,
            processing: true,
            order: [[0, 'desc']],
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.11.3/i18n/th.json',
            },
            ajax: (dataTablesParameters: any, callback) => {
                console.log('dataTablesParameters:', dataTablesParameters); 
                this._service.getcategory(dataTablesParameters).subscribe((resp) => {
                    console.log("ดู getpage");
    
                    // อัพเดทข้อมูลหน้าและจำนวนรายการ
                    this.pages.current_page = resp.current_page;
                    this.pages.last_page = resp.last_page;
                    this.pages.per_page = resp.per_page;
    
                    // คำนวณตำแหน่งเริ่มต้นของหน้าปัจจุบัน
                    if (parseInt(resp.current_page) > 1) {
                        this.pages.begin =
                            parseInt(resp.per_page) *
                            (parseInt(resp.current_page) - 1);
                    } else {
                        this.pages.begin = 0;
                    }
    
                    // เก็บข้อมูล category
                    this.category = resp.data;
    
                    // ส่งข้อมูลให้ DataTables
                    callback({
                        recordsTotal: resp.total,
                        recordsFiltered: resp.total,
                        data: resp.data, // ส่งข้อมูลที่ได้จาก API
                    });
                });
            },
            columns: [
                { data: 'actioon', orderable: false },
                { data: 'no', orderable: false },
                { data: 'code', orderable: false },
            ],
        };
    }
}

