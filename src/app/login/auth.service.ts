import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  message: string;

  constructor(private router: Router) {}
  login(username: string, password: string): void {
    if (!username || !password) {
      this.message = "username and password can't be missing";
    } else if (username == "admin" && password == "123") {
      //  sessionstorage register the adminData
      const adminData = { username: username, password: password };
      sessionStorage.setItem("adminData", JSON.stringify(adminData));
      this.router.navigate(["/contacts"]);
    } else if (username == "user" && password == "pass") {
      //  sessionstorage register the userData
      const userData = { username: username, password: password };
      sessionStorage.setItem("userData", JSON.stringify(userData));
      this.router.navigate(["/contacts"]);
    } else {
      this.message = "Please enter a valid user name and password.";
    }
  }
}
