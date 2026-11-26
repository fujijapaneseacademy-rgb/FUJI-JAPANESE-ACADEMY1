// 🔄 Compatibility layer: Razorpay calls are seamlessly routed to Cashfree
export { handlePayment, loadCashfree as loadRazorpay } from './cashfreeService';
export type { PaymentOptions } from './cashfreeService';
