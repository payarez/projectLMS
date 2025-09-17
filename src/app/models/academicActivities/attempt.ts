import { LessonI } from "../academicManagment/lesson";
import { StudentI } from "../usersAndEnrollment/student";

export interface AttemptI {
  id?: number;
  lessonId: number;
  studentId: number;
  attemptNumber: number;
  score?: number;
  attemptedAt: Date;
  status: "ACTIVE" | "INACTIVE";

  // relation (1:N from Lesson)
  lesson?: LessonI;
  student?: StudentI;
}
