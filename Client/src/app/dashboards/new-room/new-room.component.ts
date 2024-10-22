import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Rooms } from '../../_models/Rooms';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HotelsService } from '../../_services/hotels.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-room',
  standalone: true,
  imports: [FormsModule , NgIf],
  templateUrl: './new-room.component.html',
  styleUrl: './new-room.component.css'
})
export class NewRoomComponent {
  hotelService = inject(HotelsService);
  router = inject(Router)
  room : Rooms = {
    roomTitle : '',
    roomAddress: '',
    roomOwner:'',
    roomDescribtion: '',
    city:'',
    country:'',
    price:0,
    rating:0,
    roomType:0,
    photo: [{ url: '' },{url:''},{url:''},{url:''}]

  }

  onSubmit() {
    this.hotelService.CreateRoom(this.room).subscribe({
      error : err => console.log(err),
      complete: () =>   this.router.navigateByUrl('/dashboard')
    })
    
    }
  }

