import { Address } from './../../../models/address';
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
  selector: 'app-list-address',
  templateUrl: './list-address.component.html',
  styleUrls: ['./list-address.component.css']
})
export class ListAddressComponent implements AfterViewInit {

  itemToEdit: Address;
  ref: AngularFirestoreCollection<Address>;
  dbTable: Observable<Address[]>; //db

  displayedColumns = ["lineOne", "Edit", "Delete"];
  dataSource: MatTableDataSource<any>;

  @Output()
  addressClick: EventEmitter<Address> = new EventEmitter<Address>();
  @Input() customerId: string = "";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public deleteSnackBar: MatSnackBar,
    public db: FirestoreService
  ) {}

  checkUserID() {
    console.log("Customer ID on List" + this.customerId);
  }

  ngAfterViewInit() {
    let q = this.customerId;
    this.db
      .colWithIds$("addresses", ref => ref.where("userId", "==", q).orderBy("createdAt", "desc"))
      .subscribe(addresses => {
        this.dbTable = this.db.colWithIds$("addresses");
        this.dataSource = new MatTableDataSource(addresses);
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

  delete(event, ref: Address) {
    let snackBarRef = this.deleteSnackBar.open("Confirm Delete", "Ok", {
      duration: 5000
    });
    snackBarRef.onAction().subscribe(() => {
      this.db.delete("addresses/" + ref.id);
    });
  }

  edit(event, ref: Address) {
    this.itemToEdit = ref;
    console.log(this.itemToEdit);
    this.addressClick.emit(ref);
  }

  ngOnInit() {}
}
