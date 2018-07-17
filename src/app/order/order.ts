
export class Order {
    id: string;
    user: any = { id: 0, username: '' };
    restaurant: any = { id: 0 };
    items: OrderItem[];
    amount: string;
    currency = 'cad';
    status: string;
    created: string;
    updated: string;
    constructor(o?: any) {
        if (o) {
            this.id = o.id;
            if (o.user) {
                this.user = o.user;
            }
            if (o.restaurant) {
                this.restaurant = o.restaurant;
            }
            this.items = o.items;
            this.amount = o.amount;
            this.status = o.status;
            this.currency = o.currency;
            this.created = o.created;
            this.updated = o.updated;
        }
    }
}

export class OrderItem {
    id: string;
    order: any = { id: 1 };
    product: any = { id: 1, name: '', price: 0 };
    quantity: number;
    constructor(o?: any) {
        if (o) {
            this.id = o.id;
            if (o.order) {
                this.order = o.order;
            }
            if (o.product) {
                this.product = o.product;
                this.product.name = o.product_name; // From database
                this.product.price = o.price;
            }
            this.quantity = o.quantity;
        }
    }
}
