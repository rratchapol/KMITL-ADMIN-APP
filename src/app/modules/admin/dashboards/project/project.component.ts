import { CommonModule, CurrencyPipe, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { ProjectService } from 'app/modules/admin/dashboards/project/project.service';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';
import { Subject, takeUntil } from 'rxjs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { ShareModule } from 'app/modules/share.module';
import { NewsService } from '../../farmmer/service/news.service';
import { ThaiDatePipe } from 'app/shared/date-thai.component.pipe';
import interactionPlugin from '@fullcalendar/interaction';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';

@Component({
    selector: 'project',
    templateUrl: './project.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        DataTablesModule,
        TranslocoModule,
        MatIconModule,
        MatButtonModule,
        MatRippleModule,
        MatMenuModule,
        MatTabsModule,
        MatButtonToggleModule,
        NgApexchartsModule,
        NgFor,
        NgIf,
        MatTableModule,
        NgClass,
        CurrencyPipe,
        MatStepperModule,
        MatFormFieldModule,
        MatStepperModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        MatButtonModule,
        MatCheckboxModule,
        MatRadioModule,
        FullCalendarModule,
        ShareModule,
        ThaiDatePipe,
        CommonModule
    ],
    providers: [ThaiDatePipe, DatePipe]
})
export class ProjectComponent implements OnInit, OnDestroy {
    dtOptions: DataTables.Settings = {};
    @ViewChild(DataTableDirective)
    dtElement!: DataTableDirective;
    dataRow: any = [];

    // range = new FormGroup({
    //     start: new FormControl<Date | null>(null),
    //     end: new FormControl<Date | null>(null),
    // });

    calendarOptions: CalendarOptions = {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        // weekends: false,
        events: [
            { title: 'บิลอ้อย : 12447', start: '2024-02-26', end: '2024-02-28' },
            { title: 'บิลอ้อย : 12447', start: '2024-02-23', },
            { title: 'บิลอ้อย : 12447', start: '2024-02-21' },
            { title: 'บิลอ้อย : 12447', start: '2024-02-20' },
        ]
    };
    calendarOptions1: CalendarOptions = {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
    };
    chartGithubIssues: ApexOptions = {};
    chartTaskDistribution: ApexOptions = {};
    chartBudgetDistribution: ApexOptions = {};
    chartWeeklyExpenses: ApexOptions = {};
    chartMonthlyExpenses: ApexOptions = {};
    chartYearlyExpenses: ApexOptions = {};
    data: any;
    selectedProject: string = 'ACME Corp. Backend App';
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    firstFormGroup = this._formBuilder.group({
        firstCtrl: [],
    });
    secondFormGroup = this._formBuilder.group({
        secondCtrl: [],
    });
    isLinear = false;
    verticalStepperForm: UntypedFormGroup;

    // calendarOptions: CalendarOptions = {
    //     plugins: [dayGridPlugin],
    //     initialView: 'dayGridMonth',
    //     weekends: false,
    //     events: [{ title: 'Meeting', start: new Date() }],
    // };
    events: any[] = []
    timelineData: any[] = [
        {
            year: '2566/2565',
            product: '72 ตัน',
            product1: '75 ตัน',
            product2: '50 แปลง',
            product3: '30 ไร่',
            product4: '30 ไร่',
            product5: '10 ไร่',
            product6: '10 ตัน/ไร่',
            ccs: '11.13',
        },
        {
            year: '2566/2565',
            product: '72 ตัน',
            product1: '75 ตัน',
            product2: '50 แปลง',
            product3: '30 ไร่',
            product4: '30 ไร่',
            product5: '10 ไร่',
            product6: '10 ตัน/ไร่',
            ccs: '11.13',
        },
        {
            year: '2566/2565',
            product: '72 ตัน',
            product1: '75 ตัน',
            product2: '50 แปลง',
            product3: '30 ไร่',
            product4: '30 ไร่',
            product5: '10 ไร่',
            product6: '10 ตัน/ไร่',
            ccs: '11.13',
        },
        {
            year: '2566/2565',
            product: '72 ตัน',
            product1: '75 ตัน',
            product2: '50 แปลง',
            product3: '30 ไร่',
            product4: '30 ไร่',
            product5: '10 ไร่',
            product6: '10 ตัน/ไร่',
            ccs: '11.13',
        },
    ];
    timelineData1: any[] = [
        {
            date: '20-12-2024',
            time: '08.00 น.',
            event: 'กำจัด วัชพืช'
        },
        {
            date: '20-12-2024',
            time: '08.00 น.',
            event: 'กำจัด วัชพืช'
        },
        {
            date: '20-12-2024',
            time: '08.00 น.',
            event: 'กำจัด วัชพืช'
        },
        {
            date: '20-12-2024',
            time: '08.00 น.',
            event: 'กำจัด วัชพืช'
        },
        {
            date: '20-12-2024',
            time: '08.00 น.',
            event: 'กำจัด วัชพืช'
        },


    ];
    Id: number;
    public itemData: any;
    public ccsData: any;
    /**
     * Constructor
     */
    constructor(
        private _projectService: ProjectService,
        private _router: Router,
        private _formBuilder: FormBuilder,
        public activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _farmmerService: NewsService,
        private cdr: ChangeDetectorRef,
        private datePipe: DatePipe
    ) {

        this.verticalStepperForm = this._formBuilder.group({
            step1: this._formBuilder.group({
                email: ['', [Validators.required, Validators.email]],
                country: ['', Validators.required],
                language: ['', Validators.required],
            }),
            step2: this._formBuilder.group({
                firstName: ['', Validators.required],
                lastName: ['', Validators.required],
                userName: ['', Validators.required],
                about: [''],
            }),
            step3: this._formBuilder.group({
                byEmail: this._formBuilder.group({
                    companyNews: [true],
                    featuredProducts: [false],
                    messages: [true],
                }),
                pushNotifications: ['everything', Validators.required],
            }),
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    range: FormGroup;
    startday: any;
    endday: any;
    startdate: any;
    enddate: any;
    cane: any;
    searchInputControl: FormControl = new FormControl();
    activityControl: FormControl = new FormControl();
    plotControl: FormControl = new FormControl();

    activity: any;
    imageUrl = "https://page365.zendesk.com/hc/article_attachments/900009033263/______________.jpg";
    ngOnInit(): void {
        this.range = this._formBuilder.group({
            start: [''],
            end: ['']
        });
        // this._farmmerService.getsugarcane(this.Id).subscribe((resp: any) => {
        //     this.cane = resp.data
        //     console.log("ดู กิจกรรมมม", this.cane);

        // });
        console.log("aaaaaaaaa", this.ccsData);

        const currentDate = new Date();
        this.updateDates(currentDate);
        const startOfMonth = this.getCurrentMonthStartDate(currentDate);
        const endOfMonth = this.getCurrentMonthEndDate(currentDate);
        console.log('Start of month:', startOfMonth);
        console.log('End of month:', endOfMonth);

        this.activatedRoute.params.subscribe((params) => {
            // console.log(params);
            this.Id = params.id;
            this._changeDetectorRef.markForCheck();
            this._farmmerService.getAPIFarmmer().subscribe((resp: any) => {
                const data1 = resp.find(item => item.Quota_id === 285)
                console.log('ata', data1)
                this.itemData = resp.find(item => item.Quota_id === +this.Id)
                console.log('item_data', this.itemData)
            });

            // this._farmmerService.getAPICCS(this.Id,this.startdate,this.enddate).subscribe((resp: any) => {
            //     this.ccsData = resp
            //     console.log('ccs_data',this.ccsData);

            //     this.ccsData.map(item => {
            //         const data = {
            //             start:  item.CCS_Date,
            //             title: item.bill_no
            //         }
            //         this.events.push(data)
            //     })
            //     console.log("event in",this.events)
            // })
            // this.calendarOptions = {
            //     plugins: [dayGridPlugin, interactionPlugin],
            //     initialView: 'dayGridMonth',
            //     selectable: true,
            //     // initialDate: this.getCurrentMonthEndDate(),
            //     datesSet: this.handleDatesSet.bind(this),
            //     // dateClick: this.handleDateClick.bind(this), // bind method to maintain `this` context
            //     select: this.handleDateSelect.bind(this),
            //     // weekends: false,
            //     events: this.events
            //   };
            this.loadCCSData();
            this.loadmyplot();
            this.initializeCalendar();
            this.plotCalendar();

        });


        // Get the data
        this._projectService.data$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) => {
                console.log(this.data)
                // Store the data
                this.data = data;

                // Prepare the chart data
                this._prepareChartData();
            });

        // Attach SVG fill fixer to all ApexCharts
        window['Apex'] = {
            chart: {
                events: {
                    mounted: (chart: any, options?: any): void => {
                        this._fixSvgFill(chart.el);
                    },
                    updated: (chart: any, options?: any): void => {
                        this._fixSvgFill(chart.el);
                    },
                },
            },
        };
    }

    profile:any;
    myplots:any;
    onTabChange(event: any) {
        const selectedTabIndex = event.index;
        const tabLabel = event.tab.textLabel;

        console.log(`Selected Tab Index: ${selectedTabIndex}`);
        console.log(`Selected Tab Label: ${tabLabel}`);
        if (selectedTabIndex == 0) {}
        if (selectedTabIndex == 1) {
            this._farmmerService.profile(this.Id, this.startdate, this.enddate).subscribe((resp: any) => {
                this.profile = resp
                console.log("ดู กิจกรรมมม", this.profile);

            });
        }
        if (selectedTabIndex == 2) {
            this._farmmerService.plot(this.Id, this.startdate, this.enddate).subscribe((resp: any) => {
                this.cane = resp.data
                console.log("ดู กิจกรรมมม", this.cane);

            });
        }
        if (selectedTabIndex == 3) {
            this.range = this._formBuilder.group({
                start: [''],
                end: ['']
            });
            this.sugartype = "อ้อยปลูกใหม่";
            this._farmmerService.getsugarcane(this.Id, this.startdate, this.enddate, this.sugartype, this.search, this.plot, this.activitys).subscribe((resp: any) => {
                this.cane = resp.data
                console.log("ดู กิจกรรมมม", this.cane);

            });
            this.searchInputControl.valueChanges.subscribe(value => {
                this.search = value;
                console.log(this.search);  // เพื่อตรวจสอบค่า search ใน console
                this._farmmerService.getsugarcane(this.Id, this.startdate, this.enddate, this.sugartype, this.search, this.plot, this.activitys).subscribe((resp: any) => {
                    this.cane = resp.data
                    console.log("ดู กิจกรรมมม", this.cane);

                });
            });
            this.activityControl.valueChanges.subscribe(value => {
                this.activitys = value;
                console.log(this.activitys);  // เพื่อตรวจสอบค่า activitys ใน console
                this._farmmerService.getsugarcane(this.Id, this.startdate, this.enddate, this.sugartype, this.search, this.plot, this.activitys).subscribe((resp: any) => {
                    this.cane = resp.data
                    console.log("ดู กิจกรรมมม", this.cane);

                });
            });
            this.plotControl.valueChanges.subscribe(value => {
                this.plot = value;
                console.log(this.plot);  // เพื่อตรวจสอบค่า activitys ใน console
                this._farmmerService.getsugarcane(this.Id, this.startdate, this.enddate, this.sugartype, this.search, this.plot, this.activitys).subscribe((resp: any) => {
                    this.cane = resp.data
                    console.log("ดู กิจกรรมมม", this.cane);

                });
            });
            this.range.valueChanges.subscribe(val => {
                if (val.start) {
                    this.startday = this.datePipe.transform(val.start, 'yyyy-MM-dd');
                    console.log("เริ่มวันนน", this.startday);
                }
                if (val.end) {
                    this.endday = this.datePipe.transform(val.end, 'yyyy-MM-dd');
                    console.log("สิ้นสุดวันนน", this.endday);
                }
                console.log(`Start Date: ${this.startday}, End Date: ${this.endday}`);  // เพื่อตรวจสอบค่าใน console

                if (val.start && val.end) {
                    this._farmmerService.getsugarcane(this.Id, this.startdate, this.enddate, this.sugartype, this.search, this.plot, this.activitys).subscribe((resp: any) => {
                        this.cane = resp.data
                        console.log("ดู กิจกรรมมม", this.cane);

                    });

                }

            });
        }
        if (selectedTabIndex == 4) {
            this.range = this._formBuilder.group({
                start: [''],
                end: ['']
            });
            this.sugartype = "อ้อยตอ";
            this._farmmerService.getsugarcane(this.Id, this.startdate, this.enddate, this.sugartype, this.search, this.plot, this.activitys).subscribe((resp: any) => {
                this.cane = resp.data
                console.log("ดู กิจกรรมมม", this.cane);

            });
            this.searchInputControl.valueChanges.subscribe(value => {
                this.search = value;
                console.log(this.search);  // เพื่อตรวจสอบค่า search ใน console
                this._farmmerService.getsugarcane(this.Id, this.startdate, this.enddate, this.sugartype, this.search, this.plot, this.activitys).subscribe((resp: any) => {
                    this.cane = resp.data
                    console.log("ดู กิจกรรมมม", this.cane);

                });
            });
            this.activityControl.valueChanges.subscribe(value => {
                this.activitys = value;
                console.log(this.activitys);  // เพื่อตรวจสอบค่า activitys ใน console
                this._farmmerService.getsugarcane(this.Id, this.startdate, this.enddate, this.sugartype, this.search, this.plot, this.activitys).subscribe((resp: any) => {
                    this.cane = resp.data
                    console.log("ดู กิจกรรมมม", this.cane);

                });
            });
            this.plotControl.valueChanges.subscribe(value => {
                this.plot = value;
                console.log(this.plot);  // เพื่อตรวจสอบค่า activitys ใน console
                this._farmmerService.getsugarcane(this.Id, this.startdate, this.enddate, this.sugartype, this.search, this.plot, this.activitys).subscribe((resp: any) => {
                    this.cane = resp.data
                    console.log("ดู กิจกรรมมม", this.cane);

                });
            });
            this.range.valueChanges.subscribe(val => {
                if (val.start) {
                    this.startday = this.datePipe.transform(val.start, 'yyyy-MM-dd');
                    console.log("เริ่มวันนน", this.startday);
                }
                if (val.end) {
                    this.endday = this.datePipe.transform(val.end, 'yyyy-MM-dd');
                    console.log("สิ้นสุดวันนน", this.endday);
                }
                console.log(`Start Date: ${this.startday}, End Date: ${this.endday}`);  // เพื่อตรวจสอบค่าใน console

                if (val.start && val.end) {
                    this._farmmerService.getsugarcane(this.Id, this.startdate, this.enddate, this.sugartype, this.search, this.plot, this.activitys).subscribe((resp: any) => {
                        this.cane = resp.data
                        console.log("ดู กิจกรรมมม", this.cane);

                    });

                }

            });
        }
        if (selectedTabIndex == 5) {
            this._farmmerService.plot(this.Id, this.startdate, this.enddate).subscribe((resp: any) => {
                this.myplots = resp
                console.log("ดู กิจกรรมมม", this.myplots);

            });
        }


    }

    openImage(imageUrl: string) {
        window.open(imageUrl, '_blank');
    }
    activitys: any
    plot: any
    search: any = "";
    sugartype: any;




    loadCCSData(): void {
        this._farmmerService.getAPICCS(this.Id, this.startdate, this.enddate).subscribe((resp: any) => {
            this.ccsData = resp || [];
            this.events = this.ccsData.map(item => ({
                start: item.CCS_Date,
                // title: item.bill_no
            }));
            console.log("events loaded", this.events);

            // อัปเดต events ใน calendarOptions
            if (this.calendarOptions) {
                this.calendarOptions.events = this.events;
                this.cdr.detectChanges();
            }
        });
    }
    myplot: any
    loadmyplot(): void {
        this._farmmerService.myplot(this.Id, this.startdate, this.enddate).subscribe((resp: any) => {
            this.myplot = resp.data || [];
            this.events = this.ccsData.map(item => ({
                start: item.CCS_Date,
                // title: item.bill_no
            }));
            console.log("events loaded", this.events);
            console.log("events loaded plot", this.myplot);
            console.log("รวมรายจ่าย", this.myplot[0].laborwages + this.myplot[0].insecticidecost);

            
            // อัปเดต events ใน calendarOptions
            if (this.calendarOptions1) {
                this.calendarOptions1.events = this.events;
                this.cdr.detectChanges();
            }
        });
    }

    initializeCalendar(): void {
        this.calendarOptions = {
            plugins: [dayGridPlugin, interactionPlugin],
            initialView: 'dayGridMonth',
            selectable: true,
            datesSet: this.handleDatesSet.bind(this),
            select: this.handleDateSelect.bind(this),
            unselect: this.handleUnselect.bind(this),
            events: this.events
        };
    }
    plotCalendar(): void {
        this.calendarOptions1 = {
            plugins: [dayGridPlugin, interactionPlugin],
            initialView: 'dayGridMonth',
            selectable: true,
            datesSet: this.handleDatesSet.bind(this),
            select: this.handleDateSelect.bind(this),
            unselect: this.handleUnselect.bind(this),
            events: this.events
        };
    }
    getCurrentMonthStartDate(date: Date): string {
        const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        return this.formatDate(startOfMonth);
    }

    getCurrentMonthEndDate(date: Date): string {
        const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        return this.formatDate(endOfMonth);
    }

    updateDates(currentDate: Date): void {
        this.startdate = this.getCurrentMonthStartDate(currentDate);
        this.enddate = this.getCurrentMonthEndDate(currentDate);
        console.log('Start of month:', this.startdate);
        console.log('End of month:', this.enddate);
    }

    handleDatesSet(arg: any): void {
        this.updateDates(arg.view.currentStart);
        this.originalStartDate = this.startdate;
        this.originalEndDate = this.enddate;
        this.loadCCSData();
        this.loadmyplot();
    }

    private formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    datestart: any
    dateend: any
    private originalStartDate: string;
    private originalEndDate: string;
    private selectedDate: string | null = null;

    handleDateSelect(selectionInfo: any) {
        if (this.selectedDate === selectionInfo.startStr) {
            // ถ้ากดวันเดิมอีกครั้ง ให้กลับไปใช้ค่าวันที่เดิม
            this.startdate = this.originalStartDate;
            this.enddate = this.originalEndDate;
            this.selectedDate = null;
        } else {
            // ถ้ากดวันใหม่ ให้อัปเดตวันที่
            this.startdate = selectionInfo.startStr;
            this.enddate = selectionInfo.startStr;
            this.selectedDate = selectionInfo.startStr;
        }
        console.log("วันที่เริ่ม:", this.startdate, "วันที่สิ้นสุด:", this.enddate);
        this.loadCCSData(); // โหลดข้อมูลใหม่ตามวันที่เลือก
        this.loadmyplot();
    }

    // เพิ่มฟังก์ชันใหม่เพื่อจัดการเมื่อยกเลิกการเลือก
    handleUnselect() {
        this.startdate = this.originalStartDate;
        this.enddate = this.originalEndDate;
        this.selectedDate = null;
        console.log("ยกเลิกการเลือก - วันที่เริ่ม:", this.startdate, "วันที่สิ้นสุด:", this.enddate);
        this.loadCCSData(); // โหลดข้อมูลใหม่ตามวันที่เดิม
        this.loadmyplot();
    }

    goToProfile(id: any): void {
        console.log('goToProfile', id);

    }




    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Fix the SVG fill references. This fix must be applied to all ApexCharts
     * charts in order to fix 'black color on gradient fills on certain browsers'
     * issue caused by the '<base>' tag.
     *
     * Fix based on https://gist.github.com/Kamshak/c84cdc175209d1a30f711abd6a81d472
     *
     * @param element
     * @private
     */
    private _fixSvgFill(element: Element): void {
        // Current URL
        const currentURL = this._router.url;

        // 1. Find all elements with 'fill' attribute within the element
        // 2. Filter out the ones that doesn't have cross reference so we only left with the ones that use the 'url(#id)' syntax
        // 3. Insert the 'currentURL' at the front of the 'fill' attribute value
        Array.from(element.querySelectorAll('*[fill]'))
            .filter((el) => el.getAttribute('fill').indexOf('url(') !== -1)
            .forEach((el) => {
                const attrVal = el.getAttribute('fill');
                el.setAttribute(
                    'fill',
                    `url(${currentURL}${attrVal.slice(attrVal.indexOf('#'))}`
                );
            });
    }

    /**
     * Prepare the chart data from the data
     *
     * @private
     */
    private _prepareChartData(): void {
        // Github issues
        this.chartGithubIssues = {
            chart: {
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'line',
                toolbar: {
                    show: false,
                },
                zoom: {
                    enabled: false,
                },
            },
            colors: ['#64748B', '#94A3B8'],
            dataLabels: {
                enabled: true,
                enabledOnSeries: [0],
                background: {
                    borderWidth: 0,
                },
            },
            grid: {
                borderColor: 'var(--fuse-border)',
            },
            labels: this.data.githubIssues.labels,
            legend: {
                show: false,
            },
            plotOptions: {
                bar: {
                    columnWidth: '50%',
                },
            },
            series: this.data.githubIssues.series,
            states: {
                hover: {
                    filter: {
                        type: 'darken',
                        value: 0.75,
                    },
                },
            },
            stroke: {
                width: [3, 0],
            },
            tooltip: {
                followCursor: true,
                theme: 'dark',
            },
            xaxis: {
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    color: 'var(--fuse-border)',
                },
                labels: {
                    style: {
                        colors: 'var(--fuse-text-secondary)',
                    },
                },
                tooltip: {
                    enabled: false,
                },
            },
            yaxis: {
                labels: {
                    offsetX: -16,
                    style: {
                        colors: 'var(--fuse-text-secondary)',
                    },
                },
            },
        };

        // Task distribution
        this.chartTaskDistribution = {
            chart: {
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'polarArea',
                toolbar: {
                    show: false,
                },
                zoom: {
                    enabled: false,
                },
            },
            labels: this.data.taskDistribution.labels,
            legend: {
                position: 'bottom',
            },
            plotOptions: {
                polarArea: {
                    spokes: {
                        connectorColors: 'var(--fuse-border)',
                    },
                    rings: {
                        strokeColor: 'var(--fuse-border)',
                    },
                },
            },
            series: this.data.taskDistribution.series,
            states: {
                hover: {
                    filter: {
                        type: 'darken',
                        value: 0.75,
                    },
                },
            },
            stroke: {
                width: 2,
            },
            theme: {
                monochrome: {
                    enabled: true,
                    color: '#93C5FD',
                    shadeIntensity: 0.75,
                    shadeTo: 'dark',
                },
            },
            tooltip: {
                followCursor: true,
                theme: 'dark',
            },
            yaxis: {
                labels: {
                    style: {
                        colors: 'var(--fuse-text-secondary)',
                    },
                },
            },
        };

        // Budget distribution
        this.chartBudgetDistribution = {
            chart: {
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'radar',
                sparkline: {
                    enabled: true,
                },
            },
            colors: ['#818CF8'],
            dataLabels: {
                enabled: true,
                formatter: (val: number): string | number => `${val}%`,
                textAnchor: 'start',
                style: {
                    fontSize: '13px',
                    fontWeight: 500,
                },
                background: {
                    borderWidth: 0,
                    padding: 4,
                },
                offsetY: -15,
            },
            markers: {
                strokeColors: '#818CF8',
                strokeWidth: 4,
            },
            plotOptions: {
                radar: {
                    polygons: {
                        strokeColors: 'var(--fuse-border)',
                        connectorColors: 'var(--fuse-border)',
                    },
                },
            },
            series: this.data.budgetDistribution.series,
            stroke: {
                width: 2,
            },
            tooltip: {
                theme: 'dark',
                y: {
                    formatter: (val: number): string => `${val}%`,
                },
            },
            xaxis: {
                labels: {
                    show: true,
                    style: {
                        fontSize: '12px',
                        fontWeight: '500',
                    },
                },
                categories: this.data.budgetDistribution.categories,
            },
            yaxis: {
                max: (max: number): number =>
                    parseInt((max + 10).toFixed(0), 10),
                tickAmount: 7,
            },
        };

        // Weekly expenses
        this.chartWeeklyExpenses = {
            chart: {
                animations: {
                    enabled: false,
                },
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'line',
                sparkline: {
                    enabled: true,
                },
            },
            colors: ['#22D3EE'],
            series: this.data.weeklyExpenses.series,
            stroke: {
                curve: 'smooth',
            },
            tooltip: {
                theme: 'dark',
            },
            xaxis: {
                type: 'category',
                categories: this.data.weeklyExpenses.labels,
            },
            yaxis: {
                labels: {
                    formatter: (val): string => `$${val}`,
                },
            },
        };

        // Monthly expenses
        this.chartMonthlyExpenses = {
            chart: {
                animations: {
                    enabled: false,
                },
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'line',
                sparkline: {
                    enabled: true,
                },
            },
            colors: ['#4ADE80'],
            series: this.data.monthlyExpenses.series,
            stroke: {
                curve: 'smooth',
            },
            tooltip: {
                theme: 'dark',
            },
            xaxis: {
                type: 'category',
                categories: this.data.monthlyExpenses.labels,
            },
            yaxis: {
                labels: {
                    formatter: (val): string => `$${val}`,
                },
            },
        };

        // Yearly expenses
        this.chartYearlyExpenses = {
            chart: {
                animations: {
                    enabled: false,
                },
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'line',
                sparkline: {
                    enabled: true,
                },
            },
            colors: ['#FB7185'],
            series: this.data.yearlyExpenses.series,
            stroke: {
                curve: 'smooth',
            },
            tooltip: {
                theme: 'dark',
            },
            xaxis: {
                type: 'category',
                categories: this.data.yearlyExpenses.labels,
            },
            yaxis: {
                labels: {
                    formatter: (val): string => `$${val}`,
                },
            },
        };
    }
}
