export interface Bill {
    id?: string;
    customerName?: string | undefined; 
    startDate?: Date | undefined; 
    endDate?: Date | undefined; 
    itemName?: string | undefined; 
    comment?: string | undefined; 
    price?: number | undefined; 
}