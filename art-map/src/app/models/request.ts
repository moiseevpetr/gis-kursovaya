import { ArtObjectType } from "./art-object-type.enum";
import { RequestType } from "./request-type.enum";
import { RequestStatus } from "./request-status.enum";

export interface Request {
  id: string;
  reason: string;
  artObjectId: string;
  userId: string;
  date: Date;
  requestType: RequestType;
  requestStatus: RequestStatus;
  artObjectName: string;
  artObjectDescription: string;
  artObjectCreationDate: Date;
  artObjectType: ArtObjectType;
  artObjectLongitude: number;
  artObjectLatitude: number;
}
