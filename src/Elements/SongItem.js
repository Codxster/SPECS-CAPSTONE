import { useState, useContext} from 'react'
import './SongItem.css'
import axios from "axios"
import AuthContext from '../store/AuthContext'

const SongItem = ({ track }) => {
    const authCtx = useContext(AuthContext)
    console.log(track)
    return (
        <div className='trackCard'>
            <h3 className='trackInput'>USER: {track.user.username}</h3>
            <p className='trackInput'>Track: {track.track}</p>
            <p className='trackInput'>Artist: {track.artist}</p>
            <img className='trackInput' src={track.albumCover}/> 
        </div>
    )
}

export default SongItem

