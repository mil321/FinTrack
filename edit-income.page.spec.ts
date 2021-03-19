import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditIncomePage } from './edit-income.page';

describe('EditIncomePage', () => {
  let component: EditIncomePage;
  let fixture: ComponentFixture<EditIncomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditIncomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditIncomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
