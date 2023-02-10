export interface Bill {
    id?: string;
    customerName?: string; //vasarlo neve
    startDate?: Date; //kiallitas datuma
    endDate?: Date; //esedekesseg datuma
    itemName?: string; //tetel neve
    comment?: string; //komment
    price?: number; //ar
}