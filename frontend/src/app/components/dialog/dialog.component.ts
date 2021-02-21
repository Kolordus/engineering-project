import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  rates = ['1', '2', '3', '4', '5'];

  constructor() { }

  ngOnInit() {
  }



}
