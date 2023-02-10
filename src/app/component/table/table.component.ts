import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Bill } from 'src/app/model/Bill';
import { BillService } from 'src/app/service/bill.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  bills: Observable<any[]>;

  constructor(private billService: BillService, private router: Router) {
    this.bills = billService.getBills();
  }

  ngOnInit(): void {}

  tableHeaders = [
    '#',
    'Vasarlo neve',
    'Kiallitas datuma',
    'Esedekesseg datuma',
    'Tetel neve',
    'Komment',
    'Ar',
  ];

  goToDetails() {
    this.router.navigate(['/bill-details']);
  }
}
