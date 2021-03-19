import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Post } from 'src/app/models/post.mode';

@Component({
  selector: 'app-edit-commit',
  templateUrl: './edit-commit.page.html',
  styleUrls: ['./edit-commit.page.scss'],
})
export class EditCommitPage implements OnInit {
  post = {} as Post;
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
    this.getPostById(this.id);
  }

  async getPostById(id: string){
    //show loader
    let loader = this.loadingCtrl.create({
    message: "Please wait..."
    });
    (await loader).present();
    this.firestore.doc("commitment/" + id)
    .valueChanges()
    .subscribe(data => {
    this.post.commitment = data["commitment"];
    this.post.enquiry = data["enquiry"];
    this.post.allocation = data["allocation"];
    this.post.date = data["date"];
    this.post.rate = data["rate"]
 });
 //dismiss loader
 (await loader).dismiss();
 }

 async updatePost(post: Post){
 if(this.formValidation()) {
 //show loader
 let loader = this.loadingCtrl.create({
 message: "Please wait..."
 });
 (await loader).present();

 try{

 await this.firestore.doc("commitment/" + this.id).update(post);
 } catch(e){
 this.showToast(e);
 }
 //dismiss loader
 (await loader).dismiss();

 //redirect to view post page
 this.navCtrl.navigateRoot("commitment");
 }
 }
 
 formValidation(){
 if(!this.post.commitment){
 this.showToast("Enter commitment");
 return false;
 }
 if(!this.post.enquiry){
 this.showToast("Enter enquiry");
 return false;
 }
 if(!this.post.allocation){
 this.showToast("Enter allocation");
 return false;
 }
 if(!this.post.date){
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