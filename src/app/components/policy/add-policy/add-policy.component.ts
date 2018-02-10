import { Status } from './../../../models/status';
import { Insurer } from './../../../models/insurer';
import { InsuranceType } from './../../../models/insurance-type';
import { Policy } from './../../../models/policy';
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
  selector: 'app-add-policy',
  templateUrl: './add-policy.component.html',
  styleUrls: ['./add-policy.component.css']
})
export class AddPolicyComponent implements OnInit {

  //addState: boolean = true;
 @Input() customerId: string = "";
 insurerTypes: Observable<InsuranceType[]>;
 insurer: Observable<Insurer[]>;
 policyStatus: Observable<Status[]>;

  policy: Policy = {
    policyNo: "",
    insurancePlan:"",
    policyStartDate:"",
    policyEndDate:"",
    hs:"",
    pa:"",
    disabilityIncome:"",
    death:"",
    hospitalIncome:"",
    criticalIlliness:"",
    elderShield:"",
    savings:"",
    motor:"",
    investments:"",
    premiumAmount:"",
    coverageDetail:"",
    insurerTypeId:"",
    insurerId:"",
    policyStatusId:""

  };

  //date = new FormControl(new Date());
  
  form = new FormGroup({
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
    
  });

  getErrorMessage() {
    return this.form.get("policyNo").hasError("required")
      ? "You must enter a value"
      : this.form.get("policyNo").hasError("minlength") ? "Min 2 letters" : "";
  }

  constructor(public addSnackBar: MatSnackBar, public db: FirestoreService) {
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
  ngOnInit() {}

  onSubmit() {

    this.policy.userId = this.customerId;

    this.db.add("policies", this.policy).then(() => {
      //console.log(this.policy);
      this.addSnackBar.open("Added", "Ok", { duration: 3000 });
      this.policy.policyNo = "";
      //this.addState = true;
      // this.address.lineTwo = "";
      // this.address.city = "";
      // this.address.postal = "";
      // this.address.state = "";
      
      this.policy.insurancePlan = "";
      this.policy.policyStartDate = "";
      this.policy.policyEndDate = "";
      this.policy.hs = "";
      this.policy.pa = "";
      this.policy.disabilityIncome = "";
      this.policy.death = "";
      this.policy.hospitalIncome = "";
      this.policy.criticalIlliness = "";
      this.policy.elderShield = "";
      this.policy.savings = "";
      this.policy.motor = "";
      this.policy.investments = "";
      this.policy.premiumAmount = "";
      this.policy.coverageDetail = "";
      this.policy.insurerTypeId = "";
      this.policy.insurerId = "";
      this.policy.policyStatusId = "";
    });
    this.form.reset();
  }

}