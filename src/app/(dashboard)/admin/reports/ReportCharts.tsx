"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { ReportCourse } from "./report-mock-data";

interface ReportBarChartProps {
  courses: readonly ReportCourse[];
  metric: "students" | "completionRate";
}

export function ReportBarChart({ courses, metric }: ReportBarChartProps) {
  if (!courses.length) return <p className="py-12 text-center text-sm text-slate-500">No sample courses match these filters.</p>;

  const label = metric === "students" ? "Enrolled students" : "Completion rate";
  const data = courses.map((course) => ({
    course: course.title.split(" ").slice(0, 2).join(" "),
    title: course.title,
    students: course.students,
    completionRate: course.completionRate,
  }));

  return <div className="h-[230px] w-full" role="img" aria-label={`Sample ${label.toLowerCase()} by course`}>
    <ResponsiveContainer width="100%" height="100%" minWidth={0}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 14, bottom: 0, left: 0 }} accessibilityLayer>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
        <XAxis type="number" domain={metric === "completionRate" ? [0, 100] : [0, "dataMax"]} allowDecimals={false} tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
        <YAxis dataKey="course" type="category" width={112} tick={{ fontSize: 10, fill: "#475569" }} axisLine={false} tickLine={false} />
        <Tooltip labelFormatter={(_, payload) => payload[0]?.payload?.title ?? ""} formatter={(value) => [`${value}${metric === "completionRate" ? "%" : ""}`, label]} contentStyle={{ border: "1px solid #f1f5f9", borderRadius: 12, fontSize: 12 }} />
        <Bar dataKey={metric} name={label} fill={metric === "students" ? "#10b981" : "#3b82f6"} radius={[0, 6, 6, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>;
}
