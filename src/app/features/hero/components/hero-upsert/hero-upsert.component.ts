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
import { ActivatedRoute } from '@angular/router';

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
  #location = inject(Location)

  heroeForm: FormGroup = this.#fb.group({
    name: ['', Validators.compose([Validators.required])],
    power: [
      '',
      Validators.compose([Validators.required, Validators.maxLength(100)]),
    ],
    height: ['', Validators.compose([Validators.required])],
    weight: ['', Validators.compose([Validators.required])],
    enemy: ['', Validators.compose([Validators.required])],
  });
  id = this.activatedRoute.snapshot.params['id'];

  ngOnInit(): void {}

  get f () {
    return this.heroeForm.controls
  }

  goBack() {
    this.#location.back()
  }

  submit() {
    const data = {
      name: this.f.name.value,
      power: this.f.power.value,
      height: this.f.height.value,
      weight: this.f.weight.value,
      enemy: this.f.enemy.value
    }
  }
}
