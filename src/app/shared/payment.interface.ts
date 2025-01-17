import { PaymentStatus } from './payment-status.enum';

/**
 * Payments are issued per-beneficiary with individual requests for transfer.
 * They pay down the beneficiary's highest interest loan first,
 * in order to minimize capitalized interest.
 */
export interface Payment {
  /** Unique identifier generated by Rightfoot for payment. */
  uuid: string;
  /** Unique identifier generated by Rightfoot for the beneficiary. */
  beneficiaryUuid: string;
  /** Amount to pay to beneficiary's student loans, in cents USD. */
  paymentAmount: number;
  /** @link Status of the payment. */
  status: PaymentStatus;
  /**
   * In the case of errors or other variants,
   * provides a description of the failed state.
   */
  description?: string;
  /** Unix epoch seconds when the payment request was initiated. */
  timeCreated: number;
  /**
   * Unix epoch seconds when the payment request reached a terminal state
   * (completed or failed).
   */
  timeCompleted?: number;
}
