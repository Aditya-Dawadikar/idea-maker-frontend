import React, { useEffect, useRef, useState } from 'react'
import '../App.css'
import AssetHolder from '../components/workspace/AssetHolder'
import { useSelector, useDispatch } from 'react-redux'
import ToolBar from '../components/workspace/ToolBar'

const Workspace = () => {

  const [linkType, setLinkType] = useState("line") // link: ["line","curve"]
  const [pathList, setPathList] = useState([])
  const [activePathList, setActivePathList] = useState([])
  const connector_ref = useRef(null)

  const assetList = useSelector(state => state.assetList.assetList)

  useEffect(() => {
    console.log("here")
    DrawLinks()
  }, [assetList])


  useEffect(() => {
    console.log(pathList)
    setActivePathList(pathList)
  }, [pathList])

  function drawWithOffset(posnA, posnB) {
    let y_offset = 12
    return [{ ...posnA, y: posnA.y + y_offset }, { ...posnB, y: posnB.y + y_offset }]
  }

  function DrawLinks() {
    setPathList([])
    for (let i = 0; i < assetList.length; i++) {
      for (let j = 0; j < assetList.length; j++) {
        if (i !== j) {
          if (assetList[i].links.includes(assetList[j].asset_id)) {
            let positions = drawWithOffset(assetList[i].pos, assetList[j].pos)
            let path = drawConnector(positions[0], positions[1])
            setPathList(current => [...current, path])
          }
        }
      }
    }
  }

  var drawConnector = function (posnA, posnB) {

    let d = 100
    if (linkType === "line") {
      d = 0
    }

    var dStr =
      "M" +
      (posnA.x) + "," + (posnA.y) + " " +
      "C" +
      (posnA.x + d) + "," + (posnA.y) + " " +
      (posnB.x - d) + "," + (posnB.y) + " " +
      (posnB.x) + "," + (posnB.y);
    return dStr
  };

  useEffect(() => {
    DrawLinks()
  }, [])

  return (
    <div className='d-flex'>
      <ToolBar style={{margin:"0"}} />
      <div className='workspace-bg background-bg-light'>
        <svg width="100%" height="100%">
          {
            activePathList.map((path, index) => {
              return <path key={index} d={path} id="connector" fill="none" stroke="red" strokeWidth="2" />
            })
          }
        </svg>
        {
          assetList.map((asset, index) => {
            return <AssetHolder asset_data={asset} key={index} />
          })
        }
      </div>
    </div>

  )
}

export default Workspace
