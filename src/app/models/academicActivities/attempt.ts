// attempt.ts
import { LessonI } from "../academicManagment/lesson";

export interface AttemptI {
  id?: number;
  attemptNumber: number;
  date: Date;
  result?: string;
  status: "ACTIVE" | "INACTIVE";

  // Relations
  lessonId: number;
  lesson?: LessonI;
}

export interface AttemptResponseI {
  id?: number;
  attemptNumber: number;
  date: Date;
  result?: string;
  lessonId: number;
}
