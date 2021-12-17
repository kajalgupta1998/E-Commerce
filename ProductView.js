import React, {useState,useEffect,createRef} from "react"
import Grid from '@material-ui/core/Grid'
import {ServerURL, postData} from '../FetchNodeServices'
import Header from "./Header"
import { makeStyles } from '@material-ui/core/styles';
import QtySpinner from "./QtySpinner";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Slider from "react-slick";
import {useDispatch,useSelector} from 'react-redux';


const useStyles = makeStyles((theme) => ({
   

textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));


export default function ProductView(props){
    const classes = useStyles();
    var consoleSlider=createRef()

    var settings={
      dots:false,
      infinite:true,
      speed:1000,
      slidesToShow:3,
      slidesToScroll:1,
     // autoplay:true,
      autoplaySpeed:2000,
      arrows:false,

  };
    
    var item = props.history.location.state.product
 
    const [consolepictures,setConsolePictures]=useState([])
    const [getImage,setImage]=useState(item.icon)
    const [pageRender,setPageRender]=useState(false) 
    var dispatch = useDispatch()
    var cart = useSelector(state=>state.cart)

    
  const fetchProductPictures=async()=>{
    var body={subcategoryid:item.subcategoryid}
    var result=await postData('subconsolepicture/displayallproductpictures',body)
    setConsolePictures(result)

  }


   useEffect(function(){
     fetchProductPictures();

   },[])


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


   const ProductDetails=()=>{
       var price=item.offer>0?item.offer:item.price
       var v=cart[item.subcategoryid]||0
       var qty=0
       if(v!=0)
       { qty=cart[item.subcategoryid].qtydemand }
       return(<div>
           <div style={{fontSize:20,fontWeight:'bold',padding:10,letterSpacing:1}}>
           {item.subcategoryname}
           </div>

           <div style={{fontSize:16,padding:10}}>
           Price:<s>&#8377; {item.price}</s>{" "}
           <span style={{color:'green'}}>
            <b>&#8377; {item.offer}</b>
           </span>
           </div>

                        <div style={{padding:10}}>
                            {(item.stock)>0?<div>Availability: {(item.stock)} in Stock</div>:<div>Not available this time</div>}
                        </div>    
                        <div style={{padding:10}}>
                            <QtySpinner value={qty} onChange={(value)=>handleQtyChange(value,item)} />
                        </div>
                           
       </div>)
   }

   const showConsolePictures=()=>{
     return consolepictures.map(function(citem,index){
       return <div style={{display:'flex',justifyContent:'center',alignItems:'center',outline:'none',flexDirection:'column'}}>
          <div style={{display:'flex',justifyContent:'center',alignItems:'center',outline:'none',width:70,height:70,border:'2px solid #dcdde1',borderRadius:5,margin:2,cursor:'pointer',flexDirection:'column'}}
          onMouseEnter={()=>setImage(citem.image)}
          >
            <img src={`${ServerURL}/images/${citem.image}`} width="56" height="56" style={{display:'flex', flexDirection:'column'}}/>

          </div>

       </div>
       
     })
   }

   const handleNext=()=>{
     consoleSlider.current.slickNext()

   }
 
   const handlePrev=()=>{
    consoleSlider.current.slickPrev()

  }

    return (
        <div>
            <Header history={props.history}/>
            <div style={{padding:20, marginTop:'140px'}}>
                <Grid container spacing={1}>

                   
                     <Grid item xs={12} sm={6}>
                     <div style={{padding:15, display:'flex', justifyContent:'center',alignItems:'center'}}>
                        <img src={`${ServerURL}/images/${getImage}`} width='300' height='300' style={{border:'1px solid #dfe6e9'}}/>
                     </div>

                        {consolepictures.length>=1 && consolepictures<=4?(
                        <div style={{padding:"30px 1-px",display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                          <div style={{width:325}}>
                           <Slider {...settings}>
                             {showConsolePictures()}

                           </Slider>
                          </div>
                        </div>):(
                          <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                          <div style={{marginLeft:10,fontSize:'small'}}>
                            <ArrowBackIosIcon onClick={()=>handleNext()}/>
                          </div>
                        <div style={{padding:"30px 1-px",display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                          <div style={{width:325}}>
                           <Slider {...settings} ref={consoleSlider}>
                             {showConsolePictures()}


                           </Slider>
                          </div>
                        </div>
                        <div style={{marginRight:10,fontSize:'small'}}>
                            <ArrowForwardIosIcon onClick={()=>handlePrev()}/>
                          </div>
                        </div>)}

                   
                        
                       </Grid>

                        <Grid item xs={12} sm={4}>
                            {ProductDetails()}
                        </Grid> 
                </Grid>
            </div>

            
        </div>
    )

   }