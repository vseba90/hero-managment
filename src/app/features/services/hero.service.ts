import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HeroeModel } from '../hero/models/heroe.model';

const heroes: HeroeModel[] = [
  {
    id: 1,
    name: 'SpiderMan',
    power: 'Sentidpo Aracnido',
    height: 180,
    weight: 65,
    enemy: 'Venom',
  },
  {
    id: 2,
    name: 'Superman',
    power: 'Super Fuerza',
    height: 195,
    weight: 80,
    enemy: 'Criptonita',
  },
  {
    id: 3,
    name: 'Thor',
    power: 'Fuerza, Dios',
    height: 200,
    weight: 100,
    enemy: 'Thanos',
  },
  {
    id: 4,
    name: 'SpiderMan',
    power: 'Sentidpo Aracnido',
    height: 180,
    weight: 65,
    enemy: 'Venom',
  },
];
@Injectable({
  providedIn: 'root',
})
export class HeroService {
  heroe = new BehaviorSubject<HeroeModel[] | undefined>(undefined);
  isLoadingSubject = new BehaviorSubject<boolean>(false)
  isLoading$ = this.isLoadingSubject.asObservable()
  #unsuscribe = new Subject<void>();
  
  getHeroe(): Observable<HeroeModel[]> {

    this.heroe.next(heroes);
    return this.heroe.asObservable();
  }
  putHeroe() {}
  deleteHeroe() {}
  getHeroeById() {}
}
