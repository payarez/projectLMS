// tag.ts
import { CourseTagI } from "./courseTag";

export interface TagI {
  id?: number;
  name: string;
  status: "ACTIVE" | "INACTIVE";

  // Relations
  courseTags?: CourseTagI[];
}
