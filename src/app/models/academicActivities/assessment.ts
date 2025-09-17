
export interface AssessmentI {
  id?: number;
  score: number;
  feedback?: string;
  evaluatedAt: Date;
  status: "ACTIVE" | "INACTIVE";
}
