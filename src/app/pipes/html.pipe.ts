/* 
Creating a custom pipe to transform HTML content:
สร้าง pipe แบบกำหนดเองเพื่อแปลงเนื้อหา HTML:

- Pipe: Decorator to define a pipe in Angular.
- PipeTransform: Interface for transforming input values into output values.
- HtmlPipe: Custom pipe class that implements PipeTransform interface.

- Pipe: เดคอเรเตอร์สำหรับกำหนด pipe ใน Angular
- PipeTransform: อินเทอร์เฟซสำหรับแปลงค่าข้อมูลจากค่าเข้ามาเป็นค่าที่ส่งออก
- HtmlPipe: คลาส pipe แบบกำหนดเองที่ทำการ implement อินเทอร์เฟซ PipeTransform
*/
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'html',
})
export class HtmlPipe implements PipeTransform {
  transform(value: string): any {
    return value;
  }
}
