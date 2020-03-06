import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { environment } from '../environments/environment';
import { DemographicsFormValue } from './shared/demographics-form-value.interface';
import { BeneficiaryRequest } from './shared/beneficiary-request.interface';
import { Observable } from 'rxjs';
import { Beneficiary } from './shared/beneficiary.interface';
import { StorageService } from './storage.service';
import { Payment } from './shared/payment.interface';
import { PaymentStatus } from './shared/payment-status.enum';

/**
 * This service is used for communication with the API server
 * to create beneficiaries, make payments, etc.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private CREATE_BENEFICIARY_URL = `${environment.apiUrl}/beneficiaries`;
  private ADD_PLAID_TOKEN_URL = `${environment.apiUrl}/beneficiaries/addPlaidToken`;
  private PAYMENTS_URL = `${environment.apiUrl}/payments`;

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Creates new beneficiary user based on the user provided demographics data.
   * @param formValue Value of the demographics form group.
   * @returns Observable<Beneficiary> newly created beneficiary user.
   */
  createBeneficiary(formValue: DemographicsFormValue): Observable<Beneficiary> {
    const request: BeneficiaryRequest = {
      ...formValue,
      dateOfBirth: formatDate(formValue.dateOfBirth, 'yyyy-MM-dd', 'en-US'),
      phoneNumber: parsePhoneNumberFromString(formValue.phoneNumber).formatInternational()
    };

    // TODO(RF-363) Remove mocks when the backend will be ready.
    const mockResponse: Beneficiary = {
      ...request,
      uuid: 'uuid-1234',
      paymentsEnabled: true
    };

    // return this.httpClient.post(this.CREATE_BENEFICIARY_URL, request)
    return new Observable<Beneficiary>(
      (subscriber => {
        setTimeout(() => {
          StorageService.storeUserId(mockResponse);
          subscriber.next(mockResponse);
          subscriber.complete();
        }, 500);
      })
    )
  }

  /**
   * Connects Plaid Public Token with a beneficiary.
   * Enables payments.
   *
   * @param beneficiaryUuid
   * @param plaidPublicToken
   */
  public addPlaidToken(beneficiaryUuid: string, plaidPublicToken: string) {
    // TODO(RF-363) replace this with an actual API call
    const beneficiary: Beneficiary = {
      uuid: '3123-4134-43141',
      dateOfBirth: '1997-09-09',
      firstName: 'firstName',
      lastName: 'lastName',
      phoneNumber: '+1055453543',
      paymentsEnabled: true,
      mailingAddress: {
        city: 'Los Angeles',
        state: 'CA',
        line1: 'line 1',
        line2: 'line 2',
        zipCode: '12345',
      }
    };
    return new Observable<Beneficiary>(
      (subscriber => {
        setTimeout(() => {
          StorageService.storePaymentsEnabled(beneficiary.paymentsEnabled);
          subscriber.next(beneficiary);
          subscriber.complete();
        }, 200)
      })
    );
  }

  /**
   * Issues a request to transfer funds from the funding source to the beneficiary's loan account.
   * @param beneficiaryUuid
   * @param amount Amount in USD provided by a user and parsed as a float.
   */
  public createPayment(beneficiaryUuid: string, amount: number): Observable<Payment> {
    // TODO(RF-363) replace this with an actual API call.
    // Will be used in a real request.
    const amountInCents = parseFloat(amount.toFixed(2)) * 100;
    return new Observable<Payment>(
      (subscriber => {
        setTimeout(() => {
          const uuid = '1234-4321-4567-7654';
          StorageService.storePaymentUuid(uuid);
          subscriber.next({
            uuid,
            status: PaymentStatus.ACCEPTED
          });
          subscriber.complete();
        }, 200);
      })
    );
  }
}
