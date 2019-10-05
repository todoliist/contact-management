import { Component, OnInit } from "@angular/core";
import { CmContact, CmContactService } from "app/mock";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";
import { Observable, of } from "rxjs";

// const friends =[ "'ADEN','BALEN','CAIN','DAEL','EADA','FAEGAN','GABIAN','HAINES','IAERA','JACCOB','K.C','LACEY','MAC','NADAV','OANA','PACO','QUASHAWN','RABIAH','SABINO','TAHKI','UALDA','VADIM','WALDEN','XENIA','YANCY','ZAK'"];

@Component({
  templateUrl: "./contact-edit.component.html"
})
export class ContactEditComponent implements OnInit {
  // check if save or cancel button was clicked, to determine if CanDeactive guard cofirmation page need to popup
  saveOrCancelClicked: boolean = false;
  // model-driven form. mostly don't declare validators on the template(but we did in our case), instead we declare control names
  // using FormsModule that NgForm will be automatically applied to a <form> element but There is an exception: NgForm won't be applied to a <form> that has formGroup.
  editForm: FormGroup;
  contact: CmContact = {
    id: -1,
    firstName: "",
    lastName: "",
    username: "",
    address: "",
    phone: "",
    company: " ",
    friends: [],
    note: ""
  };
  id: number;
  constructor(
    private contactService: CmContactService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  getContact(id: number): void {
    this.contactService.getContactById(id).subscribe(contact => {
      this.contact = contact;
      this.editForm.get("userName").setValue(this.contact.username);
      this.editForm.get("firstName").setValue(this.contact.firstName);
      this.editForm.get("lastName").setValue(this.contact.lastName);
      this.editForm.get("pHone").setValue(this.contact.phone);
      this.editForm.get("address").setValue(this.contact.address);
    });
  }

  saveContact(): void {
    // clicked save button
    this.saveOrCancelClicked = true;
    this.contact.id = this.id;
    this.contact.username = this.editForm.get("userName").value;
    this.contact.firstName = this.editForm.get("firstName").value;
    this.contact.lastName = this.editForm.get("lastName").value;
    this.contact.phone = this.editForm.get("pHone").value;
    this.contact.address = this.editForm.get("address").value;
    this.contactService.saveContact(this.contact).subscribe(
      () => {
        // if direct navigate to contacts, updated form value will not show on contacts list
        // in html, the routerlink was added too, so router will first navigate to login
        // and then will navigate to contacts , the view will be updated as displayed
        this.router.navigate(["/contacts"]);
      }

      // {queryParamsHandling:'preserve'}
    );
  }

  revertContact(): void {
    this.getContact(this.id);
  }

  backToContacts(): void {
    // clicked cancel button
    this.saveOrCancelClicked = true;
    // using contactService to re-create contacts component(for session management purpose )
    // directly navigate to contacts can't create contacts component
    this.activatedRoute.params.subscribe(params => {
      this.id = +params["id"];
      this.contactService.getContactById(this.id).subscribe(() => {
        this.router.navigate(["/contacts"]);
      });
    });
  }

  delContact(): void {
    this.saveOrCancelClicked = true;
    if (confirm("Are you sure you want to delete this contact?")) {
      this.contactService
        .deleteContact(this.id)
        .subscribe(
          () => this.router.navigate(["/contacts"])
        );
    }
  }

  saveCompany(company) {
    this.contact.company = company;
  }

  formTouched(): Observable<boolean> {
    if (this.editForm.touched) {
      // if not reset, will always show confirm page once touched form
      this.editForm.markAsUntouched();
      return of(true);
    } else {
      return of(false);
    }
  }

  formSavedOrCancelled(): Observable<boolean> {
    if (this.saveOrCancelClicked) {
      // reset
      this.saveOrCancelClicked = false;
      return of(true);
    } else {
      return of(false);
    }
  }

  ngOnInit(): void {
    this.editForm = new FormGroup({
      userName: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      pHone: new FormControl(),
      address: new FormControl()
    });

    // formbuild can produce same result as above
    // this.editForm = this.fb.group({
    //   userName: ['', Validators.required,Validators.minLength(2), Validators.pattern("[^ @]*@[^ @]*")],
    //   firstName: ['', Validators.required, Validators.minLength(2)],
    //   lastName: ['', Validators.required, Validators.minLength(2)],
    //   pHone: ['', Validators.required, Validators.minLength(5)],
    //   address: ['', Validators.required, Validators.minLength(5)],
    // })

    this.activatedRoute.params.subscribe(params => {
      this.id = +params["id"];
      this.getContact(this.id);
      const originTime = new Date()
        .toLocaleTimeString()
        .slice(0, 7)
        .split(":");
      const time =
        +originTime[0] * 60 * 60 + +originTime[1] * 60 + +originTime[2];
      const edit = { url: this.router.url, time: time };
      sessionStorage.setItem("edit", JSON.stringify(edit));

      let editObj = JSON.parse(sessionStorage.getItem("edit"));
      console.log("edit at time: " + editObj.time + "s");
    });
  }
}
