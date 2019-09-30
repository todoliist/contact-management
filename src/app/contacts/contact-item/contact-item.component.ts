import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-contact-item",
  templateUrl: "./contact-item.component.html",
  styleUrls: ["./contact-item.component.sass"]
})
export class ContactItemComponent implements OnInit {
  @Input() fullName: string;
  @Input() id: string;
  @Input() address: string;
  @Input() phone: string;
  @Input() username: string;
  //only need if typedContent want to be preserved in search bar and url (as queryparams) when routing to different pages
  @Input() typedContent: string;
  // determine  if contacts are editable based on admin/user login
  @Input() ifAdmin: boolean;

  //background color 
  ifIdEven: boolean;

  ngOnInit() {
    this.ifIdEven = parseInt(this.id) % 2 === 0;
  }
}
