import { FollowUpType } from "./../../../models/follow-up-type";
import { ToDo } from "./../../../models/to-do";
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
import { Subscription } from 'rxjs/Subscription';
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
  selector: "app-list-to-do",
  templateUrl: "./list-to-do.component.html",
  styleUrls: ["./list-to-do.component.css"]
})
export class ListToDoComponent implements AfterViewInit {
  itemToEdit: ToDo;
  //selectedIndex : number = 0;
  //addState = true;

  @Output() toDoClick: EventEmitter<ToDo> = new EventEmitter<ToDo>();

  @Input() customerId: string = "";

  ref: AngularFirestoreCollection<ToDo>;
  dbTable: Observable<ToDo[]>; //db
  followUpTypeRef: AngularFirestoreCollection<FollowUpType>;

  //color = 'accent';
  checked = false;
  disabled = false;
  today = new Date();

  //followUpref: AngularFirestoreCollection<FollowUpType>;
  //followupNames$:FollowUpType;
  //followupNames;
  followUpType: FollowUpType = {
    name: ""
  };

  followtype$;

  displayedColumns = ["Status", "Name", "Date", "Alert", "Edit", "Delete"];
  dataSource: MatTableDataSource<any>;

  constructor(
    public deleteSnackBar: MatSnackBar,
    public updateSnackBar: MatSnackBar,
    public db: FirestoreService
  ) {}
  checkUserID() {
    console.log("Customer ID on List" + this.customerId);
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  //.colWithIds$("to-dos", ref => ref.where("userId", "==", q))  .colWithIds$("to-dos", ref => ref.orderBy("date", "asc"))
  ngAfterViewInit() {
    let q = this.customerId;
    //console.log('Customer ID on List' + q);
    this.db
      .colWithIds$("to-dos", ref =>
        ref.where("userId", "==", q).orderBy("date", "asc")
      )
      .subscribe(task => {
        this.dbTable = this.db.colWithIds$("to-dos");
        this.dataSource = new MatTableDataSource(task);
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

  ngOnInit() {}

  delete(event, ref: ToDo) {
    let snackBarRef = this.deleteSnackBar.open("Confirm Delete", "Ok", {
      duration: 5000
    });
    snackBarRef.onAction().subscribe(() => {
      this.db.delete("to-dos/" + ref.id);
    });
  }

  updateStatus(event, ref: ToDo) {
    let data = {
      status: !ref.status
    };
    this.db.update("to-dos/" + ref.id, data);
  }

  // To get a doc type from db 
  // getDisplayValue (q) {
  //   let j = this.db.doc$("follow-up-types/" + q).subscribe(followup => {
  //     this.followUpType = followup;
  //     return(this.followUpType.name);
  //   })
  // };

    
 

  // In Template
  

  // In Component 
  //getDisplayValue (q) {
  //return this.db.doc$("follow-up-types/" + q).valueChanges(); 
  //let v = this.db.doc$("follow-up-types/" + q).valueChanges()
  // let followtype = this.db.doc$('follow-up-types/'+q);
  // let followtype$ = followtype.valueChanges(); 
  // currently returns Observable<{}[]> 

  // this.followtype$ = this.db.doc$('follow-up-types/'+q);
  //   var items = this.followtype$.valueChanges()
  //     .map(items => {
  //       //console.log(items);
  //       return items;
  //     })
   // this.items = items;



  //};

  // getDisplayValue (re) {
  //   //console.log(re);
  //   //let j = this.db.doc$("follow-up-types/" + re);
  //   return this.db.doc$("follow-up-types/" + re);
  //   //return(j.valueChanges());
  //   //console.log(j);
  // }
 

  // getDisplayValue (q) {
  //   //let s:any = this.db.doc$("follow-up-types/" + q) .valueChange()
  //   //let qs = 'follow-up-types/'+q;
  //   //this.followUpTypeRef: AngularFireList = this.db.doc('qs');
  //   //this.db.doc(this.followUpTypeRef)
  //   //this.followUpTypeRef.valueChanges()
  //   //let j =  this.db.doc("follow-up-types/" + q).valueChanges();
  //   //console.log(j);
  //   //return (j);
  // };
 


  edit(event, ref: ToDo) {
    this.itemToEdit = ref;
    this.toDoClick.emit(ref);
  }
}
