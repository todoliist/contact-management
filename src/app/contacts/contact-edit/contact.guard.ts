import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { ContactEditComponent } from "./contact-edit.component";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ContactGuard implements CanDeactivate<ContactEditComponent> {
  ifDeactivate: boolean; //true if leave current page
  canDeactivate(
    component: ContactEditComponent
  ): boolean | Observable<boolean> | Promise<boolean> {
    component.formTouched().subscribe(ifTouched => {
      component.formSavedOrClicked().subscribe(ifSavedOrCancelled => {
        console.log("ifTouched:" + ifTouched + "   " + "ifSaved:" + ifSavedOrCancelled);
        if (ifTouched && !ifSavedOrCancelled) {
          console.log("touched but not saved/cancelled, will ask confirm");
          if (
            confirm("contact info haven't been saved, are you sure to leave?")
          ) {
            this.ifDeactivate = true;
          } else {
            this.ifDeactivate = false;
          }
        }
        if (ifTouched && ifSavedOrCancelled) {
          console.log(" touched and saved/cancelled, will leave ");
          this.ifDeactivate = true;
        }
        if (!ifTouched) {
          console.log("not touched, will leave ");
          this.ifDeactivate = true;
        }
      });
    });
    console.log("CanDeactivate guard return final decision: true/false ");
    return this.ifDeactivate;
    // the only bug is when you edit form, click contacts page, confirmation page pop up, you click no
    // and you click contacts page again, this guard wont work(will directly leave),  because form was mark As Untouched in formTouched()
    // but in fact the form was touched
  }
}
