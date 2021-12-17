import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from './Header'
import {postData,ServerURL} from "../FetchNodeServices"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Paper from '@material-ui/core/Paper';
import QtySpinner from "./QtySpinner";
import {useDispatch} from 'react-redux';


const useStyles = makeStyles((theme) => ({
    
    root:{
        padding:10,
        display:'flex',
        flexDirection:'column',
    },

    PaperStyle:{
        justifyContent:'flex-start',
        display:'flex',
        padding:10,
        width:240,
        height:350,
        margin:10,
        borderRadius:10,
        flexDirection:'column'

    },

    imageview:{
        height:160,
        width:160,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        margin:2,
        cursor:'pointer',

        "&:hover":{
        transform:'scale(1.25)',         
        transition:"all 0.5s ease 0s",
        }

    },

arrowstyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}))


export default function ConsoleList(props) {
    const classes = useStyles();
    
  
    const [listConsole,setListConsole]=useState([]) 
    const [pageRender,setPageRender]=useState(false) 

     var categoryid = props.history.location.state.categoryid;
     var dispatch = useDispatch()
  

      const handleQtyChange=(value,item)=>{

        if(value==0){
          dispatch({type:'REMOVE_CART', payload:[item.subcategoryid]})
        }
        else{
        item['qtydemand']=value;
        dispatch({type:'ADD_CART', payload:[item.subcategoryid,item]})
       
      }
      setPageRender(!pageRender)
    }
   
      useEffect (function(){
        fetchsubcategory()
      },[]);


      const fetchsubcategory=async()=>{
          var body = {'categoryid':categoryid}
        var list = await postData('subcategories/Displaysubcategorybycategoryid',body)
        setListConsole(list)
      }


    const showConsole=()=>{
        return listConsole.map((item)=>{
           
            return(
                <div>
        <div style={{display:'flex', 
        justifyContent:'center',alignItems:'center',flexDirection:'column',padding:10,margin:5,marginTop:'140px'}}>
           <Paper elevation={3} className={classes.PaperStyle}>
             <div onClick={()=>props.history.push({'pathname':'/productview'},{'product':item})} className={classes.imageview} >
             <img src={`${ServerURL}/images/${item.icon}`} width='150' className={classes.imageview} />
             </div>
             <div style={{fontSize:14,padding:10,fontweight:'bold'}}>
            <b>{item.subcategoryname.length<=20?item.subcategoryname.toUpperCase():item.subcategoryname.toUpperCase().substring(0,18)+".."}</b>
             </div>
           <div style={{fontSize:16,padding:10}}>
               Price:<s>&#8377;{item.price}</s> <span><b>&#8377; {item.offer}</b></span>
           </div>
           <div style={{fontSize:16,padding:10}}>
               <span style={{color:'green'}}><b>You Save</b></span><b>&#8377; {(item.price-item.offer)}</b>
            </div>

               <div style={{justifyContent:'center',display:'flex',alignItems:'center'}}>
                <QtySpinner value={0} onChange={(value)=>handleQtyChange(value,item)}/>
                </div>
          
           </Paper>

           </div>


        </div>
           )
        })
    } 

    return (
        <div>
            <Header history={props.history}/>

           <div style={{display:'flex',flexDirection:'row',justifyContent:'center',padding:8,flexWrap:'wrap'}}>
             {showConsole()}
            </div>

              </div>
             

         
      )   

}
