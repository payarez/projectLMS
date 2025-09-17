export interface EnrollmentI {
  id?: number;
  studentId: number;   // FK -> Student
  courseId: number;    // FK -> Course
  enrolledAt: Date;
  state: "active" | "completed" | "dropped";
  status: "ACTIVE" | "INACTIVE";
}
