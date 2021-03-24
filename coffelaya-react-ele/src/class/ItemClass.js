export class ItemClass {
    constructor(item, rate, qty) {
        
        this.item = item;
        this.rate = rate;
        this.qty = qty;
        this.total = rate * qty;
    }

    getTotal(){
        return this.total;
    }

    
}

