import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Route, Router } from '@angular/router';
import { SupplierService } from '../service/supplier.service';
import { DataTableDirective } from 'angular-datatables';
import { EditComponent } from '../edit/edit.component';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { PictureComponent } from '../picture/picture.component';
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
    @ViewChild(MatPaginator) paginator: MatPaginator;
    dtOptions: DataTables.Settings = {};
    @ViewChild(DataTableDirective)
    dtElement!: DataTableDirective;
    dataRow: any = [];

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
        private _Service: SupplierService,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}

    ngOnInit(): void {
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

    nextpage() {
        this._router.navigate(['news/form']);
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

    rerender(): void {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.ajax.reload();
        });
    }
    edit(Id: any) {
        this._router.navigate(['admin/supplier/edit/' + Id]);
    }
    addElement() {
        this._router.navigate(['admin/supplier/form']);
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
    pages = { current_page: 1, last_page: 1, per_page: 10, begin: 0 };

    loadTable(): void {
        const that = this;
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 25,
            serverSide: true,
            processing: true,
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.11.3/i18n/th.json',
            },
            ajax: (dataTablesParameters: any, callback) => {
                dataTablesParameters.type = 'Good';
                that._Service
                    .getPage(dataTablesParameters)
                    .subscribe((resp: any) => {
                        this.dataRow = resp.data;
                        this.pages.current_page = resp.current_page;
                        this.pages.last_page = resp.last_page;
                        this.pages.per_page = resp.per_page;
                        if (resp.current_page > 1) {
                            this.pages.begin =
                                resp.per_page * resp.current_page - 1;
                        } else {
                            this.pages.begin = 0;
                        }

                        callback({
                            recordsTotal: resp.total,
                            recordsFiltered: resp.total,
                            data: [],
                        });
                        this._changeDetectorRef.markForCheck();
                    });
            },
            columns: [
                { data: 'action', orderable: false },
                { data: 'No' },
                { data: 'code' },
                { data: 'date' },
                { data: 'client' },
                { data: 'total_price' },
                { data: 'create_by' },
                { data: 'created_at' },
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
