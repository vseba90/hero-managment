import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HeroeModel } from '../../models/heroe.model';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { HeroService } from 'src/app/features/services/hero.service';
import { combineLatest } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    RouterModule,
  ],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss',
})
export class HeroListComponent implements OnInit {
  #heroService = inject(HeroService);
  #dialog = inject(MatDialog);

  displayedColumns: string[] = [
    'name',
    'power',
    'height',
    'weight',
    'enemy',
    'actions',
  ];

  vm$ = combineLatest({
    heroes: this.#heroService.heroes.asObservable(),
    isLoading: this.#heroService.isLoading$,
  });

  ngOnInit(): void {
    this.#heroService.getHeroes();
  }

  deleteHeroe(heroe: HeroeModel): void {
    const dialogRef = this.#dialog.open(DialogConfirmComponent, {
      width: '400px',
      data: heroe,
    });

    dialogRef.afterClosed().subscribe((heroe) => {
      this.#heroService.deleteHeroe(heroe.id)
    });
  }
}
