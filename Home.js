import React,{useState,useEffect,createRef} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Header from './Header'
import {ServerURL,getData} from "../FetchNodeServices"
import  Divider  from '@material-ui/core/Divider';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Paper from '@material-ui/core/Paper';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid'


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
        width:250,
        height:330,
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

    arrowstyle:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',

    }

   
}))

export default function Home(props) {
    const classes = useStyles();
    var consoleSlider=createRef()

    const [listCategory,setListCategories]=useState([])
    const [suboffers,setSubOffers]=useState([])

    var settings={
        dots:true,
        infinite:true,
        speed:1000,
        slidesToShow:1,
        slidesToScroll:1,
        autoplay:true,
        autoplaySpeed:2000,
        arrows:false,

    };

    var itemsettings={
        dots:false,
        infinite:true,
        speed:1000,
        slidesToShow:5,
        slidesToScroll:1,
        autoplay:true,
        autoplaySpeed:2000,
        arrows:false,
        

    };

    const handleNext=()=>{
     consoleSlider.current.slickNext()
   }
 
   const handlePrev=()=>{
    consoleSlider.current.slickPrev()

  }


    const handleConsoleList=(categoryid)=>{
        props.history.push({'pathname':'/consolelist'},{'categoryid':categoryid})

    }

    const handleProductList=(subcategoryid)=>{
        props.history.push({'pathname':'/consoleproductview'},{'subcategoryid':subcategoryid})

    }



        const fetchAllCategory=async()=>{
            var list = await getData('categories/displayAll')
            setListCategories(list)
          }
          useEffect (function(){
            fetchAllCategory()
            fetchsubcategoryoffers()
          },[]);


          const fetchsubcategoryoffers=async()=>{
            var list = await getData('subcategories/subcategoryoffers')
            setSubOffers(list)
          }


          const sslider=()=>{
            return listCategory.map((item)=>{
                return(
            <div>
               <img src={`${ServerURL}/images/${item.ad}`} width='100%' />
            </div>
                )
            })
        }


          const showCategories=()=>{
            return listCategory.map((item)=>{
                return(
                    <div>
            <div style={{display:'flex',border:'1px solid #dfe6e9', justifyContent:'center',alignItems:'center',flexDirection:'column',margin:5}}
             onClick={()=>handleConsoleList(item.categoryid)} 
             >
               
               <img src={`${ServerURL}/images/${item.icon}`} width='99%' />
               <div style={{fontSize:20,}}><b>{item.categoryname.length<=20?item.categoryname.toUpperCase():item.categoryname.toUpperCase().substring(0,18)+".."}</b></div>
               </div>
            </div>
                )
            })
        }



        const showSubCategoryOffers=()=>{
            return suboffers.map((item)=>{
               
                return(
               <div>
               <Paper elevation={3} className={classes.PaperStyle}>
                 <div onClick={()=>props.history.push({'pathname':'/consoleproductview'},{'product':item})}>
                 <img src={`${ServerURL}/images/${item.icon}`} width='150' className={classes.imageview} />
                 </div>
                 <div style={{fontSize:14,padding:10,fontweight:'bold'}}>
                <b>{item.subcategoryname.length<=20?item.subcategoryname.toUpperCase():item.subcategoryname.toUpperCase().substring(0,18)+".."}</b>
                 </div>
               <div style={{fontSize:16,padding:10}}>
                   Price: <s>&#8377;{item.price}</s> <span><b>&#8377; {item.offer}</b></span>
               </div>
               <div style={{fontSize:16,padding:10}}>
                   <span style={{color:'green'}}><b>You Save</b></span><b>&#8377; {item.price-item.offer}</b>
               </div>
               </Paper>
             </div>
            
                )
            })
        } 

        
     

      return (
          <div>
              <Header history={props.history}/>
              <div style={{display:'flex',justifyContent:'center',alignItems:'center', marginTop:'140px'}}>

              <IconButton className={classes.arrowstyle} style={{background:'#FAF800', opacity:0.7, position:'absolute', zIndex:1, left:5}}>
                  <ArrowBackIosIcon style={{color:'#FFF',fontSize:'large'}} onClick={()=>handleNext()}/>
              </IconButton>
                  <div style={{width:"96%"}}>
                      <Slider {...settings} ref={consoleSlider}>{sslider()}</Slider>
                  </div>
               <IconButton className={classes.arrowstyle} style={{background:'#FAF800', opacity:0.7, position:'absolute', zIndex:1, right:5}}>
                  <ArrowForwardIosIcon style={{color:'#FFF',fontSize:'large'}} onClick={()=>handlePrev()}/>
              </IconButton>              
          </div>



              <div className={classes.root}>
              <div style={{display:'flex',flexDirection:'column'}}>
                  <div style={{fontSize:30,
                     color:'#636e72',
                      fontWeight:'normal',
                       letterSpacing:'3.9px',
                        fontFamily:'Georgia, Times, "Times New Roman",serif',
                        justifyContent:'center',
                        display:'flex',
                        padding:10,

                        }}>
                        
                      TOP CATEGORIES
                  </div>

                  <Divider style={{marginTop:5,marginBottom:5}}/>

              <div style={{display:'flex',flexDirection:'row',marginTop:'5'}}>
                  {showCategories()}
                </div>

              </div>


              <div style={{display:'flex',flexDirection:'column'}}>
              <div style={{fontSize:30,
                     color:'#636e72',
                      fontWeight:'normal',
                       letterSpacing:'3.9px',
                        fontFamily:'Georgia, Times, "Times New Roman",serif',
                        justifyContent:'center',
                        display:'flex',
                        padding:10,
                        marginTop:25,

                        }}>
                  
                      TOP OFFERS CONSOLE
                  </div>

                  <Divider style={{marginTop:5,marginBottom:5}}/>

                  <Grid item xs={12}>
                  <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                  <IconButton className={classes.arrowstyle} style={{background:'#FAF800', opacity:0.7, position:'absolute', zIndex:1, left:5}}>
                  <ArrowBackIosIcon style={{color:'#FFF',fontSize:'large'}} onCLick={()=>handleNext()}/>
                  </IconButton>
                  <div style={{width:"98%"}}>
                      <Slider {...itemsettings} ref={consoleSlider}>{showSubCategoryOffers()}</Slider>
                  </div>
                   <IconButton className={classes.arrowstyle} style={{background:'#FAF800', opacity:0.7, position:'absolute', zIndex:1, right:8}}>
                  <ArrowForwardIosIcon style={{color:'#FFF',fontSize:'large'}} onClick={()=>handlePrev()}/>
                 </IconButton>           
                  </div> 
                  </Grid>
              </div>
              </div>
          </div>
      )   

}