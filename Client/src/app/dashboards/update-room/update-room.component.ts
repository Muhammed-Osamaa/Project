import { Component, inject, input, OnInit, signal } from '@angular/core';
import { HotelsService } from '../../_services/hotels.service';
import { Rooms } from '../../_models/Rooms';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-room',
  standalone: true,
  imports: [FormsModule , NgIf],
  templateUrl: './update-room.component.html',
  styleUrl: './update-room.component.css'
})
export class UpdateRoomComponent implements OnInit {
  hotelService = inject(HotelsService);
  
  id = input.required<string>();
  room!:Rooms ;
  router = inject(Router)



  ngOnInit(): void {   
    this.hotelService.filterRoomsById(this.id()).subscribe({
      next:next=> {
        console.log(next);
        this.room = next       
      }   
    })
  }

  onSubmit() {
      this.hotelService.updateRoom(this.room,this.id()).subscribe({
        next:()=>{
          this.router.navigateByUrl('/dashboard')  
        }, 
        error : err => console.log(err),
        complete : () => {
          console.log("update is completed");
          
        }
        
      })
    }
}
