import EDoubleBarGraph from '@/app/Components/EDoubleBarGraph'
import React from 'react'

export default function doublebargraph() {
  return (
    <>
     <div className='container my-4'>
        <h2>The Double Bar Graph</h2>
        <p>The Double bar Graph compares the "Electric Range" for each "Make" and distinguish the bars based on the "Model Year.</p>
      </div>
    <EDoubleBarGraph/>
    </>
  )
}
