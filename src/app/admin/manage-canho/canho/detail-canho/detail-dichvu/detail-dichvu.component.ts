import {
  Component,
  Inject,
  OnInit,
  QueryList,
  ViewChildren,
} from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { throwError } from "rxjs";
import { DialogDeleteSubmitComponent } from "../../../../../shared/component/dialog-submit-delete/dialog-submit-delete.component";
import { CanHo } from "../../../../../shared/model/canHo/canho";
import { DichVuChiTiet } from "../../../../../shared/model/dichVu/dichvu";
import { CanhoService } from "../../../../../shared/service/canHo/canho.service";
import { DichvuService } from "../../../../../shared/service/dichVu/dichvu.service";
import { ToastService } from "../../../../../shared/service/toast.service";
import { AddEditTypeUtilityComponent } from "../../../../manage-hoadon/type-utility/add-edit-type-utility/add-edit-type-utility.component";
import { AddEditUtilityComponent } from "../../../../manage-hoadon/type-utility/add-edit-utility/add-edit-utility.component";
import { PrintHoadonComponent } from "../print-hoadon/print-hoadon.component";

@Component({
  selector: "ngx-detail-dichvu",
  templateUrl: "./detail-dichvu.component.html",
  styleUrls: ["./detail-dichvu.component.scss"],
})
export class DetailDichvuComponent implements OnInit {
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();
  columnsToDisplay = ["stt", "ten", "donGia", "soLuong", "moTa", "id"];
  expandedElement: DichVuChiTiet | null;
  chiTietDichVu = new MatTableDataSource();
  canHo: CanHo = new CanHo();
  type: string;
  constructor(
    private dialog: MatDialog,
    private dichVuService: DichvuService,
    private canHoService: CanhoService,
    private toastrService: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.type = this.data.type;
    if (this.type == "HDDV") {
      this.getChiTietHoaDonDichVu();
    } else if (this.type == "HDSC") {
      this.getChiTietHoaDonSuaChua();
    }

    this.getCanHoById();
  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator.toArray()[0];
    // this.dataSource.sort = this.sort.toArray()[0];
    this.chiTietDichVu.paginator = this.paginator.toArray()[0];
    this.chiTietDichVu.sort = this.sort.toArray()[0];
  }
  openAddHoaDonSuaChuaChiTiet() {
    const type = "HDSCCT";
    const hoaDon = this.data.hoaDon;
    const dialogRef = this.dialog.open(AddEditTypeUtilityComponent, {
      data: { type, hoaDon },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getChiTietHoaDonSuaChua();
      }
    });
  }
  openPrintHoaDonDichVu() {
    const dataDichVu = this.chiTietDichVu.data;
    const dataCanHo = this.canHo;
    const month = this.data.month;
    const type = this.type;
    const dialogRef = this.dialog.open(PrintHoadonComponent, {
      data: { dataDichVu, dataCanHo, month, type },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
      }
    });
  }
  getChiTietHoaDonDichVu() {
    this.dichVuService.getChiTietHoaDonDichVu(this.data.idHoaDon).subscribe(
      (data) => {
        this.chiTietDichVu.data = data;
        console.log(this.chiTietDichVu.data);
      },
      (error) => {
        throwError(error);
      }
    );
  }
  getChiTietHoaDonSuaChua() {
    this.dichVuService.getChiTietHoaDonSuaChua(this.data.idHoaDon).subscribe(
      (data) => {
        this.chiTietDichVu.data = data;
        console.log(this.chiTietDichVu.data);
      },
      (error) => {
        throwError(error);
      }
    );
  }
  getCanHoById() {
    this.canHoService.getCanHoById(this.data.idCanHo).subscribe(
      (data) => {
        this.canHo = data;
      },
      (error) => {
        throwError(error);
      }
    );
  }
  applyFilterDichVu(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.chiTietDichVu.filter = filterValue.trim().toLowerCase();
    if (this.chiTietDichVu.paginator) {
      this.chiTietDichVu.paginator.firstPage();
    }
  }
  onDeleteCCHDSC(id): void {
    const dialogRef = this.dialog.open(DialogDeleteSubmitComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.dichVuService.deleteHDSCCT(id).subscribe(
          (data) => {
            this.chiTietDichVu.data = [];
            this.getChiTietHoaDonSuaChua();
            this.toastrService.showToast(
              "success",
              "Thành công",
              "Xóa thành công"
            );
          },
          (error) => {
            this.toastrService.showToast("danger", "Thất bại", "Xóa thất bại");
            throwError(error);
          }
        );
      }
    });
  }
  editAddHoaDonSuaChuaChiTiet(data: any) {
    const dialogRef = this.dialog.open(AddEditUtilityComponent, {
      data: { data },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getChiTietHoaDonSuaChua();
      }
    });
  }
}
