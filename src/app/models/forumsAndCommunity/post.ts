export interface PostI {
  id?: number;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
  status: "ACTIVE" | "INACTIVE";
}
