import { UppercaseDirective } from './../../../directive/uppercase.directive';
import { CustomformValidators } from './../../../shared/customform.validator';
import { Salutation } from './../../../models/salutation';


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
  selector: 'app-add-salutation',
  templateUrl: './add-salutation.component.html',
  styleUrls: ['./add-salutation.component.css']
})
export class AddSalutationComponent implements OnInit {

  salutation: Salutation = {
    name: ""
  };

  ref: AngularFirestoreCollection<Salutation>;
  salutations: Observable<Salutation[]>; //db
  dbTable: Observable<Salutation[]>; //db
  singleCollum: AngularFirestoreCollection<Salutation>;
  cheker;
  chekerMsg = false;

  form = new FormGroup({
    salutationField: new FormControl("", [
      Validators.required,
      Validators.minLength(2),
      CustomformValidators.cannotContainSpace
    ])
  });

  getErrorMessage() {
    return this.form.get("salutationField").hasError("required")
      ? "You must enter a value"
      : this.form.get("salutationField").hasError("minlength")
        ? "Min 2 letters"
        : this.form.get("salutationField").hasError("cannotContainSpace")
          ? "Cannot contain space"
          : "";
  }
  constructor(public addSnackBar: MatSnackBar, public db: FirestoreService) {}
  ngOnInit() {}

  

  checkEvent($event) {
    let q = $event.target.value;
    //console.log(q);
    let response = this.db
      .checkExist$("salutations", ref => ref.where("name", "==", q))
      .subscribe(res => {
        if (res.length === 1) {
          this.cheker = true;
        } else {
          this.cheker = false;
        }
      });
  }
  onSubmit() {
    
    this.db.add("salutations", this.salutation).then(() => {
      this.addSnackBar.open("Added", "Ok", { duration: 3000 });
      this.salutation.name = "";
    });
    this.form.reset();
  }

  // resetForm() {
  //   console.log("Hi reset");
  // }
  
}