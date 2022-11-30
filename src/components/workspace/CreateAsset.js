import React,{useState,useEffect} from 'react'
import { Grid } from '@mui/material'
import { GrFormClose } from 'react-icons/gr'

const CreateAsset = (props) => {

    const [linkableItems,setLinkableItems] = useState(["hij","klm","nop"])
    const [linkedItems, setLinkedItems] = useState(["abc","def"])

    function removeLinkedItem(index){
        let newLinkedItemsList = linkedItems.filter((elem,id)=>{
            return id!==index
        })
        setLinkableItems([...linkableItems,linkedItems[index]])
        setLinkedItems(newLinkedItemsList)
    }

    function linkItem(index){
        let newLinkedItemsList=linkedItems
        if(!linkedItems.includes(linkableItems[index])){
            newLinkedItemsList.push(linkableItems[index])
        }
        setLinkedItems(newLinkedItemsList)
        let newlinkableItems = linkableItems.filter((item,id)=>{
            return index!==id
        })
        setLinkableItems(newlinkableItems)
    }

    return (
        <div className='create-asset-card'>
            <div style={{ float: "right" }} className='icon'>
                <GrFormClose
                    onClick={(e) => { props.close() }}
                    className='close-btn'
                />
            </div>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <div>
                        <div className='input-group'>
                            <label>Asset name</label>
                            <input className='form-control' />
                        </div>
                        <div className='input-group'>
                            <label>Description</label>
                            <input className='form-control' />
                        </div>
                        <div className='input-group'>
                            <label>Format</label>
                            <select class="form-control">
                                <option>Text</option>
                                <option>Image</option>
                                <option>Video</option>
                                <option>Link</option>
                                <option>Audio</option>
                            </select>
                        </div>
                        <div className='input-group'>
                            <label>Choose File</label>
                            <input type="file" class="form-control-file" />
                        </div>
                        <div className='input-group'>
                            <label>Link Items</label>
                            <ul className='linkable-items-list' >
                            {
                                linkableItems.map((item,index)=>{
                                    return <li style={{cursor:"pointer"}} onClick={(e)=>{linkItem(index)}}>{item}</li>
                                })
                            }
                            </ul>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className='input-group'>
                        <label>Preview</label>
                        <div style={{ width: "300px", height: "120px", background: "#c1c1c1" }}></div>
                    </div>
                    <div>
                        <label>Linked Items</label>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {
                                linkedItems.map((item,index)=>{
                                    return <Grid item xs={2} sm={4} md={4} key={index}>
                                        <div className='linked-item'>
                                            {item} 
                                            <GrFormClose
                                                onClick={()=>{removeLinkedItem(index)}}
                                                className='icon'
                                                style={{float:"right"}}
                                            /></div>
                                    </Grid>
                                })
                            }
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default CreateAsset