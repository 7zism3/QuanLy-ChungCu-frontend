import { Component, Inject, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { throwError } from "rxjs";
import { TypeUtilityResponse } from "../../../../shared/model/type-utility/type-utility-response";
import { UtilityRequest } from "../../../../shared/model/utility/utility-request";
import { TypeUtilityService } from "../../../../shared/service/type-utility.service";
import { UtilityService } from "../../../../shared/service/utility.service";
import { ToastService } from "../../../../shared/service/toast.service";
import { DichvuService } from "../../../../shared/service/dichVu/dichvu.service";

@Component({
  selector: "ngx-add-edit-utility",
  templateUrl: "./add-edit-utility.component.html",
  styleUrls: ["./add-edit-utility.component.scss"],
})
export class AddEditUtilityComponent implements OnInit {
  hdscctForm: FormGroup;
  hdssctRequest: any;

  constructor(
    private dialogRef: MatDialogRef<AddEditUtilityComponent>,
    private toastrService: ToastService,
    private dichvuService: DichvuService,
    @Inject(MAT_DIALOG_DATA) private data
  ) {}

  ngOnInit(): void {
    this.hdssctRequest = {
      id: undefined,
      loaiSuaChua: null,
      donGia: null,
      soLuong: null,
      moTa: null,
      hoaDonSuaChua: null,
    };
    this.hdscctForm = new FormGroup({
      ten: new FormControl(null),
      donGia: new FormControl(null),
      soLuong: new FormControl(null),
      moTa: new FormControl(null),
    });
    if (this.data.data) {
      console.log(this.data.data);
      this.hdscctForm.patchValue(this.data.data);
      this.hdscctForm.get("ten").setValue(this.data.data.loaiSuaChua.ten);
    }
  }
  submitAction() {
    this.hdssctRequest.id = this.data.data.id;
    this.hdssctRequest.loaiSuaChua = this.data.data.loaiSuaChua;
    this.hdssctRequest.donGia = this.hdscctForm.get("donGia").value;
    this.hdssctRequest.soLuong = this.hdscctForm.get("soLuong").value;
    this.hdssctRequest.moTa = this.hdscctForm.get("moTa").value;
    this.hdssctRequest.hoaDonSuaChua = this.data.data.hoaDonSuaChua;

    this.dichvuService.updateCCHDSC(this.hdssctRequest).subscribe(
      (data) => {
        this.dialogRef.close(true);
        this.toastrService.showToast("success", "Thành công", "Sửa thành công");
      },
      (error) => {
        throwError(error);
        this.toastrService.showToast("danger", "Thất bại", "Sửa thất bại");
      }
    );
  }
  // submitAction({ name }) {
  //   name;
  // }

  // submitAction({name: "thuy", id: 2});
}
