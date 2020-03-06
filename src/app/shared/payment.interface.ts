import { PaymentStatus } from './payment-status.enum';

/**
 * Payments are issued per-beneficiary with individual requests for transfer.
 * They pay down the beneficiary's highest interest loan first,
 * in order to minimize capitalized interest.
 */
export interface Payment {
  /** Unique identifier generated by Rightfoot for payment. */
  uuid: string;
  /** Status of the payment. */
  status: PaymentStatus;
  /**
   * In the case of errors or other variants,
   * provides a description of the failed state.
   */
  description?: string;
}