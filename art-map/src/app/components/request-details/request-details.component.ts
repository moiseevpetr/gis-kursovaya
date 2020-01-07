import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { Request } from "../../models/request";
import { RequestService } from "../../services/request.service";
import { RequestStatus } from "../../models/request-status.enum";
import { ArtObjectType } from "../../models/art-object-type.enum";
import { AuthorizationService } from "../../services/authorization.service";

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.less']
})
export class RequestDetailsComponent implements OnInit {

  requestId: string;
  request: Request;

  constructor(
    private requestService: RequestService,
    private authorizationService: AuthorizationService,
    private dialogRef: MatDialogRef<RequestDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.requestId = data.requestId;
    this.loadRequest();
  }

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }

  loadRequest() {
    if(!this.requestId) {
      return;
    }

    this.requestService.getRequest(this.requestId)
      .subscribe(request =>
        this.request = request
      );
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

  getStrArtObjectType(type: ArtObjectType): string {
    switch (type) {
      case ArtObjectType.Graffiti:
        return 'Граффити';
      case ArtObjectType.Installation:
        return 'Инсталляция';
      case ArtObjectType.Monument:
        return 'Памятник';
      default:
        return 'Нет';
    }
  }

  acceptRequest() {
    this.requestService.acceptRequest(this.requestId)
      .subscribe(() =>
        this.dialogRef.close()
      );
  }

  rejectRequest() {
    this.requestService.rejectRequest(this.requestId)
      .subscribe(() =>
        this.dialogRef.close()
      );
  }
}
