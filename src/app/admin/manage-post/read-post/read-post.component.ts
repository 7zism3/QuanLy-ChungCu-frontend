import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "ngx-read-post",
  templateUrl: "./read-post.component.html",
  styleUrls: ["./read-post.component.scss"],
})
export class ReadPostComponent implements OnInit {
  postEditForm: FormGroup;
  postEditRequest: any;
  constructor(@Inject(MAT_DIALOG_DATA) private data) {}

  ngOnInit(): void {
    this.postEditRequest = {
      id: undefined,
      ngayTao: null,
      noiDung: null,
      tieuDe: null,
      trangThai: null,
      canHo: null,
      cuDanGui: null,
    };
    this.postEditForm = new FormGroup({
      id: new FormControl(null),
      tieuDe: new FormControl(null, Validators.required),
      noiDung: new FormControl(null, Validators.required),
    });
    this.postEditForm.patchValue(this.data.idPost);
  }
  submitAction() {}
}
