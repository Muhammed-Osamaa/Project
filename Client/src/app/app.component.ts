import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FormsModule, NgModel } from '@angular/forms';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent,CarouselModule,RouterLink,FormsModule,NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  country = signal<string>('egypt');
  list : string[] = ['1', '2', '3', '4']; 
  guest = signal<string>(this.list[0]);
  router = inject(Router);
  onSend(){
  
    this.router.navigate(["hotels/rooms/",this.country()],
    {queryParams:
      {
        'roomType':this.guest()
      }
    }) //hotels/rooms/this.country()?roomType=1
  }
}
