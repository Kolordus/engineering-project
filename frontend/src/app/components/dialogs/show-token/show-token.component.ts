import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-show-token',
  templateUrl: './show-token.component.html',
  styleUrls: ['./show-token.component.css']
})
export class ShowTokenComponent   {

  token: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Interface
  ) {
    this.token = data.token;
  }
}

interface Interface {
  token: string;
}
