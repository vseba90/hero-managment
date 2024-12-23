import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroRoutingModule } from './hero-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HeroService } from '../services/hero.service';
import { NameCapitalizeDirective } from '../directive/name-capitalize'; 
@NgModule({
  declarations: [],
  imports: [CommonModule, HeroRoutingModule, RouterModule, HttpClientModule, NameCapitalizeDirective],
  providers: [HeroService],
})
export class HeroModule {}
