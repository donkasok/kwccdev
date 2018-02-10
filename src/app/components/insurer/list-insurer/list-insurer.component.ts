import { Insurer } from './../../../models/insurer';
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
  selector: 'app-list-insurer',
  templateUrl: './list-insurer.component.html',
  styleUrls: ['./list-insurer.component.css']
})
export class ListInsurerComponent implements AfterViewInit {

  itemToEdit: Insurer;
  ref: AngularFirestoreCollection<Insurer>;
  dbTable: Observable<Insurer[]>; //db

  displayedColumns = ["Name", "Edit", "Delete"];
  dataSource: MatTableDataSource<any>;

  @Output()
  insurerClick: EventEmitter<Insurer> = new EventEmitter<Insurer>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public deleteSnackBar: MatSnackBar,
    public db: FirestoreService
  ) {}

  ngAfterViewInit() {
    this.db
      .colWithIds$("insurers", ref => ref.orderBy("createdAt", "desc"))
      .subscribe(insurers => {
        this.dbTable = this.db.colWithIds$("insurers");
        this.dataSource = new MatTableDataSource(insurers);
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

  delete(event, ref: Insurer) {
    let snackBarRef = this.deleteSnackBar.open("Confirm Delete", "Ok", {
      duration: 5000
    });
    snackBarRef.onAction().subscribe(() => {
      this.db.delete("insurers/" + ref.id);
    });
  }

  edit(event, ref: Insurer) {
    this.itemToEdit = ref;
    //console.log(this.itemToEdit);
    this.insurerClick.emit(ref);
  }

  ngOnInit() {}
}
