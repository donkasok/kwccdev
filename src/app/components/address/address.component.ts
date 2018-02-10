import { Address } from './../../models/address';
import { FirestoreService } from "./../../services/firestore.service";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "angularfire2/firestore";
import { Component, OnInit, Input } from "@angular/core";
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
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  addState: boolean = true;
  checker;

  @Input()
  customerId: string = "";

  editForm = new FormGroup({
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
    return this.editForm.get("lineOneField").hasError("required")
      ? "You must enter a value"
      : this.editForm.get("lineOneField").hasError("minlength") ? "Min 2 letters" : "";
  }

  constructor(public editSnackBar: MatSnackBar, public db: FirestoreService) {}

  showFromParent = function(address: Address) {
    this.address = address;
    this.addState = false;
  };

  check($event) {
    let q = $event.target.value;
    let response = this.db
      .checkExist$("addresses", ref => ref.where("name", "==", q))
      .subscribe(res => {
        if (res.length === 1) {
          this.checker = true;
        } else {
          this.checker = false;
        }
      });
  }

  update(ref: Address) {
    //console.log(ref);
    this.db.update("addresses/" + ref.id, ref).then(() => {
      this.editSnackBar.open("Updated", "Ok", { duration: 3000 });
      this.addState = true;
    });
  }

  ngOnInit() {}

}
