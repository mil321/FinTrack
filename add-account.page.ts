import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Bank } from 'src/app/models/bank.mode';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.page.html',
  styleUrls: ['./add-account.page.scss'],
})
export class AddAccountPage implements OnInit {
  bank = {} as Bank;
  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private firestore: AngularFirestore,
    private user: AuthService
  ) { }

  ngOnInit() {}

  async createBank(bank: Bank){
    if(this.formValidation()) {
      //show loader
      let loader = this.loadingCtrl.create({
      message: "Please wait..."
      });
      (await loader).present();
  
      try{
        await this.firestore.collection("bank").add(bank);

        // this.firestore.collection('users/').doc(`${this.user.getUID()}/`).collection('bank/').doc().set({
        //   account: this.bank.account,
        //   amount: this.bank.amount,
        //   date: this.bank.date,
        //   note: this.bank.note
        // })
      } catch(e){
      this.showToast(e);
      }
      //dismiss loader
      (await loader).dismiss();
      //redirect to home page
      this.navCtrl.navigateRoot("account");
        }
      }
  
      formValidation(){
      if(!this.bank.account){
      this.showToast("Enter bank");
      return false;
      }
      if(!this.bank.amount){
      this.showToast("Enter amount");
      return false;
      }
      if(!this.bank.date){
      this.showToast("Enter date");
      return false;
      }
      if(!this.bank.note){
      this.showToast("Enter note");
      return false;
      }
      return true;
      }
      showToast (message:string){
      this.toastCtrl.create({
      message: message,
      duration: 3000
      })
      .then(toastData => toastData.present());
    }
  }