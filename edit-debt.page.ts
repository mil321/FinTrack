import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Debt } from 'src/app/models/debt.mode';

@Component({
  selector: 'app-edit-debt',
  templateUrl: './edit-debt.page.html',
  styleUrls: ['./edit-debt.page.scss'],
})
export class EditDebtPage implements OnInit {
  debt = {} as Debt;
  id: any;

  constructor(
    private actRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private firestore: AngularFirestore
  ) {
    this.id = this.actRoute.snapshot.paramMap.get("id");
   }

  ngOnInit() {
    this.getDebtById(this.id);
  }

  async getDebtById(id: string){
    //show loader
    let loader = this.loadingCtrl.create({
    message: "Please wait..."
    });
    (await loader).present();
    this.firestore.doc("debt/" + id)
    .valueChanges()
    .subscribe(data => {
    this.debt.category = data["category"];
    this.debt.name = data["name"];
    this.debt.amount = data["amount"];
    this.debt.date = data["date"];
    this.debt.description = data["description"];
    this.debt.note = data["note"]
 });
 //dismiss loader
 (await loader).dismiss();
 }

 async updateDebt(debt: Debt){
 if(this.formValidation()) {
 //show loader
 let loader = this.loadingCtrl.create({
 message: "Please wait..."
 });
 (await loader).present();

 try{

 await this.firestore.doc("debt/" + this.id).update(debt);
 } catch(e){
 this.showToast(e);
 }
 //dismiss loader
 (await loader).dismiss();

 //redirect to view post page
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
