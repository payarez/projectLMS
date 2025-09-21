// evaluation.ts
import { SubmissionI } from "./submission";

export interface AssessmentI {
  id?: number;
  grade: number;
  feedback?: string;
  date: Date;
  status: "ACTIVE" | "INACTIVE";

  // Relations
  submissionId: number;
  submission?: SubmissionI;
}
