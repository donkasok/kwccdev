import { Insurer } from './../../../models/insurer';

import { UppercaseDirective } from './../../../directive/uppercase.directive';
import { CustomformValidators } from './../../../shared/customform.validator';
import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { Observable } from "rxjs/Observable";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "angularfire2/firestore";
import { FirestoreService } from "./../../../services/firestore.service";
import {
  FormGroup,
  FormControl,
  Validators,
  NgControlStatus
} from "@angular/forms";

import { Response } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/take";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/switchMap";
import { empty } from "rxjs/Observer";


@Component({
  selector: 'app-add-insurer',
  templateUrl: './add-insurer.component.html',
  styleUrls: ['./add-insurer.component.css']
})
export class AddInsurerComponent implements OnInit {

  insurer: Insurer = {
    name: ""
  };

  ref: AngularFirestoreCollection<Insurer>;
  insurers: Observable<Insurer[]>; //db
  dbTable: Observable<Insurer[]>; //db
  singleCollum: AngularFirestoreCollection<Insurer>;
  cheker;
  chekerMsg = false;

  form = new FormGroup({
    insurerField: new FormControl("", [
      Validators.required,
      Validators.minLength(2)
    ])
  });

  getErrorMessage() {
    return this.form.get("insurerField").hasError("required")
      ? "You must enter a value"
      : this.form.get("insurerField").hasError("minlength")
        ? "Min 2 letters"
          : "";
  }
  constructor(public addSnackBar: MatSnackBar, public db: FirestoreService) {}
  ngOnInit() {}

  

  checkEvent($event) {
    let q = $event.target.value;
    //console.log(q);
    let response = this.db
      .checkExist$("insurers", ref => ref.where("name", "==", q))
      .subscribe(res => {
        if (res.length === 1) {
          this.cheker = true;
        } else {
          this.cheker = false;
        }
      });
  }
  onSubmit() {
    
    this.db.add("insurers", this.insurer).then(() => {
      this.addSnackBar.open("Added", "Ok", { duration: 3000 });
      this.insurer.name = "";
    });
    this.form.reset();
  }

  // resetForm() {
  //   console.log("Hi reset");
  // }
  
}
