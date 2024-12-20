import { Component, inject } from '@angular/core';
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
import { combineLatest } from 'rxjs';
import { HeroService } from 'src/app/features/services/hero.service';

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [
    MatTableModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    RouterModule
  ],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss',
})
export class HeroListComponent {
  #heroService = inject(HeroService)
  #dialog = inject(MatDialog)

  displayedColumns: string[] = [
    'name',
    'power',
    'height',
    'weight',
    'enemy',
    'actions',
  ];

  dataSource: HeroeModel[] = [];

  vm$ = combineLatest({
    heroes: this.#heroService.getHeroe()
  })

  deleteHeroe(heroe: HeroeModel): void {
    const dialogRef = this.#dialog.open(DialogConfirmComponent, {
      width: '400px',
      data: heroe,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
