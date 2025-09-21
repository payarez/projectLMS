// module.ts
import { CourseI } from "./course";
import { LessonI } from "./lesson";

export interface ModuleI {
  id?: number;
  title: string;
  description: string;
  status: "ACTIVE" | "INACTIVE";

  // Relations
  courseId: number;
  course?: CourseI;

  lessons?: LessonI[];
}
