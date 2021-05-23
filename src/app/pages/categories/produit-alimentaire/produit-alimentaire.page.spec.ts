import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProduitAlimentairePage } from './produit-alimentaire.page';

describe('ProduitAlimentairePage', () => {
  let component: ProduitAlimentairePage;
  let fixture: ComponentFixture<ProduitAlimentairePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProduitAlimentairePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProduitAlimentairePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
