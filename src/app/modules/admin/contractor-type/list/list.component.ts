import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Route, Router } from '@angular/router';
import { VendorService } from '../service/vendor.service';
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

const ELEMENT_DATA: PeriodicElement[] = [
    {
        no: 1,
        name: 'ศรีวรรณ สุขสวัสดิ์',
        email: 'sriwan@example.com',
        position: 'แอดมิน',
        phoneNumber: '081-234-5678',
        status: 'active',
    },
    {
        no: 2,
        name: 'สมใจ แสนสุข',
        email: 'somjai@example.com',
        position: 'ช่าง',
        phoneNumber: '082-345-6789',
        status: 'inactive',
    },
    {
        no: 3,
        name: 'เพชร รักสันต์',
        email: 'phetch@example.com',
        position: 'แอดมิน',
        phoneNumber: '083-456-7890',
        status: 'active',
    },
    {
        no: 4,
        name: 'ประภาพ วิไลภักดี',
        email: 'prapap@example.com',
        position: 'ช่าง',
        phoneNumber: '084-567-8901',
        status: 'inactive',
    },
    {
        no: 5,
        name: 'วรรณี หาคม',
        email: 'waranee@example.com',
        position: 'แอดมิน',
        phoneNumber: '085-678-9012',
        status: 'active',
    },
    {
        no: 6,
        name: 'สุขใจ ใจดี',
        email: 'sukjai@example.com',
        position: 'ช่าง',
        phoneNumber: '086-789-0123',
        status: 'inactive',
    },
    {
        no: 7,
        name: 'รัชนี สว่างใจ',
        email: 'rachnee@example.com',
        position: 'แอดมิน',
        phoneNumber: '087-890-1234',
        status: 'active',
    },
    {
        no: 8,
        name: 'พรทิพย์ ร่ำรวย',
        email: 'phonthip@example.com',
        position: 'ช่าง',
        phoneNumber: '088-901-2345',
        status: 'inactive',
    },
    {
        no: 9,
        name: 'วิทยา สุขใจ',
        email: 'witthaya@example.com',
        position: 'แอดมิน',
        phoneNumber: '089-012-3456',
        status: 'active',
    },
    {
        no: 10,
        name: 'นวลแก้ว สุขสันต์',
        email: 'nawalek@example.com',
        position: 'ช่าง',
        phoneNumber: '090-123-4567',
        status: 'inactive',
    },
];

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
    selector: 'app-list-vendor',
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

    data = [
        {
            id: 1,
            name: 'รับจ้างปลูกอ้อย',
        },
        {
            id: 2,
            name: 'รับจ้างเตรียมดิน'
        },
        {
            id: 3,
            name: 'รับจ้างเหมาปลูก'
        },
        {
            id: 4,
            name: 'รับจ้างให้น้ำ'
        },
        {
            id: 5,
            name: 'รับจ้างดูแลรักษา'
        },
        {
            id: 6,
            name: 'รับจ้างเก็บเกี่ยว'
        },
        {
            id: 7,
            name: '+'
        },
    ];

    constructor(
        private dialog: MatDialog,
        private _liveAnnouncer: LiveAnnouncer,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef,
        private _Service: VendorService,
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
    hiddenEdit() {
        // const getpermission = JSON.parse(localStorage.getItem('permission'));
        // const menu = getpermission.find((e) => e.menu_id == 7);
        // return menu.edit == 0;
    }
    hiddenDelete() {
        // const getpermission = JSON.parse(localStorage.getItem('permission'));
        // const menu = getpermission.find((e) => e.menu_id == 7);
        // return menu.delete == 0;
    }
    hiddenSave() {
        // const getpermission = JSON.parse(localStorage.getItem('permission'));
        // const menu = getpermission.find((e) => e.menu_id == 7);
        // return menu.save == 0;
    }

    addElement() {
        // this._router.navigate(['employee/form'])
        const dialogRef = this.dialog.open(FormDialogComponent, {
            width: '500px', // กำหนดความกว้างของ Dialog
            height: 'auto',
        });

        dialogRef.afterClosed().subscribe((result) => {
            this.rerender();
        });
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
    nextpage() {
        this._router.navigate(['vendor/form']);
    }
    edit(Id: any) {
        this._router.navigate(['vendor/edit/' + Id]);
    }
    rerender(): void {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.ajax.reload();
        });
    }
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
        that._Service
        .getPage({
            "draw": 1,
            "order": [
                {
                    "column": 0,
                    "dir": "asc"
                }
            ],
            "start": 0,
            "length": 10,
            "search": {
                "value": "",
                "regex": false
            }
        })
        .subscribe((resp) => {
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

        });
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
