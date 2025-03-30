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
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
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
    formFieldHelpers: string[] = ['fuse-mat-dense'];
    isLoading: boolean = false;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    dtOptions: DataTables.Settings = {};
    @ViewChild(DataTableDirective)
    dtElement!: DataTableDirective;
    dataRow: any = [];
    numbers: number[] = [];
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
    province: any[] = [];
    farmmer: any[] = []
    data = new FormControl('1');
    searchTerm: string = '';
    currentPage: number = 1;
    totalPages: number = 1;
    quotas: any[] = []
    months: any[] = []

    constructor(
        private dialog: MatDialog,
        private _liveAnnouncer: LiveAnnouncer,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef,
        private _Service: NewsService,
        private _fuseConfirmationService: FuseConfirmationService,
        private location: Location
    ) {
 

    }

    ngOnInit(): void {
        this.location.replaceState('/admin/location');
        this.loadTable();

    }

    // ฟังก์ชันที่เรียกใช้เมื่อต้องการค้นหา
    searchFarmers(): void {
        this._Service.getAPIFarmmer(this.searchTerm, this.currentPage).subscribe((resp: any) => {
            this.farmmer = resp;
            this.quotas = [];
            this.farmmer.forEach(element => {
                this.quotas.push(element.Quota_id);

            });

            this._Service.getEvents(this.quotas).subscribe((resp: any) => {
                this.months = resp;
                console.log(this.months);
            });
            this._changeDetectorRef.markForCheck();
        });
    }

    // ฟังก์ชันที่เรียกใช้เมื่อมีการเปลี่ยนแปลงข้อความใน input
    onSearchChange(searchValue: string): void {
        this.searchTerm = searchValue;
        this.currentPage = 1;
        this.searchFarmers();
    }

    loadFarmers(): void {
        this._Service.getAPIFarmmer(this.searchTerm, this.currentPage).subscribe((resp: any) => {
            this.farmmer = resp;
            this.quotas = [];
            this.farmmer.forEach(element => {
                this.quotas.push(element.Quota_id);

            });

            this._Service.getEvents(this.quotas).subscribe((resp: any) => {
                this.months = resp;
                console.log(this.months);
            });
            // console.log(this.quotas);
            console.log("เปลี่ยนหน้า page, this.farmmer", this.farmmer);
            this.totalPages = resp.length
            console.log("เปลี่ยนหน้า page, this.farmmer", this.totalPages);
            this._changeDetectorRef.markForCheck();
        });
    }

    changePage(page: number): void {
        if (page >= 1) {
            this.currentPage = page;
            this.loadFarmers();
            console.log("เปลี่ยนหน้า page", this.farmmer);
        }
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
        // const menu = getpermission.find((e) => e.menu_id == 4);
        // return menu.edit == 0;
    }
    hiddenDelete() {
        // const getpermission = JSON.parse(localStorage.getItem('permission'));
        // const menu = getpermission.find((e) => e.menu_id == 4);
        // return menu.delete == 0;
    }
    hiddenSave() {
        // const getpermission = JSON.parse(localStorage.getItem('permission'));
        // const menu = getpermission.find((e) => e.menu_id == 4);
        // return menu.save == 0;
    }
    addElement() {
        // this._router.navigate(['employee/form'])
        const dialogRef = this.dialog.open(FormDialogComponent, {
            width: '600px', // กำหนดความกว้างของ Dialog
            height: 'auto',
        });

        dialogRef.afterClosed().subscribe((result) => {
            this.rerender();
        });
    }
    nextpage() {
        this._router.navigate(['news/form']);
    }

    goToProfile(id: string) {
        this._router.navigate(['profile/page/edit/' + id]);
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
        this._router.navigate(['news/edit/' + Id]);
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
            error: (err: any) => { };
        });
    }
    dataTablesParameters: any
    pages = { current_page: 1, last_page: 1, per_page: 10, begin: 0 };
    loadTable(): void {
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
                that._Service.getPage(dataTablesParameters).subscribe((resp) => {
                    // this.dataRow = resp.data;
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
                    this._changeDetectorRef.markForCheck();

                    callback({
                        recordsTotal: resp.total,
                        recordsFiltered: resp.total,
                        data: [],
                    });
                });
            },
            // columns: [
            //     { data: 'id_card_number', orderable: false },
            //     { data: 'name', orderable: false },
            //     { data: 'qouta', orderable: false },
            // ],
        };
    }
}
