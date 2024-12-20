import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertHeroComponent } from './hero-upsert.component';

describe('UpsertHeroComponent', () => {
  let component: UpsertHeroComponent;
  let fixture: ComponentFixture<UpsertHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpsertHeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpsertHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
