import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {getData, postData, postDataAndImage} from "./FetchNodeServices";
import { makeStyles } from '@material-ui/core/styles';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import renderHTML from 'react-render-html';
import {isBlank} from './Checks';
import swalhtml from '@sweetalert/with-react';
import IconButton from '@material-ui/core/IconButton';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://www.numericinfosystems.in/">
        Numeric Infosystem Pvt. Ltd.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AdminSignup(props) {
  const classes = useStyles();
 
  const [adminName, setAdminName]=useState('')
  const [emailAddress,setEmailAddress]=useState('')
  const [password,setPassword]=useState('')
  const [icon,setIcon]=useState({bytes:'', file:'/noimage.webp'})

  const handleIcon=(event)=>{
    setIcon({bytes:event.target.files[0],
    file:URL.createObjectURL(event.target.files[0])})

}

const handleClick=async()=>{
   
    var error=false
    var msg="<div>"
    
    if(isBlank(adminName))
    {error=true
        msg+="<font color='#c0392b'><b>Name should not be blank..</b></font><br>"
    }
    if(isBlank(emailAddress))
    {error=true
        msg+="<font color='#c0392b'><b>Email should not be blank..</b></font><br>" 
    }
    if(isBlank(password))
    {error=true
        msg+="<font color='#c0392b'><b>Password should not be blank..</b></font><br>"
    }
    if(isBlank(icon.bytes))
    {error=true
        msg+="<font color='#c0392b'><b>Please select Passport Photo..</b></font><br>"
    }
    
    msg+="</div>"

    if(error)
    {
        swalhtml(renderHTML(msg))
    }


    var formData = new FormData()
    formData.append("adminname",adminName)
    formData.append("email",emailAddress)
    formData.append("password",password)
    formData.append("icon",icon.bytes)
    var config = {headers:{"content-type":"multipart/form-data"}}
    var result = await postDataAndImage('admin/addnewadmin',formData, config)
    if(result)
    {
        props.history.push({pathname:'/adminlogin'})
    }
}


  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          
           <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Admin Name"
              name="name"
              autoComplete="name"
              autoFocus
              onChange={(event)=>setAdminName(event.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(event)=>setEmailAddress(event.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event)=>setPassword(event.target.value)}
            />
                    <Grid item xs={12} sm={6}>
                    <span style={{fontSize:15,fontWeight:400}}>Upload Passport Photo
                    <input onChange={(event)=>handleIcon(event)} accept="image/*" className={classes.input} id="icon-button-file" type="file" /></span>
                    </Grid>
                    <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <Avatar variant="rounded" src={icon.file} style={{width:60,height:60}}/>
                    </Grid>

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={()=>handleClick()}
            >
              Sign up
            </Button>
            
            <Box mt={5}>
              <Copyright />
            </Box>
  
        </div>
      </Grid>
    </Grid>
  );
}