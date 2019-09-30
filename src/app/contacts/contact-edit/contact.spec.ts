import { Component, DebugElement } from "@angular/core";
import { TestBed, ComponentFixture } from "@angular/core/testing";
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { By } from "@angular/platform-browser";

describe("Contact Edit/Create component Form Validation", () => {
  let component: TestContactEditComponent;
  let fixture: ComponentFixture<TestContactEditComponent>;
  let de: DebugElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [TestContactEditComponent]
    });

    fixture = TestBed.createComponent(TestContactEditComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    component.ngOnInit();
  });

  fit("form should be invalid when empty", () => {
    let userName = component.editForm.controls["userName"];
    let errors = userName.errors || {};
    expect(component.editForm.valid).toBeFalsy();
    expect(userName.valid).toBeFalsy();
    expect(errors["required"]).toBeTruthy();
  });
  fit("username should be longer than minimum length", () => {
    let userName = component.editForm.controls["userName"];
    userName.setValue("p2@");
    let errors = userName.errors || {};
    expect(errors["required"]).toBeFalsy();
    expect(errors["minlength"]).toBeTruthy();
    expect(errors["pattern"]).toBeFalsy();
  });
  fit("username should include @", () => {
    let userName = component.editForm.controls["userName"];
    userName.setValue("p2energy");
    let errors = userName.errors || {};
    expect(errors["required"]).toBeFalsy();
    expect(errors["minlength"]).toBeFalsy();
    expect(errors["pattern"]).toBeTruthy();
  });
  fit("click button should trigger form validation", () => {
    let userName = component.editForm.controls["userName"];
    userName.setValue("p2energy");
    setTimeout(() => {
      de.query(By.css("button")).triggerEventHandler("click", {});
      expect(component.message).toBe("Login invalid!");
      userName.setValue("p2energy@p2es.com");
      setTimeout(() => {
        de.query(By.css("button")).triggerEventHandler("click", {});
        expect(component.message).toBe("Login valid!");
      });
    });
  });
});

@Component({
  template: `
    <form [formGroup]="editForm">
      <label style="font-weight: 600;">username/email:</label>
      <div>
        <input class="form-control" formControlName="userName" />
      </div>
      <button type="submit" (click)="saveContact()">
        save
      </button>
    </form>
  `
})
class TestContactEditComponent {
  editForm: FormGroup;
  message: string;
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.editForm = this.fb.group({
      userName: [
        "",
        [
          Validators.required,
          Validators.pattern("[^ @]*@[^ @]*"),
          Validators.minLength(5)
        ]
      ]
    });
  }

  saveContact(): void {
    if (this.editForm.valid) {
      this.message = "Login valid!";
    } else {
      this.message = "Login invalid!";
    }
  }
}
