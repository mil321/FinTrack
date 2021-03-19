import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Debt } from '../models/debt.mode';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-add-debt',
  templateUrl: './add-debt.page.html',
  styleUrls: ['./add-debt.page.scss'],
})
export class AddDebtPage implements OnInit {
  debt = {} as Debt;

  constructor(
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private firestore: AngularFirestore,
    private user: AuthService
  ) { }

  ngOnInit() {}

  async createDebt(debt: Debt){
    if(this.formValidation()) {
      //show loader
      let loader = this.loadingCtrl.create({
      message: "Please wait..."
      });
      (await loader).present();
  
      try{
        await this.firestore.collection("debt").add(debt);

        // this.firestore.collection('users/').doc(`${this.user.getUID()}/`).collection('debt/').doc().set({
        //   name: this.debt.name,
        //   category: this.debt.category,
        //   description: this.debt.description,
        //   amount:this.debt.amount,
        //   date: this.debt.date,
        //   note: this.debt.note

        // })
      } catch(e){
      this.showToast(e);
      }
      //dismiss loader
      (await loader).dismiss();
      //redirect to home page
      this.navCtrl.navigateRoot("debt");
        }
      }
  
      formValidation(){
      if(!this.debt.name){
      this.showToast("Enter name");
      return false;
      }
      if(!this.debt.description){
      this.showToast("Enter description");
      return false;
      }
      if(!this.debt.amount){
      this.showToast("Enter amount");
      return false;
      }
      if(!this.debt.date){
      this.showToast("Enter date");
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