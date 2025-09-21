// student.ts
import { PostI } from "../forumsAndCommunity/post";
import { EnrollmentI } from "./enrollment";

export interface StudentI {
  id?: number;
  name: string;
  email: string;
  status: "ACTIVE" | "INACTIVE";

  // Relations
  enrollments?: EnrollmentI[];
  posts?: PostI[];
}
