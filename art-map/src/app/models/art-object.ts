import {ArtObjectType} from "./art-object-type.enum";

export interface ArtObject {
  id: string;
  name: string;
  description: string;
  creationDate: Date;
  type: ArtObjectType;
  longitude: number;
  latitude: number;
}
