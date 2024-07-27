import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCatalogueComponent } from './home-catalogue.component';

describe('HomeCatalogueComponent', () => {
  let component: HomeCatalogueComponent;
  let fixture: ComponentFixture<HomeCatalogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeCatalogueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
