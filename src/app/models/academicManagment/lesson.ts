// lesson.ts
import { AttemptI } from "../academicActivities/attempt";
import { SubmissionI } from "../academicActivities/submission";
import { ModuleI } from "./module";

export interface LessonI {
  id?: number;
  title: string;
  content: string;
  status: "ACTIVE" | "INACTIVE";

  // Relations
  moduleId: number;
  module?: ModuleI;

  submissions?: SubmissionI[];
  attempts?: AttemptI[];
}
