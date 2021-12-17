import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { ShoppingCart } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({

  small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        background:'#FAF800',
    
  },
  
}));

export default function QtySpinner(props) {
  const classes = useStyles();
  const [value,setValue]=useState(props.value)

  const handleIncreament=()=>{
    var c = value+1
    setValue(c)
    props.onChange(c)

  }

  const handleDecreament=()=>{
      var c = value-1
      if(c>=0)
      {
      setValue(c)
      props.onChange(c)
      }
  }


  return (
    <div>

        {value==0?(<div style={{display:'flex',alignItems:'center',flexDirection:'row'}}>
        <Button fullWidth variant='contained' onClick={()=>handleIncreament()} style={{fontSize:12,background:'#FAF800',color:'#FFF',width:180,}}><span>
        <ShoppingCart style={{marginRight:15}}/></span>ADD TO CART</Button></div>):(<div style={{display:'flex',alignItems:'center',flexDirection:'row'}}>
        <Avatar className={classes.small} style={{marginRight:15,background:'#FAF800'}} onClick={()=>handleDecreament()}>-</Avatar>
     <div style={{display:'flex', justifyContent:'center', fontSize:16,fontWeight:'bold', width:15}}>{value}</div>
      <Avatar className={classes.small} style={{marginLeft:15}} onClick={()=>handleIncreament()}>+</Avatar></div>)}

    </div>

   
  );
}
