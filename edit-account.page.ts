import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Bank } from 'src/app/models/bank.mode';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.page.html',
  styleUrls: ['./edit-account.page.scss'],
})
export class EditAccountPage implements OnInit {
  bank = {} as Bank;
  id: any;
  constructor(
    private actRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private firestore: AngularFirestore,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {
    this.id = this.actRoute.snapshot.paramMap.get("id");

   }

  ngOnInit() {
    this.getBankById(this.id);
  }

  async getBankById(id: string){
    //show loader
    let loader = this.loadingCtrl.create({
    message: "Please wait..."
    });
    (await loader).present();
    this.firestore.doc("bank/" + id)
    .valueChanges()
    .subscribe(data => {
    this.bank.account = data["account"];
    this.bank.amount = data["amount"];
    this.bank.date = data["date"];
    this.bank.note = data["note"];
 });
 //dismiss loader
 (await loader).dismiss();
 }
 async updateBank(bank: Bank){
 if(this.formValidation()) {
 //show loader
 let loader = this.loadingCtrl.create({
 message: "Please wait..."
 });
 (await loader).present();

 try{

 await this.firestore.doc("bank/" + this.id).update(bank);
 } catch(e){
 this.showToast(e);
 }
 //dismiss loader
 (await loader).dismiss();

 //redirect to view post page
 this.navCtrl.navigateRoot("bank");
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
