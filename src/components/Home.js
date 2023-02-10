import React from 'react'
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
// import AddSong from './addSong';
import AuthContext from '../store/AuthContext';
import SongItem from '../Elements/SongItem'


function Home({ isAuthenticated }) {
        const [data, setData] = useState([]);
        const [error, setError] = useState(null);

        const [tracks, setTracks] = useState([])
        const {getAllTracks} = useContext(AuthContext)

        const {userId} = useContext(AuthContext)
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/allOftracks/${userId}`)
                setData(response.data);
            } catch (err) {
                setError(err);
            }
    
        }
        
        fetchData();
    }, []);
    console.log(data)
    return (
        <div>
            {data.map(track => {
                return <SongItem key={track.id} track={track} getAllTracks={getAllTracks}/>
            })}

            {isAuthenticated ? <p>Welcome Back</p> : <p>Click the button</p>}
        </div>
    );

}





export default Home;