import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { throwError } from "rxjs";
import { TypePostResponse } from "../../../shared/model/type-post/type-post-response";
import { ToastService } from "../../../shared/service/toast.service";
import { PostService } from "../../../shared/service/post.service";
import { TypePostService } from "../../../shared/service/type-post.service";
import { ThongBaoService } from "../../../shared/service/thongBao/thong-bao.service";
import { CanhoService } from "../../../shared/service/canHo/canho.service";

@Component({
  selector: "ngx-add-edit-thong-bao-rieng",
  templateUrl: "./add-edit-thong-bao-rieng.component.html",
  styleUrls: ["./add-edit-thong-bao-rieng.component.scss"],
})
export class AddEditThongBaoRiengComponent implements OnInit {
  postForm: FormGroup;
  postRequest: any;
  postEditForm: FormGroup;
  postEditRequest: any;
  idPost: number;
  typePosts: TypePostResponse[];
  type: string;
  canHo: any;
  constructor(
    private toastrService: ToastService,
    private dialogRef: MatDialogRef<AddEditThongBaoRiengComponent>,
    private postService: PostService,
    private typePostService: TypePostService,
    @Inject(MAT_DIALOG_DATA) private data,
    private thongBaoService: ThongBaoService,
    private canHoService: CanhoService
  ) {}

  ngOnInit(): void {
    this.getCanHoById();
    this.type = this.data.type;
    this.postRequest = {
      noiDung: null,
      tieuDe: null,
      canHo: null,
      trangThai: null,
      cuDanGui: null,
    };
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
    this.postForm = new FormGroup({
      id: new FormControl(null),
      tieuDe: new FormControl(null, Validators.required),
      noiDung: new FormControl(null, Validators.required),
    });
    if (this.type == "Edit") {
      this.postEditForm.patchValue(this.data.idPost);
    }
  }
  private getCanHoById() {
    this.canHoService.getCanHoById(this.data.idCanHo).subscribe(
      (data) => {
        this.canHo = data;
      },
      (error) => {
        throwError(error);
      }
    );
  }
  submitAction() {
    if (this.type == "Add") {
      this.createPost();
    } else {
      this.updatePost();
    }
  }

  createPost() {
    this.postRequest.canHo = this.canHo;
    this.postRequest.tieuDe = this.postForm.get("tieuDe").value;
    this.postRequest.noiDung = this.postForm.get("noiDung").value;
    this.postRequest.cuDanGui = true;
    this.postRequest.trangThai = false;
    console.log(this.postRequest);
    this.thongBaoService.createThongBaoRieng(this.postRequest).subscribe(
      (data) => {
        this.dialogRef.close(true);
        this.toastrService.showToast(
          "success",
          "Thành công",
          "Thêm thành công"
        );
      },
      (error) => {
        throwError(error);
        this.toastrService.showToast("danger", "Thất bại", "Thêm thất bại");
      }
    );
  }

  updatePost() {
    this.postEditRequest.id = this.data.idPost.id;
    this.postEditRequest.noiDung = this.postEditForm.get("noiDung").value;
    this.postEditRequest.tieuDe = this.postEditForm.get("tieuDe").value;
    this.postEditRequest.ngayTao = this.data.idPost.ngayTao;
    this.postEditRequest.trangThai = false;
    this.postEditRequest.canHo = this.canHo;
    this.postEditRequest.cuDanGui = true;
    console.log(this.postEditRequest);
    this.thongBaoService.updateThongBaoRieng(this.postEditRequest).subscribe(
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
}
