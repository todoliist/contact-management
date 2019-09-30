import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
@Component({
  templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
//'template-driven' form(#loginForm="ngForm"): Angular will add an implicit directive to the form and 
// add validators mostly declaratively in the template
  
  message: string;
  constructor(private auth: AuthService, private router: Router) {}
  ngOnInit(): void {
    // only works when admin refresh the page, app starts and then auto-navigate to login page, thus session contains admin
    if (sessionStorage.getItem("adminData")) {
      // get objs from session and contacts created time
      const contactsObj = JSON.parse(sessionStorage.getItem("contacts"));
      const editObj = JSON.parse(sessionStorage.getItem("edit"));
      const createObj = JSON.parse(sessionStorage.getItem("create"));
      const contactsTime = contactsObj.time;

      // clicked create page but not edit page
      if (sessionStorage.getItem("create") && !sessionStorage.getItem("edit")) {
        const createTime = createObj.time;
        // page with larger time is the most recent page the admin stays
        if (createTime > contactsTime) {
          this.router.navigate([createObj.url]);
        } else {
          this.router.navigate([contactsObj.url]);
        }
      } else if (
         // clicked edit page but not create page
        !sessionStorage.getItem("create") &&
        sessionStorage.getItem("edit")
      ) {
        const editTime = editObj.time;
        if (editTime > contactsTime) {
          this.router.navigate([editObj.url]);
        } else {
          this.router.navigate([contactsObj.url]);
        }
      } else if (
        // clicked both edit and create page
        sessionStorage.getItem("create") &&
        sessionStorage.getItem("edit")
      ) {
        const createTime = createObj.time;
        const editTime = editObj.time;
        switch (Math.max(createTime, editTime, contactsTime)) {
          case createTime:
            this.router.navigate([createObj.url]);
            break;
          case editTime:
            this.router.navigate([editObj.url]);
            break;
          // contacts was clicked the most recently
          default:
            this.router.navigate([contactsObj.url]);
            break;
        }
      } else {
        // only contacts page was opened
        this.router.navigate([contactsObj.url]);
      }
    }
  }

  onFormSubmit(userForm: NgForm) {
    if (userForm) {
      const username = userForm.form.value.username;
      const password = userForm.form.value.password;
      this.auth.login(username, password);
      this.message = this.auth.message;
    }
  }
}
