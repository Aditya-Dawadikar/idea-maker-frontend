import React, { useState, useEffect } from 'react'
import { TbTools } from 'react-icons/tb'
import { BsCardImage, BsCameraVideo, BsCardText,BsLink45Deg } from 'react-icons/bs'
import { AiFillAudio } from 'react-icons/ai'
import CreateAsset from './CreateAsset'

const ToolBar = () => {

  const [collapse, setCollapse] = useState(true)
  const [showAssetCreator, setShowAssetCreator] = useState(true)

  useEffect(()=>{
    setCollapse(false)
  },[showAssetCreator])

  function closeModal(){
    setShowAssetCreator(false)
  }
  function openModal(){
    setShowAssetCreator(true)
  }

  return (
    <div>
      <div className={collapse ? 'tool-bar tool-bar-collapsed' : 'tool-bar tool-bar-full'}>
        <div
          className='icon'
          onClick={(e) => { setCollapse(!collapse) }}
        ><TbTools className='tool-bar-icon' /></div>
        <br />
        <div className='line'></div>
        <br />
        {
          collapse ? <></> : <ul style={{ listStyle: "none", padding: "0" }}>
            <li onClick={(e)=>{openModal()}}className='tool-bar-item'><BsCardImage className='tool-bar-item-icon' /></li>
            <li onClick={(e)=>{openModal()}} className='tool-bar-item'><BsCameraVideo className='tool-bar-item-icon' /></li>
            <li onClick={(e)=>{openModal()}} className='tool-bar-item'><BsCardText className='tool-bar-item-icon' /></li>
            <li onClick={(e)=>{openModal()}} className='tool-bar-item'><AiFillAudio className='tool-bar-item-icon' /></li>
            <li onClick={(e)=>{openModal()}} className='tool-bar-item'><BsLink45Deg className='tool-bar-item-icon' /></li>
          </ul>
        }
      </div>
      {
        showAssetCreator ? <div className='pop-up-card'>
          <CreateAsset close={closeModal}/>
        </div> : <></>
      }
    </div>

  )
}

export default ToolBar