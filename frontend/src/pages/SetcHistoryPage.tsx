import React, { useState, useEffect } from 'react';
import { PageView, SetcHistory, SetcAward } from '../types';
import { ArrowLeft, Clock, Award, TrendingUp, Bus } from 'lucide-react';
import { API_BASE_URL } from '../services/api';

interface SetcHistoryPageProps {
  onNavigate: (page: PageView) => void;
}

export const SetcHistoryPage: React.FC<SetcHistoryPageProps> = ({ onNavigate }) => {
  const [historyItems, setHistoryItems] = useState<SetcHistory[]>([]);
  const [awards, setAwards] = useState<SetcAward[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [historyRes, awardsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/setc/history`),
          fetch(`${API_BASE_URL}/setc/awards`)
        ]);

        if (historyRes.ok) setHistoryItems(await historyRes.json());
        if (awardsRes.ok) setAwards(await awardsRes.json());
      } catch (error) {
        console.error('Failed to fetch SETC history/awards', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onNavigate('setc')}
          className="p-2 rounded-full hover:bg-slate-200 transition-colors text-slate-600"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="w-14 h-14 rounded-2xl bg-white p-1 shadow-sm border border-slate-200 flex items-center justify-center shrink-0">
          <img src="/setc-logo.png" alt="SETC Logo" className="w-full h-full object-contain rounded-xl" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">History & Awards</h1>
          <p className="text-slate-500 font-medium">Evolution of State Express Transport Corporation</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm text-slate-600">
        SETC (formerly Thiruvalluvar Transport Corporation) was established in 1980 to provide express transport services across Tamil Nadu and neighboring states. Over the decades, it has modernized its fleet and expanded its interstate connectivity.
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-tnstc-blue"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* History Timeline */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center space-x-2 border-b border-slate-200 pb-2">
              <Clock className="w-6 h-6 text-slate-500" />
              <span>Fleet Evolution</span>
            </h2>

            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
              {historyItems.length === 0 ? (
                <div className="text-slate-500 italic p-4 bg-slate-50 rounded-xl border border-slate-100">
                  Timeline data is currently being populated.
                </div>
              ) : (
                historyItems.map((item) => (
                  <div key={item.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    {/* Icon */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-blue-100 text-tnstc-blue shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <Bus className="w-5 h-5" />
                    </div>
                    {/* Card */}
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-5 rounded-2xl border border-slate-200 shadow-sm group-hover:border-blue-300 group-hover:shadow-md transition-all">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-tnstc-blue text-lg">{item.yearRange}</span>
                        <span className="flex items-center space-x-1 text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                          <TrendingUp className="w-3.5 h-3.5" />
                          <span>{item.fleetCount} Buses</span>
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-800 mb-1">{item.title}</h3>
                      <p className="text-sm text-slate-500">{item.description}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Awards */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center space-x-2 border-b border-slate-200 pb-2">
              <Award className="w-6 h-6 text-amber-500" />
              <span>National Awards</span>
            </h2>
            
            <div className="grid grid-cols-1 gap-4">
              {awards.length === 0 ? (
                <div className="text-slate-500 italic p-4 bg-slate-50 rounded-xl border border-slate-100">
                  Awards data is currently being populated.
                </div>
              ) : (
                awards.map(award => (
                  <div key={award.id} className="bg-gradient-to-br from-white to-amber-50/30 p-5 rounded-2xl border border-amber-200/60 shadow-sm hover:shadow-md transition-shadow flex items-start space-x-4">
                    <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
                      <Award className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{award.awardName}</h3>
                      <div className="text-sm font-medium text-amber-700 mt-1">{award.category}</div>
                      <div className="text-xs text-slate-500 mt-0.5">Awarded by: {award.awardingBody}</div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {award.years.map(year => (
                          <span key={year} className="bg-white border border-amber-200 text-amber-700 text-xs font-bold px-2 py-1 rounded shadow-sm">
                            {year}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
