import { Beneficiary } from './shared/beneficiary.interface';

/**
 * This static service is used to store required data for requests.
 */
export class StorageService {
  private static USER_ID_KEY = 'b_uuid';
  private static PLAID_TOKEN_KEY = 'pt_key';
  private static PAYMENTS_ENABLED_KEY = 'p_e';
  private static PAYMENT_UUID_KEY = 'p_u';
  private static storage = window.sessionStorage;

  /**
   * Returns cached user id.
   */
  public static getStoredUserId(): string {
    return this.storage.getItem(this.USER_ID_KEY);
  }

  /**
   * Caches user's id in the session storage.
   * @param beneficiary user to store id for.
   */
  public static storeUserId(beneficiary: Beneficiary): void {
    this.storage.setItem(this.USER_ID_KEY, beneficiary.uuid);
  }

  /**
   * Caches token received from Plaid.
   * @param token
   */
  public static storePlaidToken(token: string): void {
    this.storage.setItem(this.PLAID_TOKEN_KEY, token);
  }

  /**
   * Returns cached plaid token.
   */
  public static getStoredPlaidToken(): string {
    return this.storage.getItem(this.PLAID_TOKEN_KEY);
  }

  /**
   * Caches value which indicates if payments are enabled for this user.
   * @param paymentsEnabled boolean
   */
  public static storePaymentsEnabled(paymentsEnabled: boolean): void {
    this.storage.setItem(this.PAYMENTS_ENABLED_KEY, JSON.stringify(paymentsEnabled));
  }

  /**
   * Returns cached paymentsEnabled value
   * which indicates if payments are enabled for this user.
   */
  public static getStoredPaymentsEnabled(): boolean | null {
    const value = this.storage.getItem(this.PAYMENTS_ENABLED_KEY);
    return value ? JSON.parse(value) : null;
  }

  /**
   * Caches created payment's UUID.
   * @param uuid
   */
  public static storePaymentUuid(uuid: string): void {
    this.storage.setItem(this.PAYMENT_UUID_KEY, uuid);
  }

  /**
   * Returns cached payment's UUID.
   */
  public static getStoredPaymentUuid(): string {
    return this.storage.getItem(this.PAYMENT_UUID_KEY);
  }

  /**
   * Resets application state.
   */
  public static clearAll(): void {
    this.storage.clear();
  }
}
