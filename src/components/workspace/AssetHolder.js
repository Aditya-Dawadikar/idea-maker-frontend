import React, { useEffect, useRef, useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { useSelector, useDispatch } from 'react-redux'
import { initAssetList } from '../../redux/actions/AssetInitializer'
import { FaDotCircle } from 'react-icons/fa'

const AssetHolder = (props) => {
    const stdWidth = 200
    const ref = useRef(null);
    const asset_wrapper_ref = useRef(null);
    const [pos, setPos] = useState({ x: props.asset_data.pos.x, y: props.asset_data.pos.y })
    const [scale, setScale] = useState(1)

    const [showMenu, setShowMenu] = useState(false)

    const assetList = useSelector(state => state.assetList.assetList)
    const dispatch = useDispatch()

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    function updateAssetList(new_pos) {
        let resultArr = []
        assetList.map((elem, index) => {
            if (elem.asset_id !== props.asset_data.asset_id) {
                resultArr.push(elem)

            } else {
                let updatedAsset = {
                    ...elem,
                    pos: new_pos
                }
                resultArr.push(updatedAsset)
            }
        })
        dispatch(initAssetList(resultArr))
    }

    function handleDragStart(e) { }
    function handleDragEnter(e) { }
    function handleDragEnd(e) {
        let asset_details = asset_wrapper_ref.current.getBoundingClientRect()

        let asset_width = asset_details.right - asset_details.left
        let asset_height = asset_details.bottom - asset_details.top
        let new_pos = { x: (e.clientX - asset_width / 2), y: e.clientY - asset_height / 2 }
        setPos(new_pos)
        console.log(asset_details)
        console.log(new_pos)
        updateAssetList(new_pos)
    }

    const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            setShowMenu(false);
        }
    }

    const handleMoveForward = (e) => {

    }
    const handleMoveBackward = (e) => {

    }

    const Options = () => {
        return <div className='asset-options'>
            {
                showMenu === true ? <ul ref={ref} className='list-group' style={{ margin: "5px" }}>
                    <li
                        className="list-group-item"
                        style={{ padding: "5px" }}
                        onClick={() => { handleMoveForward() }}
                    >Bring Forward</li>
                    <li
                        className="list-group-item"
                        style={{ padding: "5px" }}
                        onClick={() => { handleMoveBackward() }}
                    >Push Backward</li>
                </ul> : <></>
            }

        </div>
    }

    return (
        <div
            ref={asset_wrapper_ref}
            className='asset-container'
            style={{
                "position": "absolute",
                "left": pos.x,
                "top": pos.y
            }}

            onDragStart={(e) => { handleDragStart(e) }}
            onDragEnter={(e) => { handleDragEnter(e) }}
            onDragEnd={(e) => { handleDragEnd(e) }}

            draggable
        >
            <div>
                <FaDotCircle className='node-connector'/>
                {/* <div className='float-right icon' onClick={(e) => { setShowMenu(!showMenu) }}>
                    <BsThreeDots />
                    <div><Options /></div>
                </div> */}
            </div>
            <div className='asset-container-inner'>
                {
                    props.asset_data.asset_type === "text" ?
                        <p>{props.asset_data.asset_text}</p>
                        : props.asset_data.asset_type === "image" ?
                            <img
                                src={props.asset_data.asset_src}
                                alt=""
                                width={`${stdWidth * scale}px`}
                            ></img>
                            : props.asset_data.asset_type === "video" ?
                                <video
                                    controls
                                    width={`${stdWidth * scale}px`}>
                                    <source src={props.asset_data.asset_src}></source>
                                </video>
                                : <></>
                }
            </div>
            <div className='line'></div>
            <div className='text-center' style={{ fontSize: "12px", }}><b>{props.asset_data.asset_name}</b></div>
        </div>
    )
}

export default AssetHolder