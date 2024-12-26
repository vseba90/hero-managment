import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { NameCapitalizeDirective } from 'src/app/features/directive/name-capitalize';
import { HeroService } from 'src/app/features/services/hero.service';
import { SharedService } from 'src/app/features/services/shared.service';

@Component({
  selector: 'app-hero-upsert',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    NameCapitalizeDirective,
  ],
  templateUrl: './hero-upsert.component.html',
  styleUrl: './hero-upsert.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpsertHeroComponent implements OnInit, OnDestroy {
  activatedRoute = inject(ActivatedRoute);
  #sharedService = inject(SharedService);
  #fb = inject(FormBuilder);
  #router = inject(Router);
  #location = inject(Location);
  #heroesServices = inject(HeroService);
  #unsubscribe = new Subject<void>();

  heroeForm: FormGroup;
  id: string;
  ngOnInit(): void {
    this.initForm();
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.#heroesServices
          .getHeroById(this.id)
          .pipe(takeUntil(this.#unsubscribe))
          .subscribe((hero) => {
            if (hero) {
              this.heroeForm.patchValue(hero[0]);
            }
          });
      }
    });
  }

  initForm() {
    this.heroeForm = this.#fb.group({
      name: ['', Validators.required],
      power: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
      enemy: ['', Validators.required],
    });
  }

  get f() {
    return this.heroeForm.controls;
  }

  goBack() {
    this.#location.back();
  }

  submit() {
    const data = {
      id: this.id,
      name: this.f.name.value,
      power: this.f.power.value,
      height: this.f.height.value,
      weight: this.f.weight.value,
      enemy: this.f.enemy.value,
    };

    if (this.id) {
      this.#heroesServices
        .putHero(this.id, data)
        .pipe(takeUntil(this.#unsubscribe))
        .subscribe({
          next: () => {
            this.redirectToList('Su heroe fue modificado');
          },
          error: () => {},
        });
    } else {
      delete data.id;
      this.#heroesServices
        .createHero(data)
        .pipe(takeUntil(this.#unsubscribe))
        .subscribe({
          next: () => {
            this.redirectToList('Su heroe ha sido creado correctamente');
          },
        });
    }
  }

  redirectToList(message: string) {
    this.#sharedService.openSnackBar(message);
    this.#router.navigate(['/list']);
  }
  ngOnDestroy(): void {
    this.#unsubscribe.next();
    this.#unsubscribe.complete();
  }
}
