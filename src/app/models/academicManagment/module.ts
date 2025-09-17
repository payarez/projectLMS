// module.model.ts
export interface ModuleI {
  id?: number;
  courseId: number;
  title: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  status: "ACTIVE" | "INACTIVE";

  lessonIds?: number[];
}
