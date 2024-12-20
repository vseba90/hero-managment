import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroService } from 'src/app/features/services/hero.service';

@Component({
  selector: 'app-hero-upsert',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './hero-upsert.component.html',
  styleUrl: './hero-upsert.component.scss',
})
export class UpsertHeroComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  #fb = inject(FormBuilder);
  #router = inject(Router);
  #location = inject(Location);
  #heroesServices = inject(HeroService);

  heroeForm: FormGroup = this.#fb.group({
    name: ['', Validators.required],
    power: ['', Validators.required],
    height: ['', Validators.required],
    weight: ['', Validators.required],
    enemy: ['', Validators.required],
  });
  id = this.activatedRoute.snapshot.params['id'];

  ngOnInit(): void {
    if (this.id) {
      this.#heroesServices.getHeroById(this.id).subscribe((hero) => {
        this.heroeForm.patchValue({
          name: hero.name,
          power: hero.power,
          height: hero.height,
          weight: hero.weight,
          enemy: hero.enemy,
        });
      });
    }
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
      this.#heroesServices.putHero(data);
      this.#router.navigate(['/list']);
    } else {
      this.#heroesServices.createHero(data);
      this.#router.navigate(['/list']);
    }
  }
}
