import React from 'react'
import '../App.css'
import { SideBarData } from './SideBarData'

function Sidebar() {
    return (
        <div className="Sidebar">
            <ul className = "SidebarList">
                {SideBarData.map((value, key)=> {
                    return <li key={key} className="row">
                                <div>{value.icon}</div>
                                <div>{value.title}</div>
                            </li>
                })}
            </ul>
        </div>
    )
}

export default Sidebar
