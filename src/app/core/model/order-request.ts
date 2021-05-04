export interface OrderRequest {
  itemsRequest: OrderRequestItem[];
};

interface OrderRequestItem {
  recordId: number;
  count: number;
};
