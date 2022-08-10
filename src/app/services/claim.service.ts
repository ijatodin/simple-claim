import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
interface GenericResponse {
  message: string;
  data: any;
}

@Injectable({
  providedIn: 'root',
})
export class ClaimService {
  constructor(private http: HttpClient) {}

  storeClaim(data: any) {
    return this.http.post<GenericResponse>(`${environment.apiUrl}/claim-store`, data);
  }

  storeAttachment(data: any) {
    return this.http.post<GenericResponse>(`${environment.apiUrl}/file-store`, data);
  }

  updateClaim(data: any) {
    return this.http.post<GenericResponse>(`${environment.apiUrl}/claim-update`, data);
  }

  getClaims() {
    return this.http.post<GenericResponse>(`${environment.apiUrl}/claim-all`, {});
  }
}
