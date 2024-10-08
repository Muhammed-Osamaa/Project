import { Component, inject, OnInit, signal } from '@angular/core';
import { HotelsService } from '../_services/hotels.service';
import { HotelCardComponent } from "../hotel-card/hotel-card.component";
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotels',
  standalone: true,
  imports: [HotelCardComponent , FormsModule],
  templateUrl: './hotels.component.html',
  styleUrl: './hotels.component.css'
})
export class HotelsComponent implements OnInit{
  
  roomService = inject(HotelsService);
  
  ngOnInit() {
    if(!this.roomService.hotels()) this.roomService.loadRooms();    
  }

 
}
