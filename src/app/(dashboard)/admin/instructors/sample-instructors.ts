export type InstructorStatus = "Active" | "Pending" | "Inactive";

export interface SampleInstructor {
  id: string;
  name: string;
  email: string;
  courses: number;
  joined: string;
  status: InstructorStatus;
}

export const sampleInstructors: readonly SampleInstructor[] = [
  { id: "sample-instructor-1", name: "Elena Torres", email: "elena.torres@example.com", courses: 3, joined: "Sep 15, 2026", status: "Active" },
  { id: "sample-instructor-2", name: "Daniel Cruz", email: "daniel.cruz@example.com", courses: 2, joined: "Sep 7, 2026", status: "Active" },
  { id: "sample-instructor-3", name: "Maya Villanueva", email: "maya.villanueva@example.com", courses: 0, joined: "Aug 30, 2026", status: "Pending" },
  { id: "sample-instructor-4", name: "Rafael Lim", email: "rafael.lim@example.com", courses: 4, joined: "Aug 22, 2026", status: "Active" },
  { id: "sample-instructor-5", name: "Nina Mercado", email: "nina.mercado@example.com", courses: 1, joined: "Aug 14, 2026", status: "Inactive" },
  { id: "sample-instructor-6", name: "Jose Navarro", email: "jose.navarro@example.com", courses: 5, joined: "Aug 6, 2026", status: "Active" },
  { id: "sample-instructor-7", name: "Tessa Ramos", email: "tessa.ramos@example.com", courses: 0, joined: "Jul 28, 2026", status: "Pending" },
  { id: "sample-instructor-8", name: "Andre Bautista", email: "andre.bautista@example.com", courses: 2, joined: "Jul 20, 2026", status: "Inactive" },
];

export const instructorStatusOptions = [
  { value: "All", label: "All Status" },
  { value: "Active", label: "Active" },
  { value: "Pending", label: "Pending" },
  { value: "Inactive", label: "Inactive" },
];

export function filterSampleInstructors(instructors: readonly SampleInstructor[], search: string, status: string) {
  const query = search.trim().toLowerCase();
  return instructors.filter((instructor) =>
    (status === "All" || instructor.status === status) &&
    (!query || instructor.name.toLowerCase().includes(query) || instructor.email.toLowerCase().includes(query))
  );
}

export function paginateInstructors(instructors: readonly SampleInstructor[], requestedPage: number, pageSize = 5) {
  const totalPages = Math.ceil(instructors.length / pageSize);
  const page = Math.min(Math.max(requestedPage, 1), Math.max(totalPages, 1));
  const startIndex = (page - 1) * pageSize;
  return {
    page,
    totalPages,
    rows: instructors.slice(startIndex, startIndex + pageSize),
    start: instructors.length ? startIndex + 1 : 0,
    end: Math.min(startIndex + pageSize, instructors.length),
  };
}
