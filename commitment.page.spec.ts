import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CommitmentPage } from './commitment.page';

describe('CommitmentPage', () => {
  let component: CommitmentPage;
  let fixture: ComponentFixture<CommitmentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommitmentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CommitmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
