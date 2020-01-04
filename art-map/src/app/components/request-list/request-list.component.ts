import { Component, Input, OnInit } from '@angular/core';

import { Request } from "../../models/request";
import { RequestType } from "../../models/request-type.enum";
import { RequestStatus } from "../../models/request-status.enum";

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.less']
})
export class RequestListComponent implements OnInit {

  @Input() requests: Request[];

  displayedColumns: string[] = ['date', 'artObjectName', 'requestType', 'requestStatus', 'details'];

  constructor() {
  }

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
