import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-cutomer',
  templateUrl: './view-cutomer.component.html',
  styleUrls: ['./view-cutomer.component.css']
})
export class ViewCutomerComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  customerId="";

  ngOnInit() {
    this.route.params.subscribe(params => {
      //console.log(params) //log the entire params object
      //console.log(params['id']) //log the value of id
      this.customerId = params['id'];
    });
  }

}
