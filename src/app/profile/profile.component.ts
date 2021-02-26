import { AuthService } from '../auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { peliculaModel, PelisService } from '../pelis.service';
import { map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor( 
    public authservice: AuthService, 
    public afAuth: AngularFireAuth,
    private db: AngularFirestore, 
    public pelisService: PelisService
  ) {}

  numeroDePeliculasVistas;


  uid;
  titulo;
  director;
  pais;
  anio;
  taskId;
  myTask;
  taskToEdit;
  editMode: boolean = false;
  form: NgForm;
  f: NgForm;
  imgpelicula;
  userId;
  public data: peliculaModel[] = [];

  peliculaModel = new peliculaModel("","", undefined, undefined);

 
  tasks: Observable<any[]>;

   async ngOnInit() {
    const uid = (await this.afAuth.currentUser).uid;

    this.tasks = this.db
    .collection(`${'peliculasAAAAAAAAAAA'}${uid}`)
    .snapshotChanges().pipe(map(actions => {
       return actions.map(a => {
         //Get document data
         const data = a.payload.doc.data() as peliculaModel;
         //Get document id
         const id = a.payload.doc.id;
         //Use spread operator to add the id to the document data
         return { id, ...data };

       });
    }));    
    this.getNumeroPeliculasVistas()
  }

  getNumeroPeliculasVistas(){
    this.tasks.subscribe((resp)=>
    this.numeroDePeliculasVistas = resp.length)
  }

  deleteTask(task) {
  this.taskId = task.id;
  this.pelisService.deleteTask(this.taskId);
} 

edit(task){
  this.taskId = task.id;
  console.log(this.taskId);
  this.editMode = true;
  this.myTask = task.description;

} 

editTask(task){
  this.pelisService.updateTask(this.taskId, task);
  this.editMode = false;
  this.taskToEdit = ' ';

}


peliculaEnviada(titulo, director, pais, anio, imgpelicula) {
  this.pelisService.peliculaEnviada(titulo, director, pais, anio, imgpelicula);
  this.myTask = ' '
}

  logout() {
    this.authservice.logout();
  }
}