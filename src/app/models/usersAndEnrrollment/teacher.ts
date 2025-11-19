export interface TeacherI {
  id?: number;
  name: string;
  subject: string;
  email: string;
  phone: string;
  registration_date: Date;
  status: "ACTIVE" | "INACTIVE";
}

export interface TeacherResponseI {
  id?: number;
  name: string;
  subject: string;
  email: string;
  phone: string;
  registration_date: Date;
}

