import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  host: { '[attr.data-id]': 'uniqueId' },
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
