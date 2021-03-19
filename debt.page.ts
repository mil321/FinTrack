import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Debt } from 'src/app/models/debt.mode';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-debt',
  templateUrl: './debt.page.html',
  styleUrls: ['./debt.page.scss'],
})
export class DebtPage implements OnInit {
  debt = {} as Debt;
  debts: any;
  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private firestore: AngularFirestore,
    private user: AuthService
  ) { }

  ngOnInit() {
    this.getDebts();
  }
  
  async getDebts() {
    //show loader
    let loader = await this.loadingCtrl.create({
      message: "Please wait..."
    });
    loader.present();

    try{
      this.firestore
      .collection('debt/')
      .snapshotChanges()
      .subscribe(data => {
        this.debts = data.map(e => {
          return {
            id: e.payload.doc.id,
            name: e.payload.doc.data()["name"],
            category:e.payload.doc.data()["category"],
            description: e.payload.doc.data()["description"],
            amount: e.payload.doc.data()["amount"],
            date: e.payload.doc.data()["date"],
            note: e.payload.doc.data()["note"]
          };
        });
        loader.dismiss();
      });
    }catch(e){
      this.showToast(e);
    }
  }

  async deleteDebt(id: string){
    //show loader
    let loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();

    await this.firestore.doc("debt/"+ id).delete();

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
