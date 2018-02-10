import { Status } from './../../models/status';
import { Insurer } from './../../models/insurer';
import { InsuranceType } from './../../models/insurance-type';
import { Policy } from './../../models/policy';
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
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {

  addState: boolean = true;
  checker;

  @Input()
  customerId: string = "";
  insurerTypes: Observable<InsuranceType[]>;
  insurer: Observable<Insurer[]>;
  policyStatus: Observable<Status[]>;

  editForm = new FormGroup({
    policyNo: new FormControl("", [
      Validators.required,
      Validators.minLength(2)
    ]),
    insurancePlan: new FormControl("", []),
    policyStartDate: new FormControl(new Date()),
    policyEndDate: new FormControl(new Date()),
    hs: new FormControl("", []),
    pa: new FormControl("", []),
    disabilityIncome: new FormControl("", []),
    death: new FormControl("", []),
    hospitalIncome: new FormControl("", []),
    criticalIlliness: new FormControl("", []),
    elderShield: new FormControl("", []),
    savings: new FormControl("", []),
    motor: new FormControl("", []),
    investments: new FormControl("", []),
    premiumAmount: new FormControl("", []),
    coverageDetail: new FormControl("", []),
    insurerTypeId: new FormControl("", []),
    insurerId: new FormControl("", []),
    policyStatusId: new FormControl("", [])
    // lineTwoField: new FormControl("", []),
    // city: new FormControl("", []),
    // state: new FormControl("", []),
    // postal: new FormControl("", [])
  });

  getErrorMessage() {
    return this.editForm.get("policyNo").hasError("required")
      ? "You must enter a value"
      : this.editForm.get("policyNo").hasError("minlength") ? "Min 2 letters" : "";
  }

  constructor(public editSnackBar: MatSnackBar, public db: FirestoreService) {
    this.insurerTypes = this.db.colWithIds$("insurance-types", ref =>
      ref.orderBy("name", "desc")
    );
    this.insurer = this.db.colWithIds$("insurers", ref =>
      ref.orderBy("name", "desc")
    );
    this.policyStatus = this.db.colWithIds$("status", ref =>
      ref.orderBy("name", "desc")
    );
  }

  showFromParent = function(policy: Policy) {
    this.policy = policy;
    this.addState = false;
  };

  check($event) {
    let q = $event.target.value;
    let response = this.db
      .checkExist$("policies", ref => ref.where("policyNo", "==", q))
      .subscribe(res => {
        if (res.length === 1) {
          this.checker = true;
        } else {
          this.checker = false;
        }
      });
  }

  update(ref: Policy) {
    //console.log(ref);
    this.db.update("policies/" + ref.id, ref).then(() => {
      this.editSnackBar.open("Updated", "Ok", { duration: 3000 });
      this.addState = true;
    });
  }

  ngOnInit() {}

}
