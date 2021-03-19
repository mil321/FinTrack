import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Bank } from 'src/app/models/bank.mode';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  bank = {} as Bank;
  banks: any;
  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private firestore: AngularFirestore,
    private user: AuthService
  ) { }

  ngOnInit() {
    this.getBanks();
  }

  async getBanks() {
    //show loader
    let loader = await this.loadingCtrl.create({
      message: "Please wait..."
    });
    loader.present();

    try{
      this.firestore
      .collection('bank/')
      .snapshotChanges()
      .subscribe(data => {
        this.banks = data.map(e => {
          return {
            id: e.payload.doc.id,
            account: e.payload.doc.data()["account"],
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

  async deleteBank(id: string){
    //show loader
    let loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();

    await this.firestore.doc("bank/"+ id).delete();

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
