import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { HotelsService } from '../_services/hotels.service';
import { HotelCardComponent } from "../hotel-card/hotel-card.component";
import { FormsModule, NgModel } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { Rooms } from '../_models/Rooms';

@Component({
  selector: 'app-hotels',
  standalone: true,
  imports: [HotelCardComponent , FormsModule, PaginationModule],
  templateUrl: './hotels.component.html',
  styleUrl: './hotels.component.css'
})
export class HotelsComponent implements OnInit{
  paginatedRooms = signal<Rooms[]>([]);
  currentPage = signal(1);          
  itemsPerPage = 12;                 
  totalItems = signal(0);            
  roomService = inject(HotelsService);



  constructor() {
    effect(() => {
      const rooms = this.roomService.hotels();
      if (rooms) {
        this.totalItems.set(rooms.length);
        this.paginateRooms();
      }
    },{ allowSignalWrites: true });
  }

  ngOnInit() {
    if(!this.roomService.hotels()) this.roomService.loadRooms();
  }



// Function to paginate rooms based on the current page
paginateRooms(): void {
  const rooms = this.roomService.hotels();
  if (rooms) {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedRooms.set(rooms.slice(startIndex, endIndex));
  }
}

// Event handler when page changes
onPageChange(event: any): void {
  this.currentPage.set(event.page);
  this.paginateRooms();
}
}
