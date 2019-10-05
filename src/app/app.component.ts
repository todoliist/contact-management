import { Component } from "@angular/core";
import {
  Event,
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from "@angular/router";
import { slideInAnimation } from "./app.animation";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"],
  animations: [slideInAnimation]
})
export class AppComponent {
  title = "contact-management";
  previousUrl: string;
  spinner: boolean;
  constructor(private router: Router) {
    // setTimeout is used to solve 'Expression has changed after it was checked error'
    setTimeout(() => {
      router.events.subscribe((routerEvent: Event) => {
        if (routerEvent instanceof NavigationStart) {
          this.spinner = true;
        }
        if (
          routerEvent instanceof NavigationEnd ||
          routerEvent instanceof NavigationCancel ||
          routerEvent instanceof NavigationError
        ) {
          this.spinner = false;
        }
      });
    });
  }
  ngOnInit() {
    // as user, session will be clear when he refresh page after login
    // as admin, session will be kept when he refresh page after login
    if (sessionStorage.getItem("userData")) {
      sessionStorage.clear();
    }

    // no matter user/admin, they both will be redirect to login page first
    // but for admin, login oninit will redirect page to contacts
    this.router.navigate([""]);
  }

  ifSessionEx(): boolean {
    if (
      sessionStorage.getItem("adminData") ||
      sessionStorage.getItem("userData")
    ) {
      return true;
    }
  }
  logOut(): void {
    sessionStorage.clear();
  }
}
