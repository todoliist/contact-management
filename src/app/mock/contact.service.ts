import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { InMemoryDbService } from "angular-in-memory-web-api";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

import { CmContact } from "./contact.model";

export class CmContactData implements InMemoryDbService {
  createDb() {
    const contacts = require("assets/contacts.json");
    return { contacts };
  }
}

/**
 * Refer to https://github.com/angular/in-memory-web-api#angular-in-memory-web-api
 * on how to simulate the REST service.
 */
@Injectable({
  providedIn: "root"
})
export class CmContactService {
  private log = window.console;
  private contactsUrl = "app/contacts";

  constructor(private http: HttpClient) {}

  allContacts(): Observable<CmContact[]> {
    return this.http
      .get(this.contactsUrl)
      .pipe(catchError(err => this.handleError(err)));
  }

  saveContact(contact: CmContact): Observable<boolean> {
    return this.http
      .post(this.contactsUrl, contact)
      .pipe(catchError(err => this.handleError(err)));
  }

  getContactById(id: number): Observable<CmContact> {
    return this.http
      .get(`${this.contactsUrl}/${id}`)
      .pipe(catchError(err => this.handleError(err)));
  }

  createContact(contact: CmContact): Observable<CmContact> {
    // const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http.post<CmContact>(this.contactsUrl, contact,
      // { headers }
      );
  }

  search(term?: string): Observable<CmContact[]> {
    const url = term
      ? `${this.contactsUrl}?firstName=^${term}`
      : this.contactsUrl;
    return this.http.get(url).pipe(catchError(err => this.handleError(err)));
  }

  deleteContact(id: number): Observable<CmContact> {
    const url = `${this.contactsUrl}/${id}`;
    // const httpOptions = {
    //   headers: new HttpHeaders({ "Content-Type": "application/json" })
    // };
    return this.http.delete<CmContact>(url,
      // httpOptions
      );
  }
  private handleError(res: HttpErrorResponse | any): Observable<any> {
    // in a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (res instanceof HttpErrorResponse) {
      const err = res.error;
      errMsg = `${res.status} - ${res.statusText || ""} ${err}`;
    } else {
      errMsg = res.message ? res.message : res.toString();
    }
    this.log.error(errMsg);
    return of(errMsg);
  }
}
