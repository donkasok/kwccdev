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
import { Designation } from "./../../../models/designation";
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
  selector: "app-list-designation",
  templateUrl: "./list-designation.component.html",
  styleUrls: ["./list-designation.component.css"]
})
export class ListDesignationComponent implements AfterViewInit {
  itemToEdit: Designation;
  ref: AngularFirestoreCollection<Designation>;
  dbTable: Observable<Designation[]>; //db

  displayedColumns = ["Name", "Edit", "Delete"];
  dataSource: MatTableDataSource<any>;

  @Output()
  designationClick: EventEmitter<Designation> = new EventEmitter<Designation>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public deleteSnackBar: MatSnackBar,
    public db: FirestoreService
  ) {}

  ngAfterViewInit() {
    this.db
      .colWithIds$("designations", ref => ref.orderBy("createdAt", "desc"))
      .subscribe(designations => {
        this.dbTable = this.db.colWithIds$("designations");
        this.dataSource = new MatTableDataSource(designations);
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

  deleteDesignation(event, ref: Designation) {
    let snackBarRef = this.deleteSnackBar.open("Confirm Delete", "Ok", {
      duration: 5000
    });
    snackBarRef.onAction().subscribe(() => {
      this.db.delete("designations/" + ref.id);
    });
  }

  editDesignation(event, ref: Designation) {
    this.itemToEdit = ref;
    console.log(this.itemToEdit);
    this.designationClick.emit(ref);
  }

  ngOnInit() {}
}
