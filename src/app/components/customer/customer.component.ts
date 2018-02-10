import { Gender } from './../../models/gender';
import { Salutation } from './../../models/salutation';
import { Customer } from './../../models/customer';

import { FirestoreService } from "./../../services/firestore.service";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "angularfire2/firestore";
import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { Observable } from "rxjs/Observable";
import {
  FormGroup,
  FormControl,
  Validators,
  NgControlStatus
} from "@angular/forms";
import { CustomformValidators } from "./../../shared/customform.validator";

import { Response } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/take";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/switchMap";
import { empty } from "rxjs/Observer";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

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

  addState: boolean = true;

  editForm = new FormGroup({
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
    dateField: new FormControl('', [])
  });


  getErrorMessage() {
    return this.editForm.get("firstNameField").hasError("required")
      ? "You must enter a value"
      : this.editForm.get("firstNameField").hasError("minlength")
        ? "Min 3 letters"
        : this.editForm.get("firstNameField").hasError("cannotContainSpace")
          ? "Cannot contain space"
          : "";
  }

  getErrorMessageLastName() {
    return this.editForm.get("lastNameField").hasError("required")
      ? "You must enter a value"
      : this.editForm.get("lastNameField").hasError("minlength")
        ? "Min 3 letters"
        : "";
  }





  ref: AngularFirestoreCollection<Customer>;
  customers: Observable<Customer[]>; //db
  salutations:Observable<Salutation[]>;
  genders:Observable<Gender[]>;

  constructor(public editSnackBar: MatSnackBar, public db: FirestoreService) { 
    
    this.salutations = this.db.colWithIds$("salutations", ref => ref.orderBy("name", "desc"));
    this.genders = this.db.colWithIds$("genders", ref => ref.orderBy("name", "desc"));
    //console.log(this.salutations);

  }

  showCustomerFromParent = function(customer: Customer) {
    this.customer = customer;
    this.addState = false;
    //console.log(this.customer.name);
  };
  
  updateCustomer(ref: Customer) {
    this.db.update("customers/" + ref.id, ref).then(() => {
      this.editSnackBar.open("Updated", "Ok", { duration: 3000 });
      this.addState = true;
    });
  }

  ngOnInit() {
  }

}
