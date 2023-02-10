import { useContext, useState } from "react";
import AuthContext from "../store/AuthContext";
import axios from "axios";
import '../css/addSong.css'

const AddSong = () => {
    const authCtx = useContext(AuthContext)

    const [track, setTrack] = useState('')
    const [artist, setArtist] = useState('')
    const [albumCover, setAlbumCover] = useState('')

    const addSong = e => {
        e.preventDefault()
        const body = {track, artist, albumCover}

        axios.post(`/api/track/${authCtx.userId}`, body)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    }

    return (
        <div className="addSongContainer">
            <form onSubmit={e => addSong(e)}>
                <input className='trackInput' placeholder="Track" type='text' onChange={e => setTrack(e.target.value)}/>
                <input className='trackInput' placeholder="Artist" type='text' onChange={e => setArtist(e.target.value)}/>
                <input className='trackInput' placeholder="Album Cover" type='text' onChange={e => setAlbumCover(e.target.value)}/>
                <button className="submitBtn">Submit</button>
            </form>
        </div>
    )
}

export default AddSong