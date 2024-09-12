import { CommonModule, CurrencyPipe, DatePipe, formatDate, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DateAdapter, MAT_DATE_LOCALE, MatOptionModule, MatRippleModule, NativeDateAdapter } from '@angular/material/core';
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
import { FormsModule } from '@angular/forms';
import { ChartComponent } from "ng-apexcharts";
import {
    ApexNonAxisChartSeries,
    ApexResponsive,
    ApexChart
} from "ng-apexcharts";
import {
    ApexAxisChartSeries,
    ApexDataLabels,
    ApexPlotOptions,
    ApexYAxis,
    ApexLegend,
    ApexStroke,
    ApexXAxis,
    ApexFill,
    ApexTooltip
} from "ng-apexcharts";
// import { log } from 'console';
import {  MAT_DATE_FORMATS } from '@angular/material/core';
export type ChartsOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    yaxis: ApexYAxis;
    xaxis: ApexXAxis;
    fill: ApexFill;
    tooltip: ApexTooltip;
    stroke: ApexStroke;
    legend: ApexLegend;
};
export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    responsive: ApexResponsive[];
    labels: any;
};

export class ThaiDateAdapter extends NativeDateAdapter {
    format(date: Date, displayFormat: string): string {
      // กำหนดรูปแบบที่ต้องการที่นี่
      return formatDate(date, 'd/MM/yyyy', 'th-TH');
    }
  
    // สามารถปรับแต่งได้เพิ่มเติมตามต้องการ
  }

  export const THAI_DATE_FORMATS = {
    parse: {
      dateInput: 'LL',
    },
    display: {
      dateInput: 'd/MM/yyyy', // แสดงวันที่ในรูปแบบวัน/เดือน/ปี
      monthYearLabel: 'MMMM yyyy',
      dateA11yLabel: 'd MMMM yyyy',
      monthYearA11yLabel: 'MMMM yyyy',
    },
  };

@Component({
    selector: 'project',
    templateUrl: './project.component.html',
    styleUrls: ["./project.component.css"],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgApexchartsModule,
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
        CommonModule,
        FormsModule,
        NgApexchartsModule
    ],
    providers: [ThaiDatePipe, DatePipe,{ provide: MAT_DATE_LOCALE, useValue: 'th-TH' },{ provide: MAT_DATE_FORMATS, useValue: THAI_DATE_FORMATS }]
})
export class ProjectComponent implements OnInit, OnDestroy {
    dtOptions: DataTables.Settings = {};
    @ViewChild(DataTableDirective)
    dtElement!: DataTableDirective;
    dataRow: any = [];
    declare google: any;

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
    @ViewChildren('mapCanvas') mapCanvases: QueryList<ElementRef>;


    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;
    public chartOptions1: Partial<ChartOptions>;
    public chartOptions2: Partial<ChartsOptions>;


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
        private datePipe: DatePipe,
        private ngZone: NgZone,
        private route: ActivatedRoute
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
    activitys: any
    plot: any
    search: any = "";
    sugartype: any;
    range: FormGroup;
    startday: any;
    endday: any;
    startdate: any;
    enddate: any;
    cane: any;
    searchInputControl: FormControl = new FormControl();
    activityControl: FormControl = new FormControl();
    plotControl: FormControl = new FormControl();
    yearControl: FormControl = new FormControl();
    page: number = 0;

    years: number[] = [];
    startYear: number;
    endYear: number;
    last_page: number;
    activity: any;
    imageUrl = "https://page365.zendesk.com/hc/article_attachments/900009033263/______________.jpg";
    startmonth: any;
    endmonth: any;
    groupyear: any;
    income: any;
    deduct: any;
    profiles: any;
    totalAmountPaid: any;
    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.Id = params['id'];
            console.log("ดู ID", this.Id);
          });

          this._farmmerService.profiles(this.Id).subscribe((resp: any) => {
            this.profiles = resp
            console.log("ดู profiles ชื่อ บัตร", this.profiles);
            this.cdr.detectChanges();
        });

        console.log("ดู ID", this.Id);
        
        this._farmmerService.dashboardincomededuct(this.Id).subscribe((resp: any) => {
            this.dbincome = resp.data;
            // this._farmmerService.receive(this.Id).subscribe((resp: any) => {
            //     this.receive = resp.data
            //     console.log("ดู รายรับ (receive)", this.receive);
            //     this.totalAmountPaid = this.receive.reduce((sum: number, item: any) => sum + item.amountpaid_cane, 0);
            //     console.log("รวม amountpaid_cane ทั้งหมด:", this.totalAmountPaid);
            //     this.cdr.detectChanges();
            // });
            if (this.dbincome && this.dbincome.Income && this.dbincome.Income.length > 0 && this.dbincome.Deduct && this.dbincome.Deduct.length > 0) {
                const income = parseFloat(this.dbincome.Income[0]) || 0;
                const deduct = parseFloat(this.dbincome.Deduct[0]) || 0;
                this.income = income;
                this.deduct = deduct;
                console.log("ดู กิจกรรมมม", income, deduct);

                if (this.totalAmountPaid === 0 && deduct === 0) {
                    this.chartOptions = {
                        series: [0, 0],
                        chart: {
                            type: "donut"
                        },
                        labels: ["รายจ่าย ไม่มี", "รายรับ ไม่มี"],
                        responsive: [
                            {
                                breakpoint: 480,
                                options: {
                                    chart: {
                                        width: 200
                                    },
                                    legend: {
                                        position: "bottom"
                                    }
                                }
                            }
                        ]
                    };
                } else {
                    this.chartOptions = {
                        series: [deduct, this.totalAmountPaid],
                        chart: {
                            type: "donut"
                        },
                        labels: ["รายจ่าย", "รายรับ"],
                        responsive: [
                            {
                                breakpoint: 480,
                                options: {
                                    chart: {
                                        width: 200
                                    },
                                    legend: {
                                        position: "bottom"
                                    }
                                }
                            }
                        ]
                    };
                }
                this.cdr.detectChanges();
            } else {
                console.error('ข้อมูลไม่ครบถ้วนหรือไม่ถูกต้อง', this.dbincome);
                this.chartOptions = null;
            }
        });


        this._farmmerService.dashboardactivitytype(this.Id).subscribe((resp: any) => {
            this.dbactivity = resp.data
            console.log("ดู this.dbactivity", this.dbactivity);
            if (this.dbactivity) {
                const price1 = parseFloat(this.dbactivity[0]?.total_paid) || 0;
                const price2 = parseFloat(this.dbactivity[1]?.total_paid) || 0;
                const price3 = parseFloat(this.dbactivity[2]?.total_paid) || 0;
                const price4 = parseFloat(this.dbactivity[3]?.total_paid) || 0;
                const price5 = parseFloat(this.dbactivity[4]?.total_paid) || 0;
                const price6 = parseFloat(this.dbactivity[5]?.total_paid) || 0;
                const price7 = parseFloat(this.dbactivity[6]?.total_paid) || 0;
                const price8 = parseFloat(this.dbactivity[7]?.total_paid) || 0;

                console.log("ดู กิจกรรมมม8888888", price1, price2);

                if (price1 === 0 && price2 === 0 && price3 === 0 && price4 === 0 && price5 === 0 && price6 === 0 && price7 === 0 && price8 === 0) {
                    console.warn('ทั้งรายรับและรายจ่ายเป็น 0 ไม่สามารถแสดงแผนภูมิได้');
                    this.chartOptions1 = null;
                } else {
                    this.chartOptions1 = {
                        series: [price1, price2, price3, price4, price5, price6, price7, price8],
                        chart: {
                            type: "donut"
                        },
                        labels: ["ไถและเตรียมดิน", "ปลูกอ้อย", "ให้น้ำ", "ฉีดพ่นน้ำหมักปุ๋ยยูเรีย", "ฉีดพ่นสารกำจัดศัตรูพืช", "ใส่ปุ๋ย", "ตัดอ้อย", "ขนส่งอ้อย"],
                        responsive: [
                            {
                                breakpoint: 480,
                                options: {
                                    chart: {
                                        width: 200
                                    },
                                    legend: {
                                        position: "bottom"
                                    }
                                }
                            }
                        ]
                    };
                }
                this.cdr.detectChanges();
            } else {
                console.error('ข้อมูลไม่ครบถ้วนหรือไม่ถูกต้อง', this.dbactivity);
                this.chartOptions1 = null;
            }
        });

        this._farmmerService.dashboardweekly(this.Id).subscribe((resp: any) => {
            this.dbweekly = resp.data
            console.log("ดู dbweekly ว่าขนาดเท่าไหร่", this.dbweekly.income[0]);
            console.log("ดู dbweekly ว่าขนาดเท่าไหร่", this.dbweekly.deduct);
            if (this.dbweekly) {
                const day1in = parseFloat(Object.values(this.dbweekly.income[0])[0] as string) || 0;
                const day2in = parseFloat(Object.values(this.dbweekly.income[1])[0] as string) || 0;
                const day3in = parseFloat(Object.values(this.dbweekly.income[2])[0] as string) || 0;
                const day4in = parseFloat(Object.values(this.dbweekly.income[3])[0] as string) || 0;
                const day5in = parseFloat(Object.values(this.dbweekly.income[4])[0] as string) || 0;
                const day6in = parseFloat(Object.values(this.dbweekly.income[5])[0] as string) || 0;
                const day7in = parseFloat(Object.values(this.dbweekly.income[6])[0] as string) || 0;

                const day1de = parseFloat(Object.values(this.dbweekly.deduct[0])[0] as string) || 0;
                const day2de = parseFloat(Object.values(this.dbweekly.deduct[1])[0] as string) || 0;
                const day3de = parseFloat(Object.values(this.dbweekly.deduct[2])[0] as string) || 0;
                const day4de = parseFloat(Object.values(this.dbweekly.deduct[3])[0] as string) || 0;
                const day5de = parseFloat(Object.values(this.dbweekly.deduct[4])[0] as string) || 0;
                const day6de = parseFloat(Object.values(this.dbweekly.deduct[5])[0] as string) || 0;
                const day7de = parseFloat(Object.values(this.dbweekly.deduct[6])[0] as string) || 0;
        
                console.log("ดู dbweekly", this.dbweekly);
                console.log("ดู dbweekly", day2in);
                console.log("ดู dbweekly", day2de);
                this.cdr.detectChanges();
                if (day1in === 0 && day2in === 0 && day3in === 0 && day4in === 0 && day5in === 0 && day6in === 0 && day7in === 0 && day1de === 0 && day2de === 0 && day3de === 0 && day4de === 0 && day5de === 0 && day6de === 0 && day7de === 0) {
                    console.warn('ทั้งรายรับและรายจ่ายเป็น 0 ไม่สามารถแสดงแผนภูมิได้');
                    this.chartOptions1 = null;
                } else {
                    this.chartOptions2 = {
                        series: [
                            {
                                name: "รายรับ",
                                data: [day1in, day2in, day3in, day4in, day5in, day6in, day7in]
                            },
                            {
                                name: "รายจ่าย",
                                data: [day1de, day2de, day3de, day4de, day5de, day6de, day7de]
                            }
                        ],
                        chart: {
                            type: "bar",
                            height: 350
                        },
                        plotOptions: {
                            bar: {
                                horizontal: false,
                                columnWidth: "55%",
                            }
                        },
                        dataLabels: {
                            enabled: false
                        },
                        stroke: {
                            show: true,
                            width: 2,
                            colors: ["transparent"]
                        },
                        xaxis: {
                            categories: [
                                "จันทร์",
                                "อังคาร",
                                "พุธ",
                                "พฤหัสบดี",
                                "ศุกร์",
                                "เสาร์",
                                "อาทิตย์"
                            ]
                        },
                        yaxis: {
                            title: {
                                text: "B (บาท)"
                            }
                        },
                        fill: {
                            opacity: 1
                        },
                        tooltip: {
                            y: {
                                formatter: function (val) {
                                    return " " + val + " บาท";
                                }
                            }
                        }
                    };
                    this.cdr.detectChanges();
                }
            }
        });


        const currentDate = new Date();
        this.updateDates(currentDate);
        const startOfMonth = this.getCurrentMonthStartDate(currentDate);
        const endOfMonth = this.getCurrentMonthEndDate(currentDate);
        console.log('Start of month:', startOfMonth);
        console.log('End of month:', endOfMonth);

        this.startmonth = this.getCurrentMonthStartDate(currentDate);
        this.endmonth = this.getCurrentMonthEndDate(currentDate);
        this.range = this._formBuilder.group({
            start: [''],
            end: ['']
        });

        const currentYear = new Date().getFullYear() + 543; // Convert to Thai Year
        for (let year = 2533; year <= currentYear; year++) {
            this.years.push(year);
        }
        this.startYear = currentYear - 1;
        this.endYear = currentYear;

        console.log("aaaaaaaaa", this.ccsData);

        this.activatedRoute.params.subscribe((params) => {
            this.Id = params.id;
            this._changeDetectorRef.markForCheck();
            // this._farmmerService.getAPIFarmmer().subscribe((resp: any) => {
            //     const data1 = resp.find(item => item.Quota_id === 285)
            //     console.log('ata', data1)
            //     this.itemData = resp.find(item => item.Quota_id === +this.Id)
            //     console.log('item_data', this.itemData)
            // });

            this.loadCCSData();
            this.loadCCS();
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


        this._farmmerService.receive(this.Id).subscribe((resp: any) => {
            this.receive = resp.data
            console.log("ดู รายรับ (receive)", this.receive);
            this.totalAmountPaid = this.receive.reduce((sum: number, item: any) => sum + item.amountpaid_cane, 0);
            console.log("รวม amountpaid_cane ทั้งหมด:", this.totalAmountPaid);
            this.cdr.detectChanges();
        });
    }


    allValuesAreZero(): boolean {
        return this.dbweekly.income.slice(0, 8).every(item =>
          Object.values(item).every(value => value === 0)
        );
      }

    private apiKey: string = 'AIzaSyD4w6es-jk17lkWGFzIEpq0S8nhf1ZaunM';
    getMapImageUrl(lat: number, lng: number, coOrPoints: number[][]): string {
        const zoom = 13; // Adjust as needed
        const size = '200x100'; // Adjust as needed
        const maptype = 'satellite'; // Adjust as needed
        const style = 'feature:all|element:labels|visibility:off'; // Adjust as needed

        const path = coOrPoints.map(point => `${point[1]},${point[0]}`).join('|');
        return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=${size}&maptype=${maptype}&style=${style}&path=color:0xff0000ff|weight:2|${path}&key=${this.apiKey}`;
        // return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=${size}&maptype=${maptype}&style=${style}&key=${this.apiKey}`;
    }





    @ViewChild('mapContainer', { static: true }) mapContainer: ElementRef;
    profile: any;
    myplots: any;
    allplot: any
    year: any;
    grouplastyear: any;
    firstYear: any;
    lastYear: any;
    dbactivity: any;
    dbincome: any;
    dbweekly: any;
    receive: any;
    onTabChange(event: any) {
        const selectedTabIndex = event.index;
        const tabLabel = event.tab.textLabel;

        console.log(`Selected Tab Index: ${selectedTabIndex}`);
        console.log(`Selected Tab Label: ${tabLabel}`);
        if (selectedTabIndex == 0) {
            this._farmmerService.dashboardactivitytype(this.Id).subscribe((resp: any) => {
                this.dbactivity = resp.data
                console.log("ดู กิจกรรมมม", this.dbactivity);
                this.cdr.detectChanges();
            });
            this._farmmerService.dashboardincomededuct(this.Id).subscribe((resp: any) => {
                this.dbincome = resp.data
                console.log("ดู กิจกรรมมม", this.dbincome.Income[0]);
                this.cdr.detectChanges();
            });
            this._farmmerService.dashboardweekly(this.Id).subscribe((resp: any) => {
                this.dbweekly = resp.data
                console.log("ดู กิจกรรมมม", this.dbweekly);
                this.cdr.detectChanges();
            });
            this._farmmerService.receive(this.Id).subscribe((resp: any) => {
                this.receive = resp.data
                console.log("ดู รายรับ (receive)", this.receive);
                const totalAmountPaid = this.receive.reduce((sum: number, item: any) => sum + item.amountpaid_cane, 0);
                console.log("รวม amountpaid_cane ทั้งหมด:", totalAmountPaid);
                this.cdr.detectChanges();
            });
        }
        if (selectedTabIndex == 1) {
            // this._farmmerService.profile(this.Id, this.startdate, this.enddate).subscribe((resp: any) => {
            //     this.profile = resp
            //     console.log("ดู กิจกรรมมม", this.profile);
            //     this.cdr.detectChanges();
            // });

            this._farmmerService.groupyear(this.Id).subscribe((resp: any) => {
                if (resp && resp.length > 0) {
                    this.groupyear = resp
                    console.log("ดู groupyear", this.groupyear);
                    this.firstYear = this.groupyear[0];
                    this.lastYear = this.groupyear[this.groupyear.length - 1];
                    this._farmmerService.profile(this.Id, this.firstYear.value, this.lastYear.value).subscribe((resp: any) => {
                        this.profile = resp
                        console.log("ดู กิจกรรมมม", this.profile);
                        this.cdr.detectChanges();
                    });
                }
            });

        }
        if (selectedTabIndex == 2) {
            this._farmmerService.groupyear(this.Id).subscribe((resp: any) => {
                this.groupyear = resp
                this.grouplastyear = resp[resp.length - 1];
                console.log("ดู groupyear", this.groupyear.value);
                this._farmmerService.plot(this.Id, this.grouplastyear.value).subscribe((resp: any) => {
                    this.myplots = resp
                    console.log("ดู กิจกรรมมม", this.myplots);
                    this.cdr.detectChanges();
                });
            });
            // this._farmmerService.plot(this.Id, this.grouplastyear).subscribe((resp: any) => {
            //     this.myplots = resp
            //     console.log("ดู กิจกรรมมม", this.myplots);
            //     this.cdr.detectChanges();
            // });

        }
        if (selectedTabIndex == 3) {
            const currentDate = new Date();
            this.updateDates(currentDate);
            this.startday = this.getCurrentMonthStartDate(currentDate);
            this.endday = this.getCurrentMonthEndDate(currentDate);
            this.range = this._formBuilder.group({
                start: [''],
                end: ['']
            });
            this.sugartype = "อ้อยปลูกใหม่";
            this.activitys = "";
            this.activityControl.setValue(null);
            this._farmmerService.getplotframmer(this.Id).subscribe((resp: any) => {
                this.allplot = resp
                console.log("ดู แปลงชาวนา", this.allplot);
                this.cdr.detectChanges();
            });
            this._farmmerService.getsugarcane(this.Id, this.startdate, this.enddate, this.sugartype, this.search, this.plot, this.activitys, this.page).subscribe((resp: any) => {
                this.cane = resp.data
                this.last_page = resp.last_page;
                console.log("ดู กิจกรรมมม", this.cane);
                console.log("ดู lastpage", this.last_page);
                this.cdr.detectChanges();
            });
            this.searchInputControl.valueChanges.subscribe(value => {
                this.search = value;
                console.log(this.search);  // เพื่อตรวจสอบค่า search ใน console
                this._farmmerService.getsugarcane(this.Id, this.startdate, this.enddate, this.sugartype, this.search, this.plot, this.activitys, this.page).subscribe((resp: any) => {
                    this.cane = resp.data
                    console.log("ดู กิจกรรมมม", this.cane);
                    this.cdr.detectChanges();
                });
            });
            this.activityControl.valueChanges.subscribe(value => {
                this.activitys = value;
                console.log("ดูกิจกรรมที่เลือก", this.activitys);  // เพื่อตรวจสอบค่า activitys ใน console
                this._farmmerService.getsugarcane(this.Id, this.startdate, this.enddate, this.sugartype, this.search, this.plot, this.activitys, this.page).subscribe((resp: any) => {
                    this.cane = resp.data
                    console.log("ดู กิจกรรมมม", this.cane);
                    this.cdr.detectChanges();
                });
            });
            this.plotControl.valueChanges.subscribe(value => {
                this.plot = value;
                console.log(this.plot);  // เพื่อตรวจสอบค่า activitys ใน console
                this._farmmerService.getsugarcane(this.Id, this.startdate, this.enddate, this.sugartype, this.search, this.plot, this.activitys, this.page).subscribe((resp: any) => {
                    this.cane = resp.data
                    console.log("ดู กิจกรรมมม", this.cane);
                    this.cdr.detectChanges();
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
                if (val.start || val.end) {
                    this._farmmerService.getsugarcane(this.Id, this.startday, this.endday, this.sugartype, this.search, this.plot, this.activitys, this.page).subscribe((resp: any) => {
                        this.cane = resp.data
                        console.log("ดู กิจกรรมมม", this.cane);
                        this.cdr.detectChanges();
                    });
                }
                console.log(`Start Date: ${this.startday}, End Date: ${this.endday}`);  // เพื่อตรวจสอบค่าใน console

            });
        }
        if (selectedTabIndex == 4) {
            const currentDate = new Date();
            this.updateDates(currentDate);
            this.startday = this.getCurrentMonthStartDate(currentDate);
            this.endday = this.getCurrentMonthEndDate(currentDate);
            this.range = this._formBuilder.group({
                start: [''],
                end: ['']
            });
            this.sugartype = "อ้อยตอ";
            this.activitys = "";
            this.activityControl.setValue(null);
            this._farmmerService.getplotframmer(this.Id).subscribe((resp: any) => {
                this.allplot = resp
                console.log("ดู แปลงชาวนา", this.allplot);
                this.cdr.detectChanges();
            });
            this._farmmerService.getsugarcane(this.Id, this.startdate, this.enddate, this.sugartype, this.search, this.plot, this.activitys, this.page).subscribe((resp: any) => {
                this.cane = resp.data
                this.last_page = resp.last_page;
                console.log("ดู กิจกรรมมม cane", this.cane);
                this.cdr.detectChanges();
            });
            this.searchInputControl.valueChanges.subscribe(value => {
                this.search = value;
                console.log(this.search);  // เพื่อตรวจสอบค่า search ใน console
                this._farmmerService.getsugarcane(this.Id, this.startdate, this.enddate, this.sugartype, this.search, this.plot, this.activitys, this.page).subscribe((resp: any) => {
                    this.cane = resp.data
                    console.log("ดู กิจกรรมมม", this.cane);
                    this.cdr.detectChanges();
                });
            });
            this.activityControl.valueChanges.subscribe(value => {
                this.activitys = value;
                console.log(this.activitys);  // เพื่อตรวจสอบค่า activitys ใน console
                this._farmmerService.getsugarcane(this.Id, this.startdate, this.enddate, this.sugartype, this.search, this.plot, this.activitys, this.page).subscribe((resp: any) => {
                    this.cane = resp.data
                    console.log("ดู กิจกรรมมม", this.cane);
                    this.cdr.detectChanges();
                });
            });
            this.plotControl.valueChanges.subscribe(value => {
                this.plot = value;
                console.log(this.plot);  // เพื่อตรวจสอบค่า activitys ใน console
                this._farmmerService.getsugarcane(this.Id, this.startdate, this.enddate, this.sugartype, this.search, this.plot, this.activitys, this.page).subscribe((resp: any) => {
                    this.cane = resp.data
                    console.log("ดู กิจกรรมมม", this.cane);
                    this.cdr.detectChanges();
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
                if (val.start || val.end) {
                    this._farmmerService.getsugarcane(this.Id, this.startday, this.endday, this.sugartype, this.search, this.plot, this.activitys, this.page).subscribe((resp: any) => {
                        this.cane = resp.data
                        console.log("ดู กิจกรรมมม", this.cane);
                        this.cdr.detectChanges();
                    });
                }
                console.log(`Start Date: ${this.startday}, End Date: ${this.endday}`);  // เพื่อตรวจสอบค่าใน console


            });
        }



    }
    // google: any;
    @ViewChildren('mapContainer') mapContainers!: QueryList<ElementRef>;

    formatYearPeriod(yearPeriod: number): string {
        if (!yearPeriod) return '';

        const yearString = yearPeriod.toString();
        if (yearString.length !== 4) return yearString;

        const firstYear = parseInt(yearString.slice(0, 2)) + 2500;
        const secondYear = parseInt(yearString.slice(2)) + 2500;

        return `${firstYear}/${secondYear}`;
    }

    openImage(imageUrl: string) {
        window.open(imageUrl, '_blank');
    }

    ccs: any;
    loadCCS(): void {
        const currentDate = new Date();
        this.updateDates(currentDate);
        const startOfMonth = this.getCurrentMonthStartDate(currentDate);
        const endOfMonth = this.getCurrentMonthEndDate(currentDate);
        console.log('Start of month:', startOfMonth);
        console.log('End of month:', endOfMonth);
        this._farmmerService.getAPICCS(this.Id, startOfMonth, endOfMonth).subscribe((resp: any) => {
            this.ccs = resp || [];
            this.cdr.detectChanges();
        });
    }



    loadCCSData(): void {
        this._farmmerService.getAPICCS(this.Id, this.startdate, this.enddate).subscribe((resp: any) => {
            this.ccsData = resp || [];

            console.log("events loaded", this.events);
            const uniqueDates = new Set(this.ccsData.map(item => {
                return new Date(item.CCS_Date).toISOString().split('T')[0];
            }));
            this.events = Array.from(uniqueDates).map(date => ({
                start: date,
                display: 'list-item',
                allDay: true
            }));
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
            // console.log("รวมรายจ่าย", this.myplot[0].laborwages + this.myplot[0].insecticidecost);


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
        this._farmmerService.getAPICCS(this.Id, this.originalStartDate, this.originalEndDate).subscribe((resp: any) => {
            this.ccs = resp || [];
            this.cdr.detectChanges();
        });
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
            this.enddate = selectionInfo.endStr || selectionInfo.startStr;
            // Adjust the end date if it's over by a day
            if (new Date(this.enddate) > new Date(this.startdate)) {
                this.enddate = new Date(new Date(this.enddate).setDate(new Date(this.enddate).getDate() - 1)).toISOString().split('T')[0];
            }
            this.selectedDate = selectionInfo.startStr;
        }
        console.log("วันที่เริ่ม:", this.startdate, "วันที่สิ้นสุด:", this.enddate);
        // this.loadCCSData();
        this.loadmyplot();
        this._farmmerService.getAPICCS(this.Id, this.startdate, this.enddate).subscribe((resp: any) => {
            this.ccs = resp || [];
            this.cdr.detectChanges();
        });
    }

    // เพิ่มฟังก์ชันใหม่เพื่อจัดการเมื่อยกเลิกการเลือก
    handleUnselect() {
        this.startdate = this.originalStartDate;
        this.enddate = this.originalEndDate;
        this.selectedDate = null;
        console.log("ยกเลิกการเลือก - วันที่เริ่ม:", this.startdate, "วันที่สิ้นสุด:", this.enddate);
        // this.loadCCSData();
        this.loadmyplot();
        this._farmmerService.getAPICCS(this.Id, this.startdate, this.enddate).subscribe((resp: any) => {
            this.ccs = resp || [];
            this.cdr.detectChanges();
        });
    }

    goToProfile(id: any): void {
        console.log('goToProfile', id);

    }

    nextpage(): void {
        if (this.page == this.last_page) {
            this.page == this.last_page
        }
        else {
            this.page += 1;
            this._farmmerService.getsugarcane(this.Id, this.startdate, this.enddate, this.sugartype, this.search, this.plot, this.activitys, this.page).subscribe((resp: any) => {
                this.cane = resp.data
                console.log("ดู กิจกรรมมม", this.cane);
                this.cdr.detectChanges();
            });
        }
    }

    prevpage(): void {
        if (this.page <= 0) {
            this.page == 0
        }
        else {
            this.page -= 1;
            this._farmmerService.getsugarcane(this.Id, this.startdate, this.enddate, this.sugartype, this.search, this.plot, this.activitys, this.page).subscribe((resp: any) => {
                this.cane = resp.data
                console.log("ดู กิจกรรมมม", this.cane);
                this.cdr.detectChanges();
            });
        }

    }

    onStartYearChange(selectedYear: number) {
        console.log('Selected start year:', selectedYear);
        this.firstYear.value = selectedYear;
        this._farmmerService.profile(this.Id, selectedYear, this.lastYear.value).subscribe((resp: any) => {
            this.profile = resp
            console.log("ดู กิจกรรมมม", this.profile);
            this.cdr.detectChanges();
        });
    }

    onEndYearChange(selectedYear: number) {
        this.lastYear.value = selectedYear;
        console.log('Selected start year:', selectedYear);
        this._farmmerService.profile(this.Id, this.firstYear.value, selectedYear).subscribe((resp: any) => {
            this.profile = resp
            console.log("ดู กิจกรรมมม", this.profile);
            this.cdr.detectChanges();
        });
    }

    onYearChange(selectedYear: number) {
        console.log('Selected start year:', selectedYear);
        this._farmmerService.plot(this.Id, selectedYear).subscribe((resp: any) => {
            this.myplots = resp;
            console.log("ดู กิจกรรมมม", this.myplots);
            this.cdr.detectChanges();
        });
    }

    spinner: string = 'assets/images/Spinner.gif';
    chart0: string = 'assets/images/chart0.png';
    barchart0: string = 'assets/images/barchart0.png';


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
