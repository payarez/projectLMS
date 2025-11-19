// enrollment.ts
import { StudentI } from "./student";
import { CourseI } from "../academicManagment/course";

export interface EnrollmentI {
  id?: number;
  date: Date;
  status: "ACTIVE" | "INACTIVE";

  // Relations
  studentId: number;
  student?: StudentI;

  courseId: number;
  course?: CourseI;
}

export interface EnrollmentResponseI {
  id?: number;
  date: Date;
  studentId: number;
  courseId: number;
  
}
