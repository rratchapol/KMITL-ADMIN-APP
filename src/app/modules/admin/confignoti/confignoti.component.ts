import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfignotiService } from './confignoti.service';
import { DatePipe } from '@angular/common';
import { DataTableDirective } from 'angular-datatables';
import { MatPaginator } from '@angular/material/paginator';

@Component({
    selector: 'app-confignoti',
    templateUrl: './confignoti.component.html',
    styleUrls: ['./confignoti.component.scss'],
    providers: [DatePipe],
})
export class ConfignotiComponent implements OnInit {

     formFieldHelpers: string[] = ['fuse-mat-dense'];
     @ViewChild(MatPaginator) paginator: MatPaginator;
     dtOptions: DataTables.Settings = {};
     @ViewChild(DataTableDirective)
     dtElement!: DataTableDirective;
     dataRow: any = [];
     factoryData: any[] = [
   
     ]
 
     displayedColumns: string[] = [
         'manage',
         'no',
         'name',
         'email',
         'position',
         'phoneNumber',
         'status',
     ];
    //  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    //  @ViewChild(MatSort) sort: MatSort;
     flashMessage: null;
     flashErrorMessage: null;
     private _matDialog: any;
     constructor(

         private _router: Router,
         private _changeDetectorRef: ChangeDetectorRef,
         private _Service: ConfignotiService,
         private _fuseConfirmationService: FuseConfirmationService
     ) {
 
         // this._Service.get_factory().subscribe((resp: any)=>{
         //     this.factoryData = resp;
         // })
 
     }
 
     ngOnInit(): void {
         this.loadTable();
     }
     ngAfterViewInit() {
        //  this.dataSource.paginator = this.paginator;
        //  this.dataSource.sort = this.sort;
     }
     /** Announce the change in sort state for assistive technology. */

     // เพิ่มเมธอด editElement(element) และ deleteElement(element)
     addElement() {
         this._router.navigate(['admin/contractor/form'])
 
     }
  
 
     rerender(): void {
         this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
             dtInstance.ajax.reload();
         });
     }
     edit(Id: any) {
         this._router.navigate(['news/edit/' + Id])
     }
     // this._Service.getById(this.data).subscribe((resp: any) => {
     //     this.itemData = resp;
 
     //     this.editForm.patchValue({
     //         id: this.itemData.id,
     //         title: this.itemData.title,
     //         detail: this.itemData.detail,
     //         image: this.itemData.image,
     //         notify_status: this.itemData.notify_status,
     //         status: this.itemData.status,
     //     });
     //     console.log(this.editForm.value);
     //     this.url_pro = this.itemData.image;
     // });
     // delete(itemid: any) {
     //     this._Service.delete(itemid).subscribe();
     // }
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
                 this._Service.delete(itemid).subscribe((resp) => {
                     
                     this.rerender();
                 });
             }
             error: (err: any) => {};
         });
     }
 
     getData() {
         this.rerender();
     }
 
     pages = { current_page: 1, last_page: 1, per_page: 10, begin: 0 };
 
     loadTable(): void {
         console.log("sssssssssssss");
         const that = this;
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
                //  dataTablesParameters.status = this.status.value;
                //  dataTablesParameters.factorie = this.factory.value;
                 that._Service
                     .getPage(dataTablesParameters)
                     .subscribe((resp) => {
                         console.log("ดู getpage");
                         this.pages.current_page = resp.current_page;
                         this.pages.last_page = resp.last_page;
                         this.pages.per_page = resp.per_page;
                         if (parseInt(resp.current_page) > 1) {
                             this.pages.begin =
                                 parseInt(resp.per_page) *
                                 (parseInt(resp.current_page) - 1);
                         } else {
                             this.pages.begin = 0;
                         }
                         that.dataRow = resp.data;
 
                         callback({
                             recordsTotal: resp.total,
                             recordsFiltered: resp.total,
                             data: [],
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
