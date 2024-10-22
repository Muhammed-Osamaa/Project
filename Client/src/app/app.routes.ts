import { Routes } from '@angular/router';
import { HotelsComponent } from './hotels/hotels.component';
import { HotelFilterComponent } from './hotel-filter/hotel-filter.component';
import { AppComponent } from './app.component';
import { NoteFoundErrorComponent } from './note-found-error/note-found-error.component';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { AllRoomsComponent } from './dashboards/all-rooms/all-rooms.component';
import { NewRoomComponent } from './dashboards/new-room/new-room.component';
import { UpdateRoomComponent } from './dashboards/update-room/update-room.component';
import { DeleteRoomComponent } from './dashboards/delete-room/delete-room.component';
import { RoomDetailsComponent } from './dashboards/room-details/room-details.component';

export const routes: Routes = [
    {path:"hotels",component:HotelsComponent},
    {path:"hotels/rooms/:country",component:HotelFilterComponent},
    {path:"hotels/:id",component:HotelDetailsComponent},
    {path: "dashboard" , component:AllRoomsComponent},
    {path: "dashboard/RoomCreate" , component:NewRoomComponent},
    {path: "dashboard/RoomUpdate/:id" , component:UpdateRoomComponent},
    {path: "dashboard/RoomDelete/:id" , component:DeleteRoomComponent},
    {path:"dashboard/details/:id" , component:RoomDetailsComponent}

];
