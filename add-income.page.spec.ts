import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddIncomePage } from './add-income.page';

describe('AddIncomePage', () => {
  let component: AddIncomePage;
  let fixture: ComponentFixture<AddIncomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIncomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddIncomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
