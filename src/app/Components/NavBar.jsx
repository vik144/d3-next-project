'use client'
import Link from 'next/link'
import React from 'react'

export default function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand text-white fs-3" href="#">Data  Visualization</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active text-white" aria-current="page" href="/">Home</Link>
                        </li>
                       
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Graphs
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" href="/bargraph">Bar Graph</Link></li>
                                <li><Link className="dropdown-item" href="/donutchart">Donut Chart</Link></li>
                                <li><Link className="dropdown-item" href="/doublebargraph">Double Bar Graph</Link></li>
                                <li><Link className="dropdown-item" href="/linechart">Line Graph</Link></li>
                                <li><Link className="dropdown-item" href="/piechart">Pie Chart</Link></li>
                                <li><Link className="dropdown-item" href="/schatterchart">ScatterShot Chart</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
