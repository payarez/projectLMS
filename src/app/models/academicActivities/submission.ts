// submission.model.ts
export interface SubmissionI {
  id?: number;
  lessonId: number;
  studentId: number;
  fileUrl?: string;
  submittedAt: Date;
  grade?: number;
  status: "ACTIVE" | "INACTIVE";
}
