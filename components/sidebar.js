import Link from 'next/link'
import React from 'react'

function Sidebar() {
  return (
    <div className='text-white px-4'>
        <Link href={'/'} className='text-md underline'>Details</Link>
    </div>
  )
}

export default Sidebar