import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { ContactsComponent } from "./contacts.component";
import { ContactEditComponent } from "./contact-edit/contact-edit.component";
import { ContactCreateComponent } from "./contact-edit/contact-create.component";
import { ContactItemComponent } from "./contact-item/contact-item.component";
import { CmSharedModule } from "app/shared/shared.module";
import { StaticListComponent } from "./static-list";
import { ContactsResolverService } from "./contacts-resolver.service";
import { ContactGuard } from "./contact-edit/contact.guard";
@NgModule({
  imports: [
    BrowserModule,
    CmSharedModule,
    RouterModule.forChild([
      {
        path: "contacts",
        component: ContactsComponent,
        resolve: { contactsData: ContactsResolverService },
        children: [
          {
            path: "-1",
            component: ContactCreateComponent,
            canDeactivate: [ContactGuard]
          },
          {
            path: ":id",
            component: ContactEditComponent,
            canDeactivate: [ContactGuard]
          }
        ]
      }
    ])
  ],
  declarations: [
    ContactsComponent,
    ContactEditComponent,
    ContactCreateComponent,
    ContactItemComponent,
    StaticListComponent
  ]
})
export class ContactsModule {}
