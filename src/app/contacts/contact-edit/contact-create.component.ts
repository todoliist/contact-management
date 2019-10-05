import { Component, OnInit } from "@angular/core";
import { CmContact, CmContactService } from "app/mock";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";
import { Observable, of } from "rxjs";

// const friends =[ "'ADEN','BALEN','CAIN','DAEL','EADA','FAEGAN','GABIAN','HAINES','IAERA','JACCOB','K.C','LACEY','MAC','NADAV','OANA','PACO','QUASHAWN','RABIAH','SABINO','TAHKI','UALDA','VADIM','WALDEN','XENIA','YANCY','ZAK'"];

@Component({
  templateUrl: "./contact-create.component.html"
})
export class ContactCreateComponent implements OnInit {
  saveOrCancelClicked: boolean = false;
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
    private router: Router
  ) {}

  saveContact(): void {
    this.saveOrCancelClicked = true;
    this.contact.id = this.id;
    this.contact.username = this.editForm.get("userName").value;
    this.contact.firstName = this.editForm.get("firstName").value;
    this.contact.lastName = this.editForm.get("lastName").value;
    this.contact.phone = this.editForm.get("pHone").value;
    this.contact.address = this.editForm.get("address").value;
    this.contactService.saveContact(this.contact).subscribe(() => {
      this.router.navigate(["/contacts"]);
    });
  }

  clearContact(): void {
    const inputEle = document.getElementsByTagName("input");
    for (var i = 0; i < inputEle.length; i++) {
      inputEle[i].value = "";
    }
    this.contact.company = "";
    document.getElementsByTagName("textarea")[0].value = "";
    document.getElementById("save").setAttribute("disabled", "true");
  }

  backToContacts(): void {
    this.saveOrCancelClicked = true;
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
        .subscribe(() => this.router.navigate(["/contacts"]));
    }
  }

  saveCompany(company) {
    this.contact.company = company;
  }

  formTouched(): Observable<boolean> {
    if (this.editForm.touched) {
      this.editForm.markAsUntouched();
      return of(true);
    } else {
      return of(false);
    }
  }

  formSavedOrCancelled(): Observable<boolean> {
    if (this.saveOrCancelClicked) {
      this.saveOrCancelClicked = false;
      return of(true);
    } else {
      return of(false);
    }
  }

  ngOnInit(): void {
    const originTime = new Date()
      .toLocaleTimeString()
      .slice(0, 7)
      .split(":");
    const time =
      +originTime[0] * 60 * 60 + +originTime[1] * 60 + +originTime[2];
    const created = { url: this.router.url, time: time };
    sessionStorage.setItem("create", JSON.stringify(created));

    let createObj = JSON.parse(sessionStorage.getItem("create"));
    console.log("create at time: " + createObj.time + "s");
    var json = require("../../../assets/contacts.json");
    // json files' last element's id +1
    this.id = parseInt(json.slice(-1)[0].id) + 1;
    this.editForm = new FormGroup({
      userName: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      pHone: new FormControl(),
      address: new FormControl()
    });
  }
}
