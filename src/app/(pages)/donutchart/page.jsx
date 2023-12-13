import EDonutChart from '@/app/Components/EDonutChart'
import React from 'react'

export default function donutchart() {
  return (
    <>
      <div className='container my-4'>
        <h2>The Donut Chart</h2>
        <p>The Donut Chart we are comparing the distribution of electric vehicles based on their "Make" (car manufacturer). Each segment in the donut chart represents a unique "Make," and the size of each segment corresponds to the number of vehicles from that manufacturer.</p>
      </div>
      <EDonutChart />
    </>
  )
}
