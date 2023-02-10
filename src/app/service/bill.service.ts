import { Injectable } from '@angular/core';
import { Bill } from '../model/Bill';
import {AngularFirestore} from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private angularFirestore:AngularFirestore) { }

  
  async addBill(bill: Bill) {
    bill.id = this.angularFirestore.createId();
    return await this.angularFirestore.collection('/bills').add(bill);
  }

  getBills(): Observable<any[]> {
    return this.angularFirestore.collection('bills').valueChanges();
  }
}
