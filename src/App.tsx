import './App.css'
import Card from './card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './components/ui/sheet'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { ModeToggle } from '@/components/mode-toggle'
import { useState } from 'react';
import { ThemeProvider } from "@/components/theme-provider"
import  { useEffect } from 'react';



function App() {
  const [searchValue, setSearchValue] = useState('');

  const [songs, setSongs] = useState<any[]>([]);

  const [bulkSongs, setbulkSongs] = useState("");


  const handleSearch = async () => {
    const response = await fetch('https://musica-api-8odu.onrender.com/search/'+searchValue);
    console.log(searchValue);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    setSongs(data);

  };
  const handleBulkDownload = async () => {
    const songList = bulkSongs.split("\n");
    console.log(songList);
    for (let i = 0; i < songList.length; i++) {
      const response = await fetch('https://musica-api-8odu.onrender.com/getSong/'+songList[i]);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const downloadLink = await response.json();
      const downloadLinkElement = document.createElement('a');
      downloadLinkElement.href = downloadLink;
      downloadLinkElement.download = 'song.mp3';
      downloadLinkElement.click();
    }

  };
  const defaultSearch = async () => {
    console.log("hello")
    const response = await fetch('https://musica-api-8odu.onrender.com/search/mai');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);
    setSongs(data);

  };
  
  const handleKeyDown = (event:any) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };
  const handleInputChange = (event: any ) => {
    setSearchValue(event.target.value);
    
  };
  useEffect(() => {
    defaultSearch();
  }, []);

  return (
    <>
      <section className='flex items-center flex-col bg-slate-950'>
      <div className="flex p-5 bg-gray-900 width w-full lg:px-44">
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <ModeToggle/>
        </ThemeProvider>
        <Sheet>
        <SheetTrigger>
          <Button className='px-4 border border-gray-600'>Bulk</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Bulk Download</SheetTitle>
          </SheetHeader>
            <textarea className='w-full h-64 mt-5 p-2 border border-gray-600' placeholder='Song names..' value={bulkSongs} onChange={(event)=>setbulkSongs(event.target.value)} ></textarea>
            <Button className='px-8 border border-gray-600' onClick={handleBulkDownload}>Download</Button>
        </SheetContent>
      </Sheet>
        <Input onKeyDown={handleKeyDown}  className='mx-1' placeholder='Search' value={searchValue} onSubmit={handleSearch} onChange={handleInputChange} />
        <Button className='px-8 border border-gray-600' onClick={handleSearch}>Search</Button>
      </div>
      <div className="min-h-screen lg:px-44">
        <div className="lg:grid md:grid grid-cols-1 gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {songs.map((song, index) => (
              <Card  key={index} {...song} />
            ))}
          </div>
        </div>
      </section>
      <footer className="bg-gray-900 text-white text-center py-4">
        <p>Designed by Manik Sharma</p>
        <p className="pt-3">&copy; 2024 Manik Sharma. All rights reserved.</p>
      </footer>
    </>
  )
}

export default App