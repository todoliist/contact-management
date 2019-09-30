import { Component, OnInit } from "@angular/core";
import { CmContactService, CmContact } from "app/mock";
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  templateUrl: "./contacts.component.html"
})
export class ContactsComponent implements OnInit {
  ifAdmin: boolean = false;
  contacts: CmContact[] = [];
  // searchedContacts instead of contacts is used to display contact list
  searchedContacts: CmContact[] = [];
  // _typedContent = "";
  counts: number = 0;
  // only used to store&trasfer queryparams
  backedContent: string;
  //starting page that been displayed
  p: number = 1;
  constructor(
    private router: Router,
    private cmContactService: CmContactService,
    private activatedRoute: ActivatedRoute,
  ) {}

  // need this if typedContent has to show on page
  // get typedContent(): string {
  //   return this._typedContent;
  // }
  set typedContent(value: string) {
    // this._typedContent = value;
    this.searchedContacts = value
      ? this.searchByFirstName(value)
      : this.contacts;
  }

  searchByFirstName(typedString: string): CmContact[] {
    this.cmContactService.search(typedString).subscribe(searchedContacts => {
      this.searchedContacts = searchedContacts;
    });
    return this.searchedContacts;
  }

  // sort first name by ascending/descending order depends on click counts
  sortByFirstName() {
    this.counts++;
    this.searchedContacts.sort((a: CmContact, b: CmContact) =>
      this.compareFirstName(a, b)
    );
  }

  compareFirstName(a: CmContact, b: CmContact) {
    const nameA = a.firstName.toLowerCase();
    const nameB = b.firstName.toLowerCase();
    // Ascending
    if (this.counts % 2 !== 0) {
      // such as a, b
      if (nameA < nameB) {
        // keep the order
        return -1;
      }
      // such as b, a
      if (nameA > nameB) {
        // reverse the name
        return 1;
      }
      return 0;
    } else {
       // Descending
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }
      return 0;
    }
  }

  ngOnInit(): void {
    if (sessionStorage.getItem("adminData")) {
      this.ifAdmin = true;
      console.log("admin log in ");
    } else {
      this.ifAdmin = false;
      console.log("user log in ");
    }

    // to save the typed content when routing from contacts to edit and then back to contacts page
    // this.activatedRoute.queryParams.subscribe(params => {
    // this.backedContent = params["filter"] || "";
    // });

    this.activatedRoute.params.subscribe(params => {
      const originTime = new Date()
        .toLocaleTimeString()
        // delete am/pm and seperate by :  e.g [12:25:00]
        .slice(0, 7)
        .split(":");
        // convert to sec
      const time =
        +originTime[0] * 60 * 60 + +originTime[1] * 60 + +originTime[2];
        // contacts object for session storage
      const contacts = { url: this.router.url, time: time };
      sessionStorage.setItem("contacts", JSON.stringify(contacts));

      let contactsObj = JSON.parse(sessionStorage.getItem("contacts"));
      console.log("contacts at time: " + contactsObj.time + "s");
    });

    // original contacts fetching method
    // this.cmContactService.allContacts().subscribe(contacts => {
    // this.contacts = contacts;
    // this.searchedContacts = contacts;
    // });

    // prefetching contacts data to make sure all information(data+frame) can be present at the same time
    this.contacts = this.activatedRoute.snapshot.data["contactsData"];
    this.searchedContacts = this.activatedRoute.snapshot.data["contactsData"];
  }
}
