'use client';

import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';

interface PieChartProps {
  data: {
    name: string;
    value: number;
    color?: string;
  }[];
  title?: string;
  height?: number;
  innerRadius?: string;
  showLabels?: boolean;
}

export default function PieChart({ 
  data, 
  title, 
  height = 400,
  innerRadius = '0%',
  showLabels = true 
}: PieChartProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const option = useMemo(() => ({
    title: title ? {
      text: title,
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
      }
    } : undefined,
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'horizontal',
      bottom: 0,
      textStyle: {
        fontSize: 12
      }
    },
    series: [
      {
        name: title || 'נתונים',
        type: 'pie',
        radius: [innerRadius, '70%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: false,
        label: {
          show: showLabels,
          position: 'outside',
          fontSize: 11,
          formatter: '{b}\n{d}%'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: showLabels
        },
        data: data.map(item => ({
          value: item.value,
          name: item.name,
          itemStyle: {
            color: item.color || '#5470c6'
          }
        }))
      }
    ]
  }), [data, title, height, innerRadius, showLabels]);

  if (!isClient) {
    return (
      <div className="w-full flex items-center justify-center" style={{ height: `${height}px` }}>
        <div className="text-slate-500">טוען גרף...</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <ReactECharts
        option={option}
        style={{ height: `${height}px` }}
        opts={{ renderer: 'canvas' }}
      />
    </div>
  );
}