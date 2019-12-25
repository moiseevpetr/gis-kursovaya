import {ArtObjectType} from "./art-object-type.enum";

export interface ArtObject {
  id: string;
  name: string;
  description: string;
  creationDate: Date;
  typeKey: ArtObjectType;
  longitude: number;
  latitude: number;
}
