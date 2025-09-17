// lesson.model.ts
export interface LessonI {
  id?: number;
  moduleId: number;
  title: string;
  content?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  status: "ACTIVE" | "INACTIVE";

  submissionIds?: number[];
  attemptIds?: number[];
}
