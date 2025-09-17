// course.model.ts
export interface CourseI {
  id?: number;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  status: "ACTIVE" | "INACTIVE";

  
  moduleIds?: number[];
  enrollmentIds?: number[];
  courseTagIds?: number[];
}
