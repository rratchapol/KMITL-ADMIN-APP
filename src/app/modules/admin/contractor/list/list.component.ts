import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Route, Router } from '@angular/router';
import { NewsService } from '../service/news.service';
import { DataTableDirective } from 'angular-datatables';
import { EditComponent } from '../edit/edit.component';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { PictureComponent } from '../picture/picture.component';
import { FormControl } from '@angular/forms';
import { Location } from '@angular/common';
// import { log } from 'console';
declare var jQuery: any;
export interface PeriodicElement {
    no: number;
    name: string;
    email: string;
    position: string;
    phoneNumber: string;
    status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
    selector: 'app-list-news',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
    status = new FormControl('');    
    factory = new FormControl('');    
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
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    @ViewChild(MatSort) sort: MatSort;
    flashMessage: null;
    flashErrorMessage: null;
    private _matDialog: any;
    constructor(
        private dialog: MatDialog,
        private _liveAnnouncer: LiveAnnouncer,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef,
        private _Service: NewsService,
        private _fuseConfirmationService: FuseConfirmationService,
        private location: Location
    ) {

        // this._Service.get_factory().subscribe((resp: any)=>{
        //     this.factoryData = resp;
        // })

    }

    ngOnInit(): void {
        this.location.replaceState('/admin/tag');
        this.loadTable();
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    /** Announce the change in sort state for assistive technology. */
    announceSortChange(sortState: Sort) {
        // This example uses English messages. If your application supports
        // multiple language, you would internationalize these strings.
        // Furthermore, you can customize the message to add additional
        // details about the values being sorted.
        if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this._liveAnnouncer.announce('Sorting cleared');
        }
    }

    // เพิ่มเมธอด editElement(element) และ deleteElement(element)
    addElement() {
        this._router.navigate(['admin/contractor/form'])

    }
    editElement(element: any) {
        const dialogRef = this.dialog.open(EditDialogComponent, {
            width: '400px', // กำหนดความกว้างของ Dialog
            height: 'auto',
            data: element, // ส่งข้อมูลเริ่มต้นไปยัง Dialog
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                alert(1);
                // เมื่อ Dialog ถูกปิด ดำเนินการตามผลลัพธ์ที่คุณได้รับจาก Dialog
            }
        });
    }
    editDailog(id: any): void {
        this.dialog
            .open(EditDialogComponent, {
                width: '500px', // กำหนดความกว้างของ Dialog
                height: 'auto',

                disableClose: false,
                autoFocus: false,

                data: id,
            })
            .afterClosed()
            .subscribe((res) => {
                //console.log('Product', res);
                this.rerender();
                // this.rerender();

                /**ถ้าส่ง successfull มาจะทำการรีโหลดตาราง */
            });
    }

    addDialog() : void{
        this.dialog
            .open(FormDialogComponent, {
                width: '500px', // กำหนดความกว้างของ Dialog
                height: 'auto',
                disableClose: false,
                autoFocus: false,
            })
            .afterClosed()
            .subscribe((res) => {
                //console.log('Product', res);
                this.rerender();
                // this.rerender();

                /**ถ้าส่ง successfull มาจะทำการรีโหลดตาราง */
            });
    }

    editDialog(data: any) : void{
        this.dialog
            .open(FormDialogComponent, {
                width: '700px', // กำหนดความกว้างของ Dialog
                height: 'auto',
                disableClose: false,
                autoFocus: false,
                data: data
            })
            .afterClosed()
            .subscribe((res) => {
                //console.log('Product', res);
                this.rerender();
                // this.rerender();

                /**ถ้าส่ง successfull มาจะทำการรีโหลดตาราง */
            });
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
            order: [[0, 'asc']],
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.11.3/i18n/th.json',
            },
            ajax: (dataTablesParameters: any, callback) => {
                dataTablesParameters.status = this.status.value;
                dataTablesParameters.factorie = this.factory.value;
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
    showPicture(imgObject: any): void {
        this.dialog
            .open(PictureComponent, {
                autoFocus: false,
                data: {
                    imgSelected: imgObject,
                },
            })
            .afterClosed()
            .subscribe(() => {});
    }
}
