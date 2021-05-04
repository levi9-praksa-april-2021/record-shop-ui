export interface Order {
  id: number;
  items: OrderItem[];
  priceSum: number;
};

interface OrderItem {
  recordId: number;
  count: number;
  price: number;
}
