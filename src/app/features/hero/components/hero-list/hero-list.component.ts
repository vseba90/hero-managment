import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HeroModel } from '../../models/heroe.model';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { HeroService } from 'src/app/features/services/hero.service';
import {
  combineLatest,
  debounceTime,
  map,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedService } from 'src/app/features/services/shared.service';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';

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
    MatPaginatorModule,
    HttpClientModule,
  ],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroListComponent implements OnInit, OnDestroy {
  #heroService = inject(HeroService);
  #sharedService = inject(SharedService);
  #dialog = inject(MatDialog);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  #unsubscribe = new Subject<void>();
  searchSubject = new Subject<string>();

  @ViewChild('searchInput') searchInput: ElementRef;

  displayedColumns: string[] = [
    'name',
    'power',
    'height',
    'weight',
    'enemy',
    'actions',
  ];

  pageSize = 5;
  pageIndex = 1;
  pageEvent: PageEvent;

  vm$ = combineLatest({
    heroes: this.#heroService.heroes.asObservable(),
    totalHeroes: this.#heroService.totalHeroes.asObservable()
  });

  ngOnInit(): void {
    this.#heroService.getPaginatedHeroes(this.pageIndex, this.pageSize).subscribe();
    this.searchSubject.pipe(
      debounceTime(500), 
      switchMap(async (searchTerm) => this.filterHeroes(searchTerm)) ,
      takeUntil(this.#unsubscribe),
    ).subscribe();
  }


  filterHeroes(searchTerm: string){
    this.#heroService.getHeroes(searchTerm).subscribe();
  }

  getSearchWord() {
    const searchTerm = this.searchInput.nativeElement.value.toLowerCase();
    this.searchSubject.next(searchTerm);
  }

  deleteHeroe(heroe: HeroModel): void {
    const dialogRef = this.#dialog.open(DialogConfirmComponent, {
      width: '400px',
      data: heroe,
    });

    dialogRef.afterClosed().subscribe((heroe) => {
      this.#heroService
        .deleteHeroe(heroe.id)
        .pipe(takeUntil(this.#unsubscribe))
        .subscribe({
          next: () => {
            this.#heroService.getPaginatedHeroes(1, this.pageSize).subscribe();
            this.searchInput.nativeElement.value = ''
            this.#sharedService.openSnackBar('Su heroe ha sido borrado');
          },
          error: () => {},
        });
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageIndex = e.pageIndex;
    this.#heroService.getPaginatedHeroes(this.pageIndex + 1, this.pageSize).subscribe();
  }

  ngOnDestroy(): void {
    this.#unsubscribe.next();
    this.#unsubscribe.complete();
  }
}
