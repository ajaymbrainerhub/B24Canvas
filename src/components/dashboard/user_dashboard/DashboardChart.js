import React, { useEffect, useRef } from 'react'

import Chart from 'chart.js/auto'

function DashboardChart({ data, type, title }) {
  const chartRef = useRef(null)

  const options = {
    plugins: {
      title: {
        display: true,
        text: title,
        align: 'start'
      },
      legend: {
        display: true,
        align: 'end'
      }
    }
  }

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d')

    new Chart(ctx, {
      type,
      data,
      options
    })
  }, [])

  return <canvas ref={chartRef}></canvas>
}

export default DashboardChart
