"use client ";
import Link from "next/link";
import React from "react";

export default function HomePage() {
  return (
    <div className="container ">
      <div className="d-flex my-4">
        <div className="bg-banner bg-dark text-light px-4 py-4 rounded-3">
          <h1 className="display-4">Welcome to Data Visualization App</h1>
          <p className="lead">Explore and visualize data with various graphs.</p>
          <div className="row mb-4">
            <div className="col-md-12">
              <h2>Data Visualization</h2>
              <p>Data visualization is the representation of data in graphical or visual format. It enables decision-makers to see analytics presented visually, so they can grasp difficult concepts or identify new patterns.</p>
            </div>
          </div>
        </div>
        <div className="mt-4 rounded-circle">
          <img src="banner.png" className="img-fluid" alt="" />
        </div>
      </div>
      <hr />
      <div className="">
        <h2>About Dataset CSV file</h2>
        <p>File Name:Electric_Vehicle_Population_Data.csv</p>
        <p>The This dataset shows the Battery Electric Vehicles (BEVs) and Plug-in Hybrid Electric Vehicles (PHEVs) that are currently registered through Washington State Department of Licensing (DOL).</p>
      </div>
      <hr />
      <div className="row my-4">
        <div className="col-md-6">
          <h2>Graphs Created using D3 js</h2>
          <ul>
            <li>Pie Chart</li>
            <li>Double Bar Graph</li>
            <li>Donut Chart</li>
            <li>Line Graph</li>
            <li>Bar Graph</li>
            <li>Scatter Plot</li>
          </ul>
        </div>
        <hr />

        <div className="">
          <h2>Group 3 - Members</h2>
          <h3>Vikranth : 8867310</h3>
        </div>
      </div>
    </div>
  );
}
