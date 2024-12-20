import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

export interface heroeModel {
  name: string;
  power: string;
  height: number;
  weight: number;
  enemy: string;
}

const ELEMENT_DATA: heroeModel[] = [
  {
    name: 'SpiderMan',
    power: 'Sentidpo Aracnido',
    height: 180,
    weight: 65,
    enemy: 'Venom',
  },
  {
    name: 'Superman',
    power: 'Super Fuerza',
    height: 195,
    weight: 80,
    enemy: 'Criptonita',
  },
  {
    name: 'Thor',
    power: 'Fuerza, Dios',
    height: 200,
    weight: 100,
    enemy: 'Thanos',
  },
  {
    name: 'SpiderMan',
    power: 'Sentidpo Aracnido',
    height: 180,
    weight: 65,
    enemy: 'Venom',
  },
];

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [
    MatTableModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss',
})
export class HeroListComponent {
  displayedColumns: string[] = ['name', 'power', 'height', 'weight', 'enemy'];
  dataSource = ELEMENT_DATA;
}
