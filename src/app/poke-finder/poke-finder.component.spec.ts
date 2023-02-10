import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { PokeFinderComponent } from './poke-finder.component';

describe('PokeFinderComponent', () => {
  let component: PokeFinderComponent;
  let fixture: ComponentFixture<PokeFinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, ReactiveFormsModule],
      declarations: [ PokeFinderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokeFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
