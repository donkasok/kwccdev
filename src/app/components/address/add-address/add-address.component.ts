import { Address } from './../../../models/address';
import { UppercaseDirective } from './../../../directive/uppercase.directive';
import { CustomformValidators } from './../../../shared/customform.validator';
import { Component, OnInit, Input } from "@angular/core";
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
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {

  @Input() customerId: string = "";
  //followUpTypes: Observable<FollowUpType[]>;

  address: Address = {
    lineOne: "",
    lineTwo:"",
    city:"",
    postal:"",
    state:""
  };

  //date = new FormControl(new Date());

  form = new FormGroup({
    lineOneField: new FormControl("", [
      Validators.required,
      Validators.minLength(2)
    ]),
    lineTwoField: new FormControl("", []),
    city: new FormControl("", []),
    state: new FormControl("", []),
    postal: new FormControl("", [])
  });

  getErrorMessage() {
    return this.form.get("lineOneField").hasError("required")
      ? "You must enter a value"
      : this.form.get("lineOneField").hasError("minlength") ? "Min 2 letters" : "";
  }

  constructor(public addSnackBar: MatSnackBar, public db: FirestoreService) {
    // this.followUpTypes = this.db.colWithIds$("follow-up-types", ref =>
    //   ref.orderBy("name", "desc")
    // );
  }
  ngOnInit() {}

  onSubmit() {
    // this.task.status = true;
    this.address.userId = this.customerId;

    this.db.add("addresses", this.address).then(() => {
      this.addSnackBar.open("Added", "Ok", { duration: 3000 });
      this.address.lineOne = "";
      this.address.lineTwo = "";
      this.address.city = "";
      this.address.postal = "";
      this.address.state = "";
      //this.task.date = "";
    });
    this.form.reset();
  }

}
