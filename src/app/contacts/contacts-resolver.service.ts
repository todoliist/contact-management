import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { CmContact, CmContactService } from "app/mock";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ContactsResolverService implements Resolve<CmContact[]> {
  constructor(private contactService: CmContactService) {}

  resolve(
    activatedRouteSnapshot: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<CmContact[]> {
    return this.contactService.allContacts();
  }
}
