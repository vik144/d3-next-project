import EPieChart from '@/app/Components/EPieChart'
import React from 'react'

export default function piechart() {
  return (
    <>
      <div className='container my-4'>
        <h2>The Pie Chart</h2>
        <p>The Pie Chart graph shows the total market captured by the hybrid vs the Battery electrical vehicle.</p>
      </div>
      <EPieChart />
    </>
  )
}
