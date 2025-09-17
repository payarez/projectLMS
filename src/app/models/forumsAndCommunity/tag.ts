export interface TagI {
  id?: number;
  name: string;
  status: "ACTIVE" | "INACTIVE";

  courseTagIds?: number[];
}
