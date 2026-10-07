// Illustrative dashboard content only. Do not present these values as live analytics.
export const sampleStats = [
  { label: "Total Learners", value: "1,280", note: "Sample total", icon: "learners", tone: "emerald" },
  { label: "Instructors", value: "42", note: "Sample total", icon: "instructors", tone: "blue" },
  { label: "Courses", value: "64", note: "Sample catalog", icon: "courses", tone: "violet" },
  { label: "Active Enrollments", value: "910", note: "Sample total", icon: "enrollments", tone: "cyan" },
  { label: "Assignments", value: "186", note: "Sample total", icon: "assignments", tone: "amber" },
  { label: "Quiz Attempts", value: "324", note: "Sample total", icon: "quizzes", tone: "rose" },
] as const;

export const sampleTrend = [
  { day: "Mon", learners: 12, enrollments: 21 },
  { day: "Tue", learners: 18, enrollments: 29 },
  { day: "Wed", learners: 15, enrollments: 24 },
  { day: "Thu", learners: 26, enrollments: 38 },
  { day: "Fri", learners: 23, enrollments: 35 },
  { day: "Sat", learners: 31, enrollments: 48 },
  { day: "Sun", learners: 28, enrollments: 42 },
];

export const sampleRoles = [
  { label: "Learners", value: 1280, color: "#10b981" },
  { label: "Instructors", value: 42, color: "#3b82f6" },
  { label: "Admins", value: 6, color: "#8b5cf6" },
];

export const sampleCourses = [
  { id: "course-1", title: "Introduction to Web Development", instructor: "Sample Instructor A", learners: 186, lessons: 18, status: "Active" },
  { id: "course-2", title: "Digital Marketing Essentials", instructor: "Sample Instructor B", learners: 154, lessons: 14, status: "Active" },
  { id: "course-3", title: "Data Analysis Fundamentals", instructor: "Sample Instructor C", learners: 126, lessons: 21, status: "Active" },
  { id: "course-4", title: "Project Management Basics", instructor: "Sample Instructor D", learners: 110, lessons: 12, status: "Active" },
];

export const sampleUpcomingAssignments = [
  { id: "assignment-1", title: "Build a responsive page", course: "Introduction to Web Development", due: "In 2 days" },
  { id: "assignment-2", title: "Create a campaign outline", course: "Digital Marketing Essentials", due: "In 4 days" },
  { id: "assignment-3", title: "Analyze a sample dataset", course: "Data Analysis Fundamentals", due: "In 6 days" },
];

export const sampleEnrollments = [
  { id: "enrollment-1", learner: "Sample Learner 01", course: "Introduction to Web Development", status: "Active", date: "Example day 1" },
  { id: "enrollment-2", learner: "Sample Learner 02", course: "Digital Marketing Essentials", status: "Active", date: "Example day 2" },
  { id: "enrollment-3", learner: "Sample Learner 03", course: "Data Analysis Fundamentals", status: "Active", date: "Example day 3" },
  { id: "enrollment-4", learner: "Sample Learner 04", course: "Project Management Basics", status: "Active", date: "Example day 4" },
];
