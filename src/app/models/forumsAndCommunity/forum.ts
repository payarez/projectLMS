// forum.ts
import { PostI } from "./post";
import { CourseI } from "../academicManagment/course";

export interface ForumI {
  id?: number;
  title: string;
  description: string;
  status: "ACTIVE" | "INACTIVE";

  // Relations
  courseId: number;
  course?: CourseI;

  posts?: PostI[];
}
