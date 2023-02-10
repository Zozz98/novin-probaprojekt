import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.css']
})
export class BillDetailsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  createBillFormGroup = this.formBuilder.group({
    customerName: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    itemName: ['', [Validators.required, Validators.maxLength(50)]],
    comment: ['', Validators.required],
    price: ['', [Validators.required, Validators.max(99999999)]],
  });
}
