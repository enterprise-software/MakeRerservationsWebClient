import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HotelService } from '../shared/hotel.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  hotelForm: FormGroup;
  rooms: FormArray;

  constructor(private fb: FormBuilder,
              private hotelService: HotelService) { }

  ngOnInit() {
    this.createFormHotels();
  }

  /* Reactive form */
  createFormHotels() {
    this.hotelForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      mainPhoneNumber: ['', [Validators.required]],
      city: ['', [Validators.required]],
      isActive: [true],
      travelAgentId: [1],
      // rooms: this.fb.array([this.createRoom()])
      rooms: this.fb.array([])
    });
  }

  createRoom() {
    return this.fb.group({
      number: [0, [Validators.required]],
      description: ['', [Validators.required]],
      floor: ['', [Validators.required]],
      isActive: [true],
      roomTypeId: [1]
    });
  }

  addRoom(): void {
    if (this.hotelForm.status === 'VALID') {
      this.rooms = this.hotelForm.get('rooms') as FormArray;
      this.rooms.push(this.createRoom());
    }
  }

  /* Handle form errors in Angular 8 */
  public errorHandling = (control: string, error: string) => {
    return this.hotelForm.controls[control].hasError(error);
  }

  submitForm() {
    console.log(this.hotelForm.status);
    if (this.hotelForm.status === 'VALID') {
      console.log(this.hotelForm.value);
      this.hotelService.CreateHotel(this.hotelForm.value).subscribe(res => {
        console.log('Hotel Added!');
      });
    }
  }
}
