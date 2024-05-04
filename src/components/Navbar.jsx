import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white '>
        <div className='my-container justify-between items-center flex p-4 h-20 py-5'>

        <div className="logo font-bold text-white text-2xl">
            <span className='text-green-500'>&lt;</span>Pass
            <span className='text-green-500'>WORLD/&gt;</span>
            </div>
        {/* <ul>
            <li className='flex gap-4'>
                <a className='hover:font-bold' href="/">Home</a>
                <a className='hover:font-bold' href="#">About</a>
                <a className='hover:font-bold' href="#">Contact</a>
            </li>
        </ul> */}
        <a href="https://github.com/prerna-raj" target='_blank' className='flex items-center justify-between bg-green-500 p-1 rounded-lg  ring-1 ring-white'>
        
          <img src="icons/github.svg" alt="Github logo" className='w-10 p-2' />
          <span className='p-1 font-bold uppercase '>GitHub</span>
          
        </a>
        </div>
    </nav>
  )
}

export default Navbar