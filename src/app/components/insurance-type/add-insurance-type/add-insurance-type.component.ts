import { InsuranceType } from './../../../models/insurance-type';
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
  selector: 'app-add-insurance-type',
  templateUrl: './add-insurance-type.component.html',
  styleUrls: ['./add-insurance-type.component.css']
})
export class AddInsuranceTypeComponent implements OnInit {

  insuranceType: InsuranceType = {
    name: ""
  };

  ref: AngularFirestoreCollection<InsuranceType>;
  insuranceTypes: Observable<InsuranceType[]>; //db
  dbTable: Observable<InsuranceType[]>; //db
  singleCollum: AngularFirestoreCollection<InsuranceType>;
  cheker;
  chekerMsg = false;

  form = new FormGroup({
    insuranceTypeField: new FormControl("", [
      Validators.required,
      Validators.minLength(2),
      CustomformValidators.cannotContainSpace
    ])
  });

  getErrorMessage() {
    return this.form.get("insuranceTypeField").hasError("required")
      ? "You must enter a value"
      : this.form.get("insuranceTypeField").hasError("minlength")
        ? "Min 2 letters"
        : this.form.get("insuranceTypeField").hasError("cannotContainSpace")
          ? "Cannot contain space"
          : "";
  }
  constructor(public addSnackBar: MatSnackBar, public db: FirestoreService) {}
  ngOnInit() {}

  

  checkEvent($event) {
    let q = $event.target.value;
    //console.log(q);
    let response = this.db
      .checkExist$("insurance-types", ref => ref.where("name", "==", q))
      .subscribe(res => {
        if (res.length === 1) {
          this.cheker = true;
        } else {
          this.cheker = false;
        }
      });
  }
  onSubmit() {
    
    this.db.add("insurance-types", this.insuranceType).then(() => {
      this.addSnackBar.open("Added", "Ok", { duration: 3000 });
      this.insuranceType.name = "";
    });
    this.form.reset();
  }

  // resetForm() {
  //   console.log("Hi reset");
  // }
  
}
