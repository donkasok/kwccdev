import { Gender } from './../../../models/gender';
import { Salutation } from './../../../models/salutation';
import { Customer } from './../../../models/customer';
import { CustomformValidators } from "./../../../shared/customform.validator";
import { UppercaseDirective} from "./../../../directive/uppercase.directive";
import { Designation } from "./../../../models/designation";
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
  Validators
} from "@angular/forms";

//import {ErrorStateMatcher} from '@angular/material/core';

import { Response } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/take";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/switchMap";
import { empty } from "rxjs/Observer";



/** Error when invalid control is dirty, touched, or submitted. */
// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }


@Component({
  selector: 'app-add-cutomer',
  templateUrl: './add-cutomer.component.html',
  styleUrls: ['./add-cutomer.component.css']
})



export class AddCutomerComponent implements OnInit {

  customer: Customer = {
    salutation:"",
    firstName:"",
    lastName:"",
    email:"",
    tel:"",
    mob:"",
    fax:"",
    web:"",
    gender:"",
    dob:null
  };
 
  
  ref: AngularFirestoreCollection<Designation>;
  designations: Observable<Designation[]>; //db
  salutations:Observable<Salutation[]>;
  genders:Observable<Gender[]>;

  form = new FormGroup({
    firstNameField: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
      CustomformValidators.cannotContainSpace
    ]),
    salutationField: new FormControl("", [
      Validators.required
    ]),
    lastNameField: new FormControl("", [
      Validators.required,
      Validators.minLength(3)
    ]),
    emailField : new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    telField : new FormControl('', []),
    mobField : new FormControl('', []),
    faxField : new FormControl('', []),
    webField : new FormControl('', []),
    genderField: new FormControl('', []),
    dateField: new FormControl("", [])
  });

  //matcher = new MyErrorStateMatcher();
 getErrorMessage() {
    return this.form.get("firstNameField").hasError("required")
      ? "You must enter a value"
      : this.form.get("firstNameField").hasError("minlength")
        ? "Min 3 letters"
        : this.form.get("firstNameField").hasError("cannotContainSpace")
          ? "Cannot contain space"
          : "";
  }

  getErrorMessageLastName() {
    return this.form.get("lastNameField").hasError("required")
      ? "You must enter a value"
      : this.form.get("lastNameField").hasError("minlength")
        ? "Min 3 letters"
        : "";
  }

  

  constructor(public addSnackBar: MatSnackBar, public db: FirestoreService) {
   
    this.salutations = this.db.colWithIds$("salutations", ref => ref.orderBy("name", "desc"));
    //console.log(this.salutations);

    this.genders = this.db.colWithIds$("genders", ref => ref.orderBy("name", "desc"));
    //console.log(this.genders);

   }

  ngOnInit() {}

  onSubmit() {
    //console.log(this.customer);
    this.db.add("customers", this.customer).then(() => {
      this.addSnackBar.open("Added", "Ok", { duration: 3000 });
      this.customer.firstName = "";
      this.customer.lastName = "";
      this.customer.email = "";
      this.customer.tel = "";
      this.customer.mob = "";
      this.customer.fax = "";
      this.customer.web = "";
      this.customer.salutation = "";
      this.customer.gender = "";
      this.customer.dob = null;
    });
    this.form.reset();
    
  }

}


