// courseTag.ts
import { CourseI } from "../academicManagment/course";
import { TagI } from "./tag";

export interface CourseTagI {
  id?: number;
  status: "ACTIVE" | "INACTIVE";

  // Relations
  courseId: number;
  course?: CourseI;

  tagId: number;
  tag?: TagI;
}

export interface CourseTagResponseI {
  id?: number;
  courseId: number;
  tagId: number;
}
