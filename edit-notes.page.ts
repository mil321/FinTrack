import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Note } from 'src/app/models/note.mode';

@Component({
  selector: 'app-edit-notes',
  templateUrl: './edit-notes.page.html',
  styleUrls: ['./edit-notes.page.scss'],
})
export class EditNotesPage implements OnInit {
 note = {} as Note;
 id: any;
  constructor (
    private actRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private firestore: AngularFirestore
  ) {
    this.id = this.actRoute.snapshot.paramMap.get("id");

   }

  ngOnInit() {
    this.getNoteById(this.id);
  }

  async getNoteById(id: string){
    //show loader
    let loader = this.loadingCtrl.create({
    message: "Please wait..."
    });
    (await loader).present();
    this.firestore.doc("notes/" + id)
    .valueChanges()
    .subscribe(data => {
    this.note.date = data["date"];
    this.note.note = data["note"]
 });
 //dismiss loader
 (await loader).dismiss();
 }

 async updateNote(note: Note){
  if(this.formValidation()) {
  //show loader
  let loader = this.loadingCtrl.create({
  message: "Please wait..."
  });
  (await loader).present();
 
  try{
 
  await this.firestore.doc("notes/" + this.id).update(note);
  } catch(e){
  this.showToast(e);
  }
  //dismiss loader
  (await loader).dismiss();
 
  //redirect to view post page
  this.navCtrl.navigateRoot("notes");
  }
  }

  formValidation(){
    if(!this.note.date){
    this.showToast("Enter date");
    return false;
    }
    if(!this.note.note){
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