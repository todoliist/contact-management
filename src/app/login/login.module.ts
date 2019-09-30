import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { CmSharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
   CmSharedModule,
    RouterModule.forChild([
      {path:'login', component: LoginComponent}
    ])
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule { }
