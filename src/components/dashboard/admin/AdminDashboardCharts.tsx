"use client";

import { useState } from "react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer,
  Tooltip, XAxis, YAxis,
} from "recharts";
import { sampleCourses, sampleRoles, sampleTrend } from "./sample-data";

const chartColor = "#059669";

export function ActivityTrendChart() {
  const [metric, setMetric] = useState<"learners" | "enrollments">("learners");
  const label = metric === "learners" ? "New learners" : "New enrollments";

  return <div>
    <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-800">{label} trend</h2>
        <p className="mt-0.5 text-xs font-medium text-slate-400">Example seven-day period</p>
      </div>
      <div className="flex gap-1 rounded-xl bg-slate-100 p-1" aria-label="Trend metric">
        {(["learners", "enrollments"] as const).map((option) => <button
          key={option}
          type="button"
          aria-pressed={metric === option}
          onClick={() => setMetric(option)}
          className={`rounded-lg px-3 py-1 text-[10px] font-black uppercase tracking-wider transition-colors focus-visible:outline-2 focus-visible:outline-emerald-500 ${metric === option ? "bg-white text-emerald-700 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
        >{option === "learners" ? "Learners" : "Enrollments"}</button>)}
      </div>
    </div>
    <div className="h-[220px] w-full" role="img" aria-label={`Sample ${label.toLowerCase()} across seven days`}>
      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
        <AreaChart data={sampleTrend} margin={{ top: 8, right: 8, bottom: 0, left: -20 }} accessibilityLayer>
          <defs><linearGradient id="admin-trend-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={chartColor} stopOpacity={0.2} />
            <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
          </linearGradient></defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
          <YAxis allowDecimals={false} tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ border: "1px solid #f1f5f9", borderRadius: 12, fontSize: 12 }} formatter={(value) => [value, label]} />
          <Area type="monotone" dataKey={metric} name={label} stroke={chartColor} strokeWidth={2.5} fill="url(#admin-trend-fill)" dot={{ r: 3, fill: chartColor }} activeDot={{ r: 5 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>;
}

export function RoleDistributionChart() {
  const total = sampleRoles.reduce((sum, role) => sum + role.value, 0);
  const radius = 58;
  const circumference = 2 * Math.PI * radius;

  return <div className="flex flex-wrap items-center gap-5">
    <svg viewBox="0 0 150 150" role="img" aria-label="Sample account roles: 1,280 learners, 42 instructors, and 6 admins" className="size-[150px] shrink-0">
      <title>Sample account roles</title>
      <circle cx="75" cy="75" r={radius} fill="none" stroke="#f1f5f9" strokeWidth="20" />
      {sampleRoles.map((role, index) => {
        const start = sampleRoles.slice(0, index).reduce((sum, previous) => sum + previous.value, 0) / total * circumference;
        const length = role.value / total * circumference;
        return <circle key={role.label} cx="75" cy="75" r={radius} fill="none" stroke={role.color} strokeWidth="20"
          strokeDasharray={`${length} ${circumference - length}`} strokeDashoffset={-start}
          transform="rotate(-90 75 75)" />;
      })}
      <text x="75" y="70" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="900">{total.toLocaleString("en-US")}</text>
      <text x="75" y="87" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="700">ACCOUNTS</text>
    </svg>
    <div className="min-w-[140px] flex-1 space-y-2">
      {sampleRoles.map((role) => <div key={role.label} className="flex items-center gap-2 text-xs">
        <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: role.color }} aria-hidden="true" />
        <span className="font-medium text-slate-500">{role.label}</span>
        <span className="ml-auto font-black text-slate-800">{role.value.toLocaleString("en-US")}</span>
      </div>)}
    </div>
  </div>;
}

export function CourseActivityChart() {
  const data = sampleCourses.map((course) => ({
    course: course.title.split(" ").slice(0, 2).join(" "),
    learners: course.learners,
  }));
  return <div>
    <div className="h-[175px] w-full" role="img" aria-label="Sample enrolled learners by course">
      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 8, bottom: 0, left: 0 }} accessibilityLayer>
          <XAxis type="number" allowDecimals={false} tick={{ fontSize: 9, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
          <YAxis dataKey="course" type="category" width={105} tick={{ fontSize: 9, fill: "#475569" }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ border: "1px solid #f1f5f9", borderRadius: 12, fontSize: 12 }} formatter={(value) => [value, "Learners"]} />
          <Bar dataKey="learners" radius={[0, 6, 6, 0]}>
            {data.map((course, index) => <Cell key={course.course} fill={["#10b981", "#3b82f6", "#8b5cf6", "#06b6d4"][index]} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
    <p className="mt-3 text-xs text-slate-400">Illustrative learner counts for the courses shown.</p>
  </div>;
}
