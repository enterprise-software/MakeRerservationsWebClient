import { Component, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HotelService } from './shared/hotel.service';

export interface Subject {
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  searchForm: FormGroup;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(public fb: FormBuilder,
    private hotelService: HotelService) { }

  ngOnInit(): void {
    this.reactiveForm()
  }

  /* Reactive form */
  reactiveForm() {
    this.searchForm = this.fb.group({
      city: ['', [Validators.required]],
      dateFrom: ['', [Validators.required]],
      dateTo: ['', [Validators.required]],
      totalPeople: [1, [Validators.required]]
    })
  }

  dateFrom(e: { target: { value: string | number | Date; }; }) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.searchForm.get('dateFrom').setValue(convertDate, {
      onlyself: true
    });
  }

  dateTo(e: { target: { value: string | number | Date; }; }) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.searchForm.get('dateTo').setValue(convertDate, {
      onlyself: true
    });
  }

  /* Handle form errors in Angular 8 */
  public errorHandling = (control: string, error: string) => {
    return this.searchForm.controls[control].hasError(error);
  }
  hotels: any = [];
  submitForm() {
    console.log(this.searchForm.status);
    if (this.searchForm.status != "INVALID") {
      console.log(this.searchForm.value);
      this.hotelService.GetHotels().subscribe((data: {}) => {
        this.hotels = data;
        console.log(this.hotels);
      })
    }
  }

}
