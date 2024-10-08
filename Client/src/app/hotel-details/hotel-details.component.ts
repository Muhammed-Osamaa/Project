import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Rooms } from '../_models/Rooms';
import { HotelsService } from '../_services/hotels.service';
import { single } from 'rxjs';

@Component({
  selector: 'app-hotel-details',
  standalone: true,
  imports: [],
  templateUrl: './hotel-details.component.html',
  styleUrl: './hotel-details.component.css'
})
export class HotelDetailsComponent implements OnInit {
  hotelService = inject(HotelsService);
  route = inject(ActivatedRoute);
  id = input.required<string>();
  room = signal<Rooms|undefined>(undefined);

  ngOnInit(): void {
    this.hotelService.filterRoomsById(this.id()).subscribe({
      next:next=> this.room.set(next),
      complete:() => console.log(this.room())
    })
  }
}
