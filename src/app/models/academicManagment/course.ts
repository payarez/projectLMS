// course.ts
import { ModuleI } from "./module";
import { EnrollmentI } from "../usersAndEnrrollment/enrollment";
import { TeacherI } from "../usersAndEnrrollment/teacher";
import { CourseTagI } from "../forumsAndCommunity/courseTag";

export interface CourseI {
  id?: number;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: "ACTIVE" | "INACTIVE";

  // Relations
  teacherId: number;
  teacher?: TeacherI;

  modules?: ModuleI[];
  enrollments?: EnrollmentI[];
  courseTags?: CourseTagI[];
}

export interface CourseResponseI {
  id?: number;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  teacherId: number;
}
