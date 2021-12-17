import React,{useEffect, useState} from "react"
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import swal from 'sweetalert';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import {ServerURL, postDataAndImage, postData,getData} from './FetchNodeServices';
import {DropzoneArea} from 'material-ui-dropzone';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
     
    },
    subdiv:{
        padding:20,
        marginTop:10,
        width:1000,
        background:'#fff'
    },
    input: {
        display: 'none',
      },

  }));     


export default function SubConsolePicture(props)
{
const classes = useStyles();
const [categoryid,setCategoryId]=useState('')
const [subcategoryid,setSubCategoryId]=useState('')
const [categorylist,setCategoryList]=useState([])
const [subcategorylist,setSubCategoryList]=useState([])
const [dataSources,setDataSource]=useState([])
////////////////////////////////////////Multiple File Uploader//////////////////////////////////////////////////
   
const handleClick=async()=>{
      var formData=new FormData();
      formData.append("categoryid",categoryid)
      formData.append("subcategoryid",subcategoryid)
      dataSources.map((items,index)=>{
          formData.append("pictures"+index,items)

      })

    var config = {headers:{"content-type":"multipart/form-data"}}
    var result = await postDataAndImage('subconsolepicture/addnewconsolepicture',formData, config)
    if(result)
    {
        swal({
            title: "Sub Console Picture Submitted Successfully",
            icon: "success",
            dangerMode: true,
          })
    }


}

  const handleSave =async(files) => {
    setDataSource(files)
    console.log("Select files", files);
  };
  
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const handleCategoryChange=async(event)=>{
    setCategoryId(event.target.value)
    var body = {categoryid:event.target.value}
    var result = await postData('subcategories/Displaysubcategorybycategoryid',body)
    setSubCategoryList(result)

}

const fetchAllCategory=async()=>{
    var result = await getData('categories/displayAll')
   setCategoryList(result)

}

useEffect(function(){
    fetchAllCategory();
    
},[]);

const showCategory=()=>{
    return categorylist.map((item)=>{
        return(
        <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        )
    })

}

const showSubCategory=()=>{
    return subcategorylist.map((item)=>{
        return (
        <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
        )

    })

}



const handleReset=async()=>{
    setCategoryId('')
    setSubCategoryId('')
}


    return (
        <div className={classes.root}>
            <Paper elevation={2}>
            <div className={classes.subdiv}>
                <Grid container spacing={1} >
                    <Grid item xs={12} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <div style={{fontSize:23, fontWeight:650, letterSpacing:2, padding:18}}>
                            Sub Console Picture Interface

                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" className={classes.formControl} fullWidth>
        <InputLabel id="demo-simple-select-outlined-category">Category</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-category"
          id="demo-simple-select-outlined-category"
          //value={age}
         onChange={(event)=>handleCategoryChange(event)}
          label="Category"
        >

           {showCategory()}
          
        </Select>
      </FormControl>
     </Grid>

         <Grid item xs={12} sm={6}>
         <FormControl variant="outlined" className={classes.formControl} fullWidth>
        <InputLabel id="demo-simple-select-outlined-subcategory">Sub Category</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-subcategory"
          id="demo-simple-select-outlined-subcategory"
          //value={age}
          onChange={(event)=>setSubCategoryId(event.target.value)}
          label="Sub Category"
        >

            {showSubCategory()}
          
        </Select>
      </FormControl>
         </Grid>

                    <Grid item xs={12}>
                    <DropzoneArea
                    onChange={(files)=>handleSave(files)}
                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                    showPreviews={false}
                    maxFileSize={5000000}
                    filesLimit={10}
                    //onClose={()=>handleClose()}
                   />
                    </Grid>

                   <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <Button onClick={()=>handleClick()} fullWidth variant="contained" color="primary">Save</Button>
                    </Grid>

                    <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <Button fullWidth variant="contained" color="secondary" onClick={()=>handleReset()}>Reset</Button>
                  </Grid>

                </Grid>
            </div>
            </Paper>



        </div>

    )
}