import { Gender } from './../../../models/gender';
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
  selector: 'app-list-gender',
  templateUrl: './list-gender.component.html',
  styleUrls: ['./list-gender.component.css']
})
export class ListGenderComponent implements AfterViewInit {

  itemToEdit: Gender;
  ref: AngularFirestoreCollection<Gender>;
  dbTable: Observable<Gender[]>; //db

  displayedColumns = ["Name", "Edit", "Delete"];
  dataSource: MatTableDataSource<any>;

  @Output()
  genderClick: EventEmitter<Gender> = new EventEmitter<Gender>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public deleteSnackBar: MatSnackBar,
    public db: FirestoreService
  ) {}

  ngAfterViewInit() {
    this.db
      .colWithIds$("genders", ref => ref.orderBy("createdAt", "desc"))
      .subscribe(genders => {
        this.dbTable = this.db.colWithIds$("genders");
        this.dataSource = new MatTableDataSource(genders);
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

  delete(event, ref: Gender) {
    let snackBarRef = this.deleteSnackBar.open("Confirm Delete", "Ok", {
      duration: 5000
    });
    snackBarRef.onAction().subscribe(() => {
      this.db.delete("genders/" + ref.id);
    });
  }

  edit(event, ref: Gender) {
    this.itemToEdit = ref;
    //console.log(this.itemToEdit);
    this.genderClick.emit(ref);
  }

  ngOnInit() {}
}