import ELineGraph from '@/app/Components/ELineGraph'
import React from 'react'

export default function linechart() {
  return (
    <>
     <div className='container my-4'>
        <h2>The Line Graph</h2>
        <p>The Line graph based on the "Model Year" and "Electric Range" for each "Make' so the X axis shows the 'Model' and the Y axis shows the range of eletric and the line point shows the differnt make </p>
      </div>
    <ELineGraph/>
    </>
  )
}
