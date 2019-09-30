import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "static-list",
  template: `
    <section class="col-sm-12">
      <div>
        <input
          type="text"
          style="color: orange"
          [placeholder]="xValue"
          [ngModel]="xValue"
          ngxTypeahead
          class="col-sm-12"
          [taList]="staticList"
          (taSelected)="handleStaticResultSelected($event)"
        />
      </div>
    </section>
  `
})
export class StaticListComponent {
  // taList： provide a static list of items to display.
  // taSelected： emits an event once the item is selected.
  @Input() xValue: string;
  @Output() valueChange = new EventEmitter();

  public staticList = [
    "Walmart",
    "Exxon Mobil",
    "Apple",
    "Berkshire Hathaway",
    "Amazon.com",
    "UnitedHealth Group",
    "McKesson",
    "CVS Health",
    "AT&T",
    "AmerisourceBergen",
    "Chevron",
    "Ford Motor",
    "General Motors",
    "Costco Wholesale",
    "Alphabet",
    "Cardinal Health",
    "Walgreens Boots Alliance",
    "JPMorgan Chase",
    "Verizon Communications",
    "Kroger",
    "General Electric",
    "Fannie Mae",
    "Phillips 66",
    "Valero Energy",
    "Bank of America",
    "Microsoft",
    "Home Depot",
    "Boeing",
    "Wells Fargo",
    "Citigroup",
    "Marathon Petroleum",
    "Comcast",
    "Anthem",
    "Dell Technologies",
    "DuPont de Nemours",
    "State Farm Insurance",
    "Johnson & Johnson",
    "IBM",
    "Target",
    "Freddie Mac",
    "United Parcel Service",
    "Lowe's",
    "Intel",
    "MetLife",
    "Procter & Gamble",
    "United Technologies",
    "FedEx",
    "PepsiCo",
    "Archer Daniels Midland",
    "Prudential Financial"
  ];

  handleStaticResultSelected(result) {
    this.valueChange.emit(result);
  }
}
