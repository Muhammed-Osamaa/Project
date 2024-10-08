import { Routes } from '@angular/router';
import { HotelsComponent } from './hotels/hotels.component';
import { HotelFilterComponent } from './hotel-filter/hotel-filter.component';
import { AppComponent } from './app.component';
import { NoteFoundErrorComponent } from './note-found-error/note-found-error.component';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';

export const routes: Routes = [
    {path:"hotels",component:HotelsComponent},
    {path:"hotels/rooms/:country",component:HotelFilterComponent},
    {path:"hotels/:id",component:HotelDetailsComponent}
];
