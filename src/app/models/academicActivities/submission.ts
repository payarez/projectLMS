import { LessonI } from "../academicManagment/lesson";
import { StudentI } from "../usersAndEnrrollment/student";

export interface SubmissionI {
  id: number;
  content: string;
  submittedAt: Date;
  status: "ACTIVE" | "INACTIVE";

  // Relations
  studentId: number;
  student?: StudentI;

  lessonId: number;
  lesson?: LessonI;
}
