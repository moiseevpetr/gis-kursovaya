import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";

import { Request } from "../../models/request";
import { RequestType } from "../../models/request-type.enum";
import { RequestStatus } from "../../models/request-status.enum";
import { RequestDetailsComponent } from "../request-details/request-details.component";

@Component({
  selector: 'app-request-list',
  templateUrl: './user-request-list.component.html',
  styleUrls: ['./user-request-list.component.less']
})
export class UserRequestListComponent implements OnInit {

  @Input() requests: Request[];

  requestDialogRef: MatDialogRef<RequestDetailsComponent>;

  displayedColumns: string[] = ['date', 'artObjectName', 'requestType', 'requestStatus', 'details'];

  constructor(
    private dialogRef: MatDialogRef<UserRequestListComponent>,
    private dialogModel: MatDialog
  ) { }

  ngOnInit() {
  }

  getStrRequestType(requestType: RequestType): string {
    switch (requestType) {
      case RequestType.AddObject:
        return 'Добавление';
      case RequestType.EditObject:
        return 'Редактирование';
      case RequestType.DeleteObject:
        return 'Удаление';
      default:
        return 'Тип не определён';
    }
  }

  getStrRequestStatus(requestStatus: RequestStatus) {
    switch (requestStatus) {
      case RequestStatus.Active:
        return 'Рассматривается';
      case RequestStatus.Accepted:
        return 'Принято';
      case RequestStatus.Rejected:
        return 'Отклонено';
      default:
        return 'Статус не определён';
    }
  }

  openRequestDetails(requestId: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {requestId: requestId};

    this.requestDialogRef = this.dialogModel.open(RequestDetailsComponent, dialogConfig);
  }
}
