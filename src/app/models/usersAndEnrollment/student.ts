export interface StudentI {
  id?: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  status: "ACTIVE" | "INACTIVE";

  // relation -> solo guardamos los IDs de enrollments
  enrollmentIds?: number[];
}
