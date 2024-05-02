import './App.css'
import Card from './card';
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { useState } from 'react';

function App() {
  const [searchValue, setSearchValue] = useState('');

  const [songs, setSongs] = useState<any[]>([]);


  const handleSearch = async () => {
    const response = await fetch('https://musica-api-8odu.onrender.com/search/'+searchValue);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    setSongs(data);

  };
  

  const handleInputChange = (event: any ) => {
    setSearchValue(event.target.value);
    
  };

  return (
    <>
    {/* <div className='flex bg-slate-700 px-5'>
      <h1 className='text-white text-2xl py-3'>Musica</h1>
    </div> */}
      <div className="flex p-5">
        <Input placeholder='Search' value={searchValue} onSubmit={handleSearch} onChange={handleInputChange} />
        <Button className='px-8' onClick={handleSearch}>Search</Button>
      </div>
      <section className='flex items-center flex-col'>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {/* <div className="flex flex-col items-center"> */}
          {songs.map((song, index) => (
            <Card  key={index} {...song} />
          ))}

        </div>
      </section>
    </>
  )
}

export default App