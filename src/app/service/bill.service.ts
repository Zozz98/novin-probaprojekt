import { Injectable } from '@angular/core';
import { Bill } from '../model/Bill';
import {AngularFirestore} from '@angular/fire/compat/firestore'
import { Observable, throwError } from 'rxjs';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  url = "http://localhost:4200/billDetails";

  constructor(private angularFirestore:AngularFirestore, private http: HttpClient) { }

  
  async addBill(bill: Bill) {
    bill.id = this.angularFirestore.createId();
    return await this.angularFirestore.collection('/bills').add(bill);
  }

  getBills(): Observable<any[]> {
    return this.angularFirestore.collection('bills').valueChanges();
  }

  getBillDetails(id: any) {
    //console.log('bill.service url: ',`${this.url}/${id}`);
    //return this.http.get(`${this.url}/${id}`); //404error
    //return this.angularFireStore.collection('bills').valueChanges();
    console.log('bills id: ', this.angularFirestore.collection('bills').doc(id).valueChanges());
    return this.angularFirestore.collection('bills').doc(id).valueChanges();

  }
}
