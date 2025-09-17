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
  height = 300,
  innerRadius = '0%',
  showLabels = true
}: PieChartProps) {
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  const option = useMemo(() => ({
    title: title ? {
      text: title,
      left: 'center',
      textStyle: {
        fontSize: isMobile ? 18 : 16,
        fontWeight: 'bold',
      }
    } : undefined,
    // tooltip: {
    //   trigger: 'item',
    //   formatter: '{a} <br/>{b}: {c} ({d}%)'
    // },
    // legend: {
    //   orient: isMobile ? 'horizontal' : 'vertical',
    //   right: isMobile ? 0 : 0,
    //   top: isMobile ? 'bottom' : 'middle',
    //   textStyle: {
    //     fontSize: isMobile ? 0 : 0
    //   }
    // },
    series: [
      {
        name: title || 'Data',
        type: 'pie',
        radius: [innerRadius, isMobile ? '90%' : '80%'],
        center: isMobile ? ['50%', '50%'] : ['50%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: showLabels,
          position: 'outside',
          fontSize: isMobile ? 12 : 11,
          formatter: '{b}\n{d}%'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: isMobile ? 14 : 12,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: showLabels,
          length: isMobile ? 15 : 10,
          length2: isMobile ? 10 : 5
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
  }), [data, title, innerRadius, showLabels, isMobile]);

  if (!isClient) {
    return (
      <div className="w-full flex items-center justify-center" style={{ height: `${height}px` }}>
        <div className="text-slate-500">Loading chart...</div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-visible">
      <ReactECharts
        option={option}
        style={{
          height: `${height}px`,
          width: '100%'
        }}
        opts={{
          renderer: 'canvas'
        }}
      />
    </div>
  );
}