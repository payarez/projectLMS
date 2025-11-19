// post.ts
import { ForumI } from "./forum";
import { StudentI } from "../usersAndEnrrollment/student";

export interface PostI {
  id?: number;
  content: string;
  date: Date;
  status: "ACTIVE" | "INACTIVE";

  // Relations
  forumId: number;
  forum?: ForumI;

  studentId: number;
  student?: StudentI;
}

export interface PostResponseI {
  id?: number;
  content: string;
  date: Date;
  forumId: number;
  studentId: number;
}
