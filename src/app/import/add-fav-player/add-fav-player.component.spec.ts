import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFavPlayerComponent } from './add-fav-player.component';

describe('AddFavPlayerComponent', () => {
  let component: AddFavPlayerComponent;
  let fixture: ComponentFixture<AddFavPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFavPlayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFavPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
