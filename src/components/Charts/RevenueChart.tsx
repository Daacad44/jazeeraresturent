import React from 'react';
import { BarChart3 } from 'lucide-react';

interface RevenueData {
  date: string;
  revenue: number;
}

interface RevenueChartProps {
  data: RevenueData[];
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  const maxRevenue = Math.max(...data.map(d => d.revenue));
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
        <BarChart3 className="w-5 h-5 text-blue-500 mr-2" />
        Revenue Trend
      </h3>
      <div className="h-64">
        <div className="flex items-end justify-between h-48 space-x-2">
          {data.map((day, index) => {
            const height = (day.revenue / maxRevenue) * 100;
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="relative group">
                  <div
                    className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm transition-all duration-300 hover:from-blue-600 hover:to-blue-500 min-h-[4px] w-full"
                    style={{ height: `${Math.max(height, 4)}%` }}
                  ></div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    ${day.revenue.toFixed(2)}
                  </div>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-300 mt-2 transform -rotate-45 origin-left">
                  {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>$0</span>
          <span>${maxRevenue.toFixed(0)}</span>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;