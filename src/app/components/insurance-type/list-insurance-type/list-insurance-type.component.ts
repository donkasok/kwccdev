import { InsuranceType } from './../../../models/insurance-type';
import {
  Component,
  AfterViewInit,
  ViewChild,
  OnInit,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatDialog,
  MatSnackBar
} from "@angular/material";
import { Observable } from "rxjs/Observable";
import { FirestoreService } from "./../../../services/firestore.service";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "angularfire2/firestore";

import { Response } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/take";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/switchMap";

@Component({
  selector: 'app-list-insurance-type',
  templateUrl: './list-insurance-type.component.html',
  styleUrls: ['./list-insurance-type.component.css']
})
export class ListInsuranceTypeComponent implements AfterViewInit {

  itemToEdit: InsuranceType;
  ref: AngularFirestoreCollection<InsuranceType>;
  dbTable: Observable<InsuranceType[]>; //db

  displayedColumns = ["Name", "Edit", "Delete"];
  dataSource: MatTableDataSource<any>;

  @Output()
  insuranceTypeClick: EventEmitter<InsuranceType> = new EventEmitter<InsuranceType>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public deleteSnackBar: MatSnackBar,
    public db: FirestoreService
  ) {}

  ngAfterViewInit() {
    this.db
      .colWithIds$("insurance-types", ref => ref.orderBy("createdAt", "desc"))
      .subscribe(insuranceTypes => {
        this.dbTable = this.db.colWithIds$("insurance-types");
        this.dataSource = new MatTableDataSource(insuranceTypes);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  trackByUid(index, item) {
    return item.uid;
  }

  delete(event, ref: InsuranceType) {
    let snackBarRef = this.deleteSnackBar.open("Confirm Delete", "Ok", {
      duration: 5000
    });
    snackBarRef.onAction().subscribe(() => {
      this.db.delete("insurance-types/" + ref.id);
    });
  }

  edit(event, ref: InsuranceType) {
    this.itemToEdit = ref;
    //console.log(this.itemToEdit);
    this.insuranceTypeClick.emit(ref);
  }

  ngOnInit() {}
}
