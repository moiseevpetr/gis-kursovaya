import { PhotoRequestType } from "./photo-request-type.enum";

export interface PhotoRequest {
  id: string,
  requestId: string,
  photoPath: string,
  photoRequestType: PhotoRequestType,
  photoId: string
}
