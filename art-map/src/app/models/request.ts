import { ArtObjectType } from "./art-object-type.enum";
import { RequestType } from "./request-type.enum";
import { RequestStatus } from "./request-status.enum";
import { User } from "./user";
import { PhotoRequest } from "./photo-request";

export interface Request {
  id: string;
  reason: string;
  artObjectId: string;
  userId: string;
  user: User;
  date: Date;
  requestType: RequestType;
  requestStatus: RequestStatus;
  artObjectName: string;
  artObjectDescription: string;
  artObjectCreationDate: Date;
  artObjectType: ArtObjectType;
  artObjectLongitude: number;
  artObjectLatitude: number;
  photoRequests: PhotoRequest[];
}
