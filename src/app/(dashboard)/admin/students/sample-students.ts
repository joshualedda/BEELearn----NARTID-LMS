export type StudentStatus = "Active" | "Pending" | "Inactive";

export interface SampleStudent {
  id: string;
  name: string;
  email: string;
  joined: string;
  status: StudentStatus;
}

export const sampleStudents: readonly SampleStudent[] = [
  { id: "sample-1", name: "Ariana Reyes", email: "ariana.reyes@example.com", joined: "Sep 12, 2026", status: "Active" },
  { id: "sample-2", name: "Marco Santos", email: "marco.santos@example.com", joined: "Sep 9, 2026", status: "Active" },
  { id: "sample-3", name: "Lea Ramos", email: "lea.ramos@example.com", joined: "Sep 2, 2026", status: "Pending" },
  { id: "sample-4", name: "Noel Garcia", email: "noel.garcia@example.com", joined: "Aug 25, 2026", status: "Active" },
  { id: "sample-5", name: "Camille Cruz", email: "camille.cruz@example.com", joined: "Aug 18, 2026", status: "Inactive" },
  { id: "sample-6", name: "Paolo Mendoza", email: "paolo.mendoza@example.com", joined: "Aug 11, 2026", status: "Active" },
  { id: "sample-7", name: "Mira Bautista", email: "mira.bautista@example.com", joined: "Aug 4, 2026", status: "Pending" },
  { id: "sample-8", name: "Luis Navarro", email: "luis.navarro@example.com", joined: "Jul 28, 2026", status: "Inactive" },
];

export const studentStatusOptions = [
  { value: "All", label: "All Status" },
  { value: "Active", label: "Active" },
  { value: "Pending", label: "Pending" },
  { value: "Inactive", label: "Inactive" },
];

export function filterSampleStudents(students: readonly SampleStudent[], search: string, status: string) {
  const query = search.trim().toLocaleLowerCase();
  return students.filter((student) =>
    (status === "All" || student.status === status) &&
    (!query || student.name.toLocaleLowerCase().includes(query) || student.email.toLocaleLowerCase().includes(query))
  );
}

export function paginateStudents(students: readonly SampleStudent[], requestedPage: number, pageSize = 5) {
  const totalPages = Math.ceil(students.length / pageSize);
  const page = Math.min(Math.max(requestedPage, 1), Math.max(totalPages, 1));
  const startIndex = (page - 1) * pageSize;
  return {
    page,
    totalPages,
    rows: students.slice(startIndex, startIndex + pageSize),
    start: students.length ? startIndex + 1 : 0,
    end: Math.min(startIndex + pageSize, students.length),
  };
}
