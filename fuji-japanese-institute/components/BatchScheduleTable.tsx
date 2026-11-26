import React from 'react';
import { Calendar, Clock, MapPin, Users, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface BatchScheduleTableProps {
  onReserveSeat?: (batchName: string) => void;
  className?: string;
}

interface BatchInfo {
  id: string;
  level: string;
  name: string;
  mode: 'Online (Zoom)' | 'Offline (Bengaluru)' | 'Hybrid (Offline + Online)';
  timing: string;
  startDate: string;
  days: string;
  statusBadge: string;
  statusColor: string;
  instructor: string;
}

const UPCOMING_BATCHES: BatchInfo[] = [
  {
    id: 'b-n5-weekday',
    level: 'JLPT N5',
    name: 'Foundation Evening Batch (Live Online)',
    mode: 'Online (Zoom)',
    timing: '7:30 PM – 9:00 PM IST',
    startDate: '1st & 3rd Monday (Monthly Intake)',
    days: 'Mon, Wed, Fri',
    statusBadge: 'Admissions Open',
    statusColor: 'bg-emerald-500/10 text-emerald-700 border-emerald-200',
    instructor: 'Native Sensei + Indian N1 Mentor'
  },
  {
    id: 'b-n5-weekend',
    level: 'JLPT N5',
    name: 'Weekend Immersive Cohort (Bengaluru Campus & Online)',
    mode: 'Hybrid (Offline + Online)',
    timing: '10:00 AM – 1:00 PM IST',
    startDate: 'Upcoming Weekend Cohort',
    days: 'Saturday & Sunday',
    statusBadge: 'Weekend Batch',
    statusColor: 'bg-indigo-500/10 text-indigo-700 border-indigo-200',
    instructor: 'Hiroshi Sensei (Tokyo Faculty)'
  },
  {
    id: 'b-n4-fasttrack',
    level: 'JLPT N4',
    name: 'Fast-Track SSW & Work Visa Batch',
    mode: 'Online (Zoom)',
    timing: '6:30 PM – 8:00 PM IST',
    startDate: 'Bi-Monthly Fast-Track',
    days: 'Mon, Tue, Thu, Fri',
    statusBadge: 'Fast-Track Track',
    statusColor: 'bg-blue-500/10 text-blue-700 border-blue-200',
    instructor: 'Priya Sensei (JLPT N1 Certified)'
  },
  {
    id: 'b-n3-it',
    level: 'JLPT N3',
    name: 'Bilingual IT & Software Bridge Program',
    mode: 'Online (Zoom)',
    timing: '8:00 PM – 9:30 PM IST',
    startDate: 'Monthly IT Cohort',
    days: 'Tue, Thu, Sat',
    statusBadge: 'Career Track',
    statusColor: 'bg-purple-500/10 text-purple-700 border-purple-200',
    instructor: 'Kenji Sato Sensei (Tokyo MNC Veteran)'
  },
  {
    id: 'b-n2-pro',
    level: 'JLPT N2',
    name: 'Advanced Keigo & Executive Weekend Batch',
    mode: 'Hybrid (Offline + Online)',
    timing: '2:00 PM – 5:00 PM IST',
    startDate: 'Quarterly Executive Intake',
    days: 'Saturday & Sunday',
    statusBadge: 'Executive Batch',
    statusColor: 'bg-amber-500/10 text-amber-700 border-amber-200',
    instructor: 'Senior Native Master Sensei'
  }
];

export const BatchScheduleTable: React.FC<BatchScheduleTableProps> = ({
  onReserveSeat,
  className = ''
}) => {
  const handleReserve = (batch: BatchInfo) => {
    if (onReserveSeat) {
      onReserveSeat(`${batch.level} - ${batch.name}`);
    } else {
      const msg = encodeURIComponent(`Hi Fuji Japanese Academy, I would like to reserve a free demo seat for the upcoming ${batch.level} (${batch.name}, ${batch.days} ${batch.timing}).`);
      window.open(`https://wa.me/916364924110?text=${msg}`, '_blank');
    }
  };

  return (
    <section className={`w-full py-12 ${className}`} id="batch-schedule">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wider mb-3 border border-red-100">
            <Calendar className="w-3.5 h-3.5" />
            <span>Official Cohort Timetable</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
            Upcoming JLPT Batches &amp; Timetable
          </h2>
          <p className="text-sm md:text-base text-slate-600 font-light max-w-2xl mx-auto">
            Small cohorts (strictly 10–12 students) ensure daily speaking practice with native senseis. Reserve your seat to receive joining credentials.
          </p>
        </div>

        {/* Schedule Table (Desktop & Tablet) */}
        <div className="hidden md:block overflow-hidden rounded-3xl border border-slate-200 shadow-xl bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white text-xs uppercase font-bold tracking-wider">
                <th className="py-4 px-6">Program / Level</th>
                <th className="py-4 px-6">Learning Mode</th>
                <th className="py-4 px-6">Days &amp; Timings (IST)</th>
                <th className="py-4 px-6">Lead Instructor</th>
                <th className="py-4 px-6">Batch Status</th>
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm text-slate-700">
              {UPCOMING_BATCHES.map((batch) => (
                <tr key={batch.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-extrabold text-red-600 text-xs uppercase block">
                      {batch.level}
                    </span>
                    <strong className="text-slate-900 font-bold block text-sm">
                      {batch.name}
                    </strong>
                    <span className="text-[11px] text-slate-400">Intake: {batch.startDate}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                      <MapPin className="w-3 h-3 text-red-500" />
                      {batch.mode}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-800 text-xs">{batch.days}</div>
                    <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {batch.timing}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-xs text-slate-600 font-medium">
                    {batch.instructor}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${batch.statusColor}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {batch.statusBadge}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      type="button"
                      onClick={() => handleReserve(batch)}
                      className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-all inline-flex items-center gap-1.5 active:scale-95 cursor-pointer"
                    >
                      <span>Reserve Demo</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {UPCOMING_BATCHES.map((batch) => (
            <div
              key={batch.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-md space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-red-600 uppercase bg-red-50 px-2 py-0.5 rounded">
                  {batch.level}
                </span>
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${batch.statusColor}`}>
                  {batch.statusBadge}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-sm">{batch.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-red-500" />
                  {batch.mode}
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Schedule:</span>
                  <strong className="text-slate-800">{batch.days}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Timings:</span>
                  <span className="text-slate-800">{batch.timing}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Intake:</span>
                  <span className="text-emerald-700 font-semibold">{batch.startDate}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleReserve(batch)}
                className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
              >
                <span>Reserve Free Demo Seat</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BatchScheduleTable;
