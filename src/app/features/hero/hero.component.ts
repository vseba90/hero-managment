import { Component } from '@angular/core';
import { TopbarComponent } from "./components/topbar/topbar.component";
import { HeroListComponent } from './components/hero-list/hero-list.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [TopbarComponent, HeroListComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {

}
