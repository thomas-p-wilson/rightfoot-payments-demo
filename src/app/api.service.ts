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

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private CREATE_BENEFICIARY_URL = `${environment.apiUrl}/beneficiaries`;

  constructor(private httpClient: HttpClient) {
  }

  createBeneficiary(formValue: DemographicsFormValue) {
    const request: BeneficiaryRequest = {
      ...formValue,
      dateOfBirth: formatDate(formValue.dateOfBirth, 'yyyy-MM-dd', 'en-US'),
      phoneNumber: parsePhoneNumberFromString(formValue.phoneNumber).formatInternational()
    };

    // TODO remove mocks when the backend will be ready.
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
}