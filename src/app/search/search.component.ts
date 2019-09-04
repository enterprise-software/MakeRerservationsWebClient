import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { HotelService } from '../shared/hotel.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private hotelService: HotelService,
              private router: Router) { }
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  searchForm: FormGroup;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
  this.reactiveForm();
  }

  /* Reactive form */
  reactiveForm() {
  this.searchForm = this.fb.group({
    city: ['', [Validators.required]],
    dateFrom: ['', [Validators.required]],
    dateTo: ['', [Validators.required]],
    totalPeople: [1, [Validators.required]]
    });
  }

  dateFrom(e: { target: { value: string | number | Date; }; }) {
    const convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.searchForm.get('dateFrom').setValue(convertDate, {
      onlyself: true
    });
  }

  dateTo(e: { target: { value: string | number | Date; }; }) {
    const convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.searchForm.get('dateTo').setValue(convertDate, {
      onlyself: true
    });
  }

/* Handle form errors in Angular 8 */
  public errorHandling = (control: string, error: string) => {
    return this.searchForm.controls[control].hasError(error);
  }

  submitForm() {
    console.log(this.searchForm.status);
    if (this.searchForm.status !== 'INVALID') {
      console.log(this.searchForm.value);
      this.hotelService.GetHotels().subscribe((data: {}) => {
        this.hotelService.hotels = data;
        console.log(this.hotelService.hotels);
        this.router.navigate(['/hotellist'], {state: {data: {data}}});
      });
    }
  }
}
