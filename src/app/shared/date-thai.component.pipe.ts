import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'thaiDate',
  standalone: true,
  
})
export class ThaiDatePipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}

  transform(value: any, format: string = 'dd MMMM yyyy'): any {
    // แปลงค่าวันที่ไปยัง Date หากไม่ได้เป็นแล้ว
    const dateValue = value instanceof Date ? value : new Date(value);

    // ใช้ DatePipe เพื่อแปลงเป็นวันที่ไทย
    const thaiDate = this.datePipe.transform(dateValue, format, 'en-TH');

    return thaiDate;
  }
}
