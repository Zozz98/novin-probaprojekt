import { Component, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BillService } from 'src/app/service/bill.service';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { Bill } from 'src/app/model/Bill';

@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.css'],
})
export class BillDetailsComponent implements OnInit {
  /*billDetailsFormGroup = new FormGroup({
    customerName: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    itemName: new FormControl(''),
    comment: new FormControl(''),
    price: new FormControl(''),
  });*/
  public billDetailsFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private billService: BillService,
    private router: ActivatedRoute
  ) {
    this.billDetailsFormGroup = this.formBuilder.group({
      customerName: [''],
      startDate: [''],
      endDate: [''],
      itemName: [''],
      comment: [''],
      price: [''],
    });
  }

  billRef!: any;

  ngOnInit(): void {
    console.log(this.router.snapshot.params['id']);
    const id = this.router.snapshot.paramMap.get('id')!;

    this.billService.getBillDetails(this.router.snapshot.params['id']).subscribe((res) => {
      this.billRef = res;
      console.log('RES: ', res);

      if (this.billRef !== undefined) {
        console.log('billRef: ', this.billRef);
        this.billDetailsFormGroup = this.formBuilder.group({
          customerName: [`${this.billRef.customerName}`],
          startDate: [this.billRef!.startDate],
          endDate: [this.billRef!.endDate],
          itemName: [this.billRef!.itemName],
          comment: [this.billRef!.comment],
          price: [this.billRef!.price],
        })
      }
    });
  }
}
