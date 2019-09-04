import { Component, OnInit } from '@angular/core';
import { HotelService } from '../shared/hotel.service';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit {
  hotels: any = [];
  constructor(private hotelService: HotelService) { }

  ngOnInit(): void {
    this.hotels = this.hotelService.hotels;
  }
}
