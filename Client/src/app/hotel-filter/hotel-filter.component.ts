import {
  Component,
  computed,
  effect,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { HotelsService } from '../_services/hotels.service';
import { ActivatedRoute } from '@angular/router';
import { HotelCardComponent } from '../hotel-card/hotel-card.component';
import { Rooms } from '../_models/Rooms';

@Component({
  selector: 'app-hotel-filter',
  standalone: true,
  imports: [HotelCardComponent],
  templateUrl: './hotel-filter.component.html',
  styleUrl: './hotel-filter.component.css',
})
export class HotelFilterComponent implements OnInit {
  hotelService = inject(HotelsService);
  route = inject(ActivatedRoute);

  country = signal<string>('');
  roomType = signal<string>('');

  rooms = signal<Rooms[]>([]);
  
  ngOnInit(): void {
    
    this.route.paramMap.subscribe(params => {
      this.country.set(params.get('country') || '');
      this.route.queryParamMap.subscribe(queryParams => {
        this.roomType.set(queryParams.get('roomType') || '');
        this.fetchRooms();
      });
    });
  }
/**
 *
 */
// constructor() {
//   effect(()=> {
//     this.fetchRooms();
//   })
  
// }
//   ngOnInit(): void {
//     this.route.paramMap.subscribe({
//       next: (params) => {
//         this.country.set(params.get('country') || 'egypt');
//       },
//     });
  
//     this.route.queryParamMap.subscribe({
//       next: (queryParams) => {
//         this.roomType.set(queryParams.get('roomType') || '1');
       
//       },
//     });
//   }

  fetchRooms() {
    this.hotelService.filterRooms(this.country(), this.roomType()).subscribe({
      next: (rooms) => {
        if(rooms){
          this.rooms.set(rooms);
        }else{
          this.rooms.set([]);
        }
      },
      error: (err) => this.rooms.set([])
    });
  }

  // //send + HotelFilterComponent
  // rooms = computed(() => {
  //   let roomList: Rooms[] = [];
  //   this.hotelService.filterRooms(this.country(), this.roomType()).subscribe({
  //     next: rooms => roomList = rooms
  //   });
  //   return roomList;
  // });

}
