import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HeroeModel } from '../hero/models/heroe.model';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  heroes = new BehaviorSubject<HeroeModel[]>([
    {
      id: 1,
      name: 'SpiderMan',
      power: 'Sentido Aracnido',
      height: 180,
      weight: 65,
      enemy: 'Venom',
    },
    {
      id: 22,
      name: 'Superman',
      power: 'Super Fuerza',
      height: 195,
      weight: 80,
      enemy: 'Criptonita',
    },
    {
      id: 33,
      name: 'Thor',
      power: 'Fuerza, Dios',
      height: 200,
      weight: 100,
      enemy: 'Thanos',
    },
    {
      id: 44,
      name: 'Hulk',
      power: 'Poder nuclear',
      height: 380,
      weight: 150,
      enemy: 'Iron Man',
    },
  ]);

  isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  getHeroes(): Observable<HeroeModel[]> {
    this.isLoadingSubject.next(true);
    setTimeout(() => {
      this.isLoadingSubject.next(false);
    }, 1000);
    return this.heroes.asObservable();
  }
  putHero(hero: HeroeModel) {
    const updatedHeroes = this.heroes.getValue().map((actualHero) => {
      if (actualHero.id == hero.id) {
        return { ...hero, ...hero };
      }
      return actualHero
    });

    this.heroes.next(updatedHeroes);
  }

  createHero(hero: HeroeModel) {
    this.isLoadingSubject.next(true);
    this.heroes.next([...this.heroes.getValue(), hero]);
    this.isLoadingSubject.next(false);
  }

  deleteHeroe(id: number) {
    this.isLoadingSubject.next(true);
    const updatedHeroes = this.heroes
      .getValue()
      .filter((hero) => hero.id !== id);

    this.isLoadingSubject.next(false);
    this.heroes.next(updatedHeroes);
  }

  getHeroById(id: number) {
    this.isLoadingSubject.next(true);
    const hero = this.heroes.getValue().find((hero) => hero.id == id);
    return of(hero);
  }
}
