import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PelisService {


   uid;
  async getUid(){
    this.uid = (await this.afAuth.currentUser).uid;
  }
 

ngOnInit(){
this.getUid();
}

  peliculaModel = new peliculaModel("","", "", 0);

  private taskDoc: AngularFirestoreDocument<peliculaModel>;
  private tasks: AngularFirestoreCollection;


    constructor(public db: AngularFirestore, 
                public afAuth: AngularFireAuth
                ) {
   
   }



   async peliculaEnviada(titulo, director, pais, anio, imgpelicula) {
    //Add the new task to the collection
    const uid = (await this.afAuth.currentUser).uid;
    
    console.log(uid)
    
     this.db.collection(`${'peliculasAAAAAAAAAAA'}${uid}`).doc().set({
      titulo: titulo,
      director: director,
      pais: pais,
      anio: anio,
      imgpelicula: imgpelicula
  }).then();
  } 
  updateTask(id, task) {
    this.db.collection('peliculas').doc(`${id}`).set({ 
      okey: task,
      completed: true },
      { merge: true });
 } 



 async deleteTask(id) {
  const uid =  (await this.afAuth.currentUser).uid;

  this.taskDoc = this.db.collection(`${'peliculasAAAAAAAAAAA'}${uid}`).doc<peliculaModel>(`${id}`);
  this.taskDoc.delete();
}


}


export class TaskModel {
  public id?: string; 
  description: string;
}

export class peliculaModel {
  constructor(
        public titulo?: string,
        public director?: string,
        public pais?: string,
        public anio?: number,
        public imgpelicula?: string,

    ) { }
}