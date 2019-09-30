import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import {
  HttpClientInMemoryWebApiModule,
  InMemoryWebApiModule
} from "angular-in-memory-web-api";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { CmContactData } from "./mock";
import { CmCoreModule } from "./core/core.module";
import { CmSharedModule } from "./shared/shared.module";
import { AppRoutingModule } from "./app-routing.module";
import { LoginModule } from "./login/login.module";
import { ContactsModule } from "./contacts/contacts.module";

export const InMemoryModule = HttpClientInMemoryWebApiModule.forRoot(
  CmContactData,
  {
    // hijack the http.get, which gives problem for remote fetching of MarkDown documents
    passThruUnknownUrl: true
  }
);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    // to simulate backend service
    InMemoryWebApiModule.forRoot( CmContactData, {
      delay: 1000
    }),
    BrowserModule,
    LoginModule,
    ContactsModule,
    InMemoryModule,
    CmSharedModule,
    CmCoreModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
