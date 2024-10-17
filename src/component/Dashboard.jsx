import React from 'react'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  return (
    <div>
        <p className='text-red-600'>this is dashborad page</p><Link to='/product'>go to product</Link>
    </div> 
  )
}
