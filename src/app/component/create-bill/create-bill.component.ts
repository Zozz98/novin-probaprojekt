import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BillService } from 'src/app/service/bill.service';
import { Bill } from 'src/app/model/Bill';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-bill',
  templateUrl: './create-bill.component.html',
  styleUrls: ['./create-bill.component.css']
})
export class CreateBillComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private billService: BillService, private router: Router) { }

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

  createBill() {
    if(this.createBillFormGroup.valid) {
      const bill: Bill = {
        customerName: this.createBillFormGroup.controls.customerName.value!,
        startDate: new Date(this.createBillFormGroup.controls.startDate.value!),
        endDate: new Date(this.createBillFormGroup.controls.endDate.value!),
        itemName: this.createBillFormGroup.controls.itemName.value!,
        comment: this.createBillFormGroup.controls.comment.value!,
        price: new Number(this.createBillFormGroup.controls.price.value!).valueOf()
      }
      this.billService.addBill(bill).then((s) => {
        console.log('bill: ', s);
        this.router.navigate(['/home']);
      });
    }
  }

}
