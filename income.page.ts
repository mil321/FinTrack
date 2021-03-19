import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Income } from 'src/app/models/income.mode';

@Component({
  selector: 'app-income',
  templateUrl: './income.page.html',
  styleUrls: ['./income.page.scss'],
})
export class IncomePage implements OnInit {
  income = {} as Income;
  incomes: any;
  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private firestore: AngularFirestore,
    private user: AuthService
  ) { }

  ngOnInit() {
    this.getIncome();
  }

  async getIncome() {
    //show loader
    let loader = await this.loadingCtrl.create({
      message:"Please wait..."
    });
    loader.present();

    try{
      this.firestore
      .collection('income/')
      .snapshotChanges()
      .subscribe(data => {
        this.incomes = data.map(e => {
          return {
            id: e.payload.doc.id,
            income: e.payload.doc.data()["income"],
            category: e.payload.doc.data()["category"],
            amount: e.payload.doc.data()["amount"],
            date: e.payload.doc.data()["date"],
            rate: e.payload.doc.data()["rate"]
          };
        });
      });
      (await loader).dismiss();
    }catch(e){
      this.showToast(e);
    }
  }

  async deleteIncome(id:string){
    //show loader
    let loader = this.loadingCtrl.create({
      message:"Please wait..."
    });
    (await loader).present();

    await this.firestore.doc("income/" + id).delete();

    //dismiss loader
    (await loader).dismiss();
  }

  showToast (message:string){
    this.toastCtrl.create({
      message: message,
      duration: 3000
    }).then(toastData => toastData.present());
  }

}
