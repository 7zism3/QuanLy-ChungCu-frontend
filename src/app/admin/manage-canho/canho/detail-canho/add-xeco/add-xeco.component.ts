import { Component, Inject, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { throwError } from "rxjs";
import { E } from "@angular/cdk/keycodes";
import { type } from "os";
import { ToastService } from "../../../../../shared/service/toast.service";
import { CanhoService } from "../../../../../shared/service/canHo/canho.service";
import { CanHo } from "../../../../../shared/model/canHo/canho";
import { XeCo } from "../../../../../shared/model/xeCo/xeco";
import { CuDan } from "../../../../../shared/model/cuDan/cudan";
import { ActivatedRoute } from "@angular/router";
import { CudanService } from "../../../../../shared/service/cuDan/cudan.service";
import { TheCuDan } from "../../../../../shared/model/theCuDan/theCuDan";
import { ThecudanService } from "../../../../../shared/service/theCuDan/thecudan.service";
import { XecoService } from "../../../../../shared/service/xeCo/xeco.service";

@Component({
  selector: "ngx-add-xeco",
  templateUrl: "./add-xeco.component.html",
  styleUrls: ["./add-xeco.component.scss"],
})
export class AddXecoComponent implements OnInit {
  xeCo: any;
  xeCoForm: FormGroup;
  canHo: CanHo = new CanHo();
  canHoForm: FormGroup;
  canHoEditForm: FormGroup;
  typeAction: string;
  cuDanList: CuDan[] = [];
  theCuDanList: TheCuDan[] = [];
  dataCanHo: any;
  constructor(
    private toastrService: ToastService,
    private dialogRef: MatDialogRef<AddXecoComponent>,
    private canHoService: CanhoService,
    private activateRoute: ActivatedRoute,
    private cuDanService: CudanService,
    private theCuDanService: ThecudanService,
    private xeCoService: XecoService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    // this.getAllHomeStay();
    this.getAllCuDanByCanHo();
    this.getAllTheCuDanChuaSuDungByCanHo();
    this.typeAction = this.data.type;
    this.xeCo = {
      id: undefined,
      loaiXe: null,
      tenXe: null,
      bienKiemSoat: undefined,
      canHo: null,
      theCuDan: null,
    };
    this.xeCoForm = new FormGroup({
      loaiXe: new FormControl(null, Validators.required),
      tenXe: new FormControl(null, Validators.required),
      bienKiemSoat: new FormControl(null, Validators.required),
      theCuDan: new FormControl(null, Validators.required),
    });

    if (this.data.id) {
      this.canHoService.getCanHoById(this.data.id).subscribe(
        (data) => {
          this.dataCanHo = data;
        },
        (error) => {
          throwError(error);
        }
      );
    }
  }
  getAllCuDanByCanHo() {
    this.cuDanService.getAllCuDanCanHo(this.data.id).subscribe(
      (data) => {
        this.cuDanList = data;
      },
      (error) => {
        throwError(error);
      }
    );
  }
  getAllTheCuDanChuaSuDungByCanHo() {
    this.theCuDanService
      .getAllTheCuDanByCanHoChuaKichHoat(this.data.id)
      .subscribe(
        (data) => {
          this.theCuDanList = data;
        },
        (error) => {
          throwError(error);
        }
      );
  }
  createPhuongTien() {
    this.xeCo.loaiXe = this.xeCoForm.get("loaiXe").value;
    this.xeCo.tenXe = this.xeCoForm.get("tenXe").value;
    this.xeCo.bienKiemSoat = this.xeCoForm.get("bienKiemSoat").value;
    // this.xeCo.cuDan = this.xeCoForm.get("cuDan").value;
    this.xeCo.canHo = this.dataCanHo;
    this.xeCo.theCuDan = this.xeCoForm.get("theCuDan").value;
    this.xeCoService.createPhuongTien(this.xeCo).subscribe(
      (data) => {
        this.dialogRef.close(true);
        this.toastrService.showToast(
          "success",
          "Th??nh c??ng",
          "Th??m th??nh c??ng"
        );
      },
      (error) => {
        throwError(error);
        this.toastrService.showToast("danger", "Th???t b???i", "Th??m th???t b???i");
      }
    );
  }
}
