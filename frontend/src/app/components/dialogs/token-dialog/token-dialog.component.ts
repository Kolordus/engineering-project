import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-token-dialog',
  templateUrl: './token-dialog.component.html',
  styleUrls: ['./token-dialog.component.css']
})
export class TokenDialogComponent {

  message: string;

  constructor(
  @Inject(MAT_DIALOG_DATA) public data: Interface
) {
  if (data.message === true) {
    this.message = 'Podany token figuruje w bazie';
  } else {
    this.message = 'Token nie pasuje!';
  }
}
}
interface Interface {
  message: boolean;
}
