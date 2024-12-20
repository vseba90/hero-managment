import { Component } from '@angular/core';
import { TopbarComponent } from "./components/topbar/topbar.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [TopbarComponent, RouterModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {

}
