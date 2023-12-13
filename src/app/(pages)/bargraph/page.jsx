import EBarGraph from '@/app/Components/EBarGraph'
import React from 'react'

export default function bargraph() {
  return (
    <>
      <div className='container my-4'>
        <h2>The Bar Graph</h2>
        <p>The bar graph shows on the 'Electric Range' averagwe for each 'Make'.</p>
      </div>
      <EBarGraph />
    </>
  )
}
