import { Component, computed, effect, inject, input, OnInit, signal } from '@angular/core';
import { HotelsService } from '../_services/hotels.service';
import { ActivatedRoute } from '@angular/router';
import { HotelCardComponent } from "../hotel-card/hotel-card.component";
import { Rooms } from '../_models/Rooms';

@Component({
  selector: 'app-hotel-filter',
  standalone: true,
  imports: [HotelCardComponent],
  templateUrl: './hotel-filter.component.html',
  styleUrl: './hotel-filter.component.css'
})
export class HotelFilterComponent{
  hotelService = inject(HotelsService);
  route = inject(ActivatedRoute);
  
  country = input.required<string>();
  roomType = input.required<string>();
   
  rooms = computed(() => {
    let roomList: Rooms[] = [];
    this.hotelService.filterRooms(this.country(), this.roomType()).subscribe({
      next: rooms => roomList = rooms
    });
    return roomList;
  });
}
