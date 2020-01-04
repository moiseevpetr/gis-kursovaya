import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

import { RequestService } from "../../services/request.service";
import { Request } from "../../models/request";
import {RequestType} from "../../models/request-type.enum";
import {RequestStatus} from "../../models/request-status.enum";

@Component({
  selector: 'app-admin-requests',
  templateUrl: './admin-requests.component.html',
  styleUrls: ['./admin-requests.component.less']
})
export class AdminRequestsComponent implements OnInit {

  requests: Request[];

  displayedColumns: string[] = ['date', 'user', 'artObjectName', 'requestType', 'requestStatus', 'details'];

  constructor(
    private requestService: RequestService,
    private dialogRef: MatDialogRef<AdminRequestsComponent>
  ) { }

  ngOnInit(): void {
    this.loadConsiderateRequests();
  }

  close(): void {
    this.dialogRef.close();
  }

  loadConsiderateRequests(): void {
    this.requestService.getConsiderateRequests()
      .subscribe(requests =>
          this.requests = requests
      );
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
      case RequestStatus.Consideration:
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

  }
}
