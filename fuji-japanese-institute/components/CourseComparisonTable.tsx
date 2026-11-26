import React from 'react';

const COMPARISON_DATA = [
  {
    level: 'JLPT N5',
    targetGoal: 'Beginner Basics',
    duration: '3 Months',
    kanjiCount: '100+',
    weeklyHours: '4-6 Hrs',
    careerOutcome: 'Foundation',
    badge: 'Starter'
  },
  {
    level: 'JLPT N4',
    targetGoal: 'Daily Conversation',
    duration: '4 Months',
    kanjiCount: '300+',
    weeklyHours: '4-6 Hrs',
    careerOutcome: 'SSW Visa Eligible',
    badge: 'Popular'
  },
  {
    level: 'JLPT N3',
    targetGoal: 'Business Intermediate',
    duration: '6 Months',
    kanjiCount: '650+',
    weeklyHours: '6-8 Hrs',
    careerOutcome: 'Entry IT Jobs',
    badge: 'Career'
  },
  {
    level: 'JLPT N2',
    targetGoal: 'Business Fluent',
    duration: '8 Months',
    kanjiCount: '1000+',
    weeklyHours: '8-10 Hrs',
    careerOutcome: 'High-Paying IT Jobs / Visa',
    badge: 'Pro'
  },
  {
    level: 'Spoken / Biz',
    targetGoal: 'Corporate Comm',
    duration: '2 Months',
    kanjiCount: 'N/A',
    weeklyHours: '4 Hrs',
    careerOutcome: 'Corporate Fluency',
    badge: 'Special'
  }
];

export default function CourseComparisonTable() {
  return (
    <div className="w-full overflow-x-auto my-10 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Compare Courses</h3>
      <table className="w-full min-w-[700px] text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b-2 border-gray-200">
            <th className="py-4 px-4 font-bold text-gray-700">Course Level</th>
            <th className="py-4 px-4 font-bold text-gray-700">Target Goal</th>
            <th className="py-4 px-4 font-bold text-gray-700">Duration</th>
            <th className="py-4 px-4 font-bold text-gray-700">Kanji Count</th>
            <th className="py-4 px-4 font-bold text-gray-700">Weekly Hours</th>
            <th className="py-4 px-4 font-bold text-gray-700">Career Outcome</th>
          </tr>
        </thead>
        <tbody>
          {COMPARISON_DATA.map((row, idx) => (
            <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">{row.level}</span>
                  <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-semibold">{row.badge}</span>
                </div>
              </td>
              <td className="py-4 px-4 text-gray-600">{row.targetGoal}</td>
              <td className="py-4 px-4 text-gray-600 font-medium">{row.duration}</td>
              <td className="py-4 px-4 text-gray-600">{row.kanjiCount}</td>
              <td className="py-4 px-4 text-gray-600">{row.weeklyHours}</td>
              <td className="py-4 px-4 font-semibold">{row.careerOutcome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
