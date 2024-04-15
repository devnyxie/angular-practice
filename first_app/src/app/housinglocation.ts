export interface HousingLocation {
  id: number;
  name: string;
  city: string;
  state: string;
  photo: string;
  photos: string[];
  availableUnits: number;
  wifi: boolean;
  laundry: boolean;
}
