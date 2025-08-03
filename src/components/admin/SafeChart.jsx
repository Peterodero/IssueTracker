// components/SafeChart.js
import { useEffect, useRef } from 'react';
import { Chart as ChartJS } from 'chart.js';

export default function SafeChart({ type, data, options }) {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Destroy previous chart instance
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Create new chart instance
    const ctx = canvasRef.current.getContext('2d');
    chartRef.current = new ChartJS(ctx, {
      type: type,
      data: data,
      options: options
    });

    // Cleanup function
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [type, data, options]);

  return <canvas ref={canvasRef} />;
}