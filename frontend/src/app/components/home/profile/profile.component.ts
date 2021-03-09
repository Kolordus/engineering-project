import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FileUploadService} from "../../../services/file-upload.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;files  = [];
  fileName:string;


  constructor(private uploadFileService: FileUploadService) { }

  ngOnInit() {
  }

  sendPicture() {
    const fileUpload = this.fileUpload.nativeElement;fileUpload.onchange = () => {
      this.uploadFile(fileUpload.files[0]);
      window.location.reload();
    };

    fileUpload.click();

  }

  uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    file.inProgress = true;

    this.uploadFileService.uploadFile(formData).subscribe(
      rsp => {
        console.log(rsp.type)

      },
      _ => {
        // console.log(error)
      });

  }



}
