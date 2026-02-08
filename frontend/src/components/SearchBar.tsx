import React from 'react'
import { Search } from 'lucide-react'
const SearchBar = () => {
  return (
    <div className='flex justify-between items-center p-2 max-w-[400px] border-1 border-gray-300 rounded-md' >
        <input 
          type="text" 
          className='border-none outline-none'
          placeholder='Search Books'
          />
        <Search 
          className='cursor-pointer'
          size={24} />
    </div>
  )
}

export default SearchBar