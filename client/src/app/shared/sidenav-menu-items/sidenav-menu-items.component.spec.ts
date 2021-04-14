import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavMenuItemsComponent } from './sidenav-menu-items.component';

describe('SidenavMenuItemsComponent', () => {
  let component: SidenavMenuItemsComponent;
  let fixture: ComponentFixture<SidenavMenuItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavMenuItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavMenuItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
