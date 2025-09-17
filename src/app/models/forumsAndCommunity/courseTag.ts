// course-tag.model.ts
export interface CourseTagI {
  id?: number;
  courseId: number;
  tagId: number;
  status: "ACTIVE" | "INACTIVE";
}
