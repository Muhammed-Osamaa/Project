import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FormsModule, NgModel } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent,CarouselModule,RouterLink,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  country = signal<string>('');
  guest = signal<string>('');
  router = inject(Router);
  onSend(){
    this.router.navigate(["hotels/rooms/",this.country()],{queryParams:{roomType:this.guest()}})
  }
}
