import { inject, Injectable, signal } from '@angular/core';
import { Rooms } from '../_models/Rooms';
import { HttpClient } from '@angular/common/http';
import { map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HotelsService {
  hotels = signal<Rooms[] | undefined>(undefined);
  httpClient = inject(HttpClient);


  loadRooms() {
    this.httpClient.get<Rooms[]>('https://localhost:5001/api/room').subscribe({
      next: (value) => this.hotels.set(value),
      error: (error) => console.log(error),
      complete: () => console.log('done'),
    });
  }

  
  //click hotel > getAllrooms > hotels Signal > filterRoom 1- check hotels signal , filter 
  // room has value > subscribe 
  filterRooms(country: string, roomType: string) {
    const room = this.hotels()?.filter(
      (x) => x.country === country && x.roomType.toString() === roomType
    );
    if (room) {
      return of(room);
    }
    else {
      return this.httpClient.get<Rooms[]>(
        'https://localhost:5001/api/room/filter/' +
          country.toLowerCase() +
          '?' +
          'roomType=' +
          roomType
      );
    }
  }

  filterRoomsById(id:string) {
    const room = this.hotels()?.find(
      (x) => x.roomID?.toString() === id
    );
    if (room) {
      return of(room);
    }
    else {
      return this.httpClient.get<Rooms>(
        'https://localhost:5001/api/room/'+id
      );
    }

  }

//dashboard/room/create
 CreateRoom(room:Rooms) {
       
        return this.httpClient.post<number>( 'https://localhost:5001/api/room/dashboard/room/create' , room).pipe(
          map((roomId) => {
            console.log(roomId);
            
            const newRoom = {...room , roomID:roomId , isActive : false}
            console.log(newRoom);
            
            const newRoomArray = [...this.hotels()!,newRoom];
            this.hotels.set(newRoomArray);
            console.log(this.hotels());
            
          })
        )
 }

 //dashboard/room/{id}
 updateRoom(room:Rooms , id : string) {
  return this.httpClient.put("https://localhost:5001/api/room/dashboard/room/"+id , room).pipe(
    tap(() => {
      this.hotels.update(oldRooms => oldRooms?.map(oldRoom => oldRoom.roomID?.toString() === id? room : oldRoom))
    })
  )
 }

 //"dashboard/delete/{id}"
 deleteRoom(id : string) {
  return this.httpClient.delete("https://localhost:5001/api/room/dashboard/delete/"+id).pipe(
    tap(()=> {
      this.hotels.update(oldRooms => oldRooms?.filter(oldroom => oldroom.roomID?.toString() != id))
    })
  )
}
}
