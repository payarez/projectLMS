export interface ForumI {
  id?: number;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt?: Date;
  status: "ACTIVE" | "INACTIVE";
}
