import React from 'react';

interface CardProps {
    song_name: string;
    artists_name: string;
    song_icon: string;
    download_link: string;
}

const Card: React.FC<CardProps> = ({ song_name, artists_name, song_icon, download_link }) => {
    return (
        <div className="text-white border bg-gray-900 card border-gray-600 rounded-lg p-4 m-4 w-64 hover:scale-110 transition-transform duration-300 flex flex-col">
            <img src={song_icon} alt={song_name} className="w-full h-auto rounded-lg" />
            <h3 className="mt-2 text-lg">{song_name}</h3>
            <p className="mb-2 text-sm">Artist : {artists_name}</p>
            <div className="flex-grow"></div>
            <a href={download_link} download className="block text-center bg-green-600 text-white py-1 px-2 rounded-md no-underline">
                Download
            </a>
        </div>
    );
};

export default Card;