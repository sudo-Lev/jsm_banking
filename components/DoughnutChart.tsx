'use client'

import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend)

function DoughnutChart({ accounts }: DoughnutChartProps) {
  const accountsName = accounts.map(account => account.name)
  const balances = accounts.map(account => account.currentBalance)

  const data = {
    datasets: [
      {
        label: 'Banks',
        data: balances,
        backgroundColor: ['#0747b6', '#2265d8', '#2f91fa'],
      }
    ],
    labels: accountsName
  }
  return <Doughnut
    options={{
      cutout: '60%',
      plugins: {
        legend: {
          display: false
        }
      }
    }}
    data={data}
  />
}

export default DoughnutChart