import { inject, Injectable, signal } from '@angular/core';
import { Rooms } from '../_models/Rooms';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

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
      (x) => x.roomID.toString() === id
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
}
