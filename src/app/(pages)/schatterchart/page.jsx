import EScatterChart from '@/app/Components/EScatterShot'
import React from 'react'

export default function scatterchart() {
  return (
    <>
       <div className='container my-4'>
        <h2>The Schatter Shot Graph</h2>
        <p>The Scatter Shot graph or a scatter plot, we choose two numeric variables to represent on the x-axis and y-axis so "Model Year" for the x-axis and "Electric Range" for the y-axis. Each point on the scatter plot will represent a vehicle.</p>
      </div>
      <EScatterChart/>
    </>
  )
}
