import React,{useEffect} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import {postData,getData,ServerURL} from "../FetchNodeServices"
import {useSelector} from 'react-redux';
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import clsx from 'clsx';



const useStyles = makeStyles((theme) => ({
  mainmenu: {
    display: "flex",
    flexDirection: "row",
  },

    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      //display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    list: {
      width:380,
    },
    fullList: {
      width: 'auto',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }));
  

  export default function Header(props) {
    const classes = useStyles();
    var cart = useSelector((state)=>state.cart)
    var keys=Object.keys(cart)
    var values=Object.values(cart)
    var totalamt=values.reduce(calculation,0)

    function calculation(a,b){
      var price=b.offer>0?b.offer*b.qtydemand:b.price*b.qtydemand;
      return a+price
     }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [anchorMEl, setAnchorMEl] = React.useState(null);
    const [listCategory,setListCategory]=React.useState([])
    const [listSubCategory,setListSubCategory]=React.useState([])
  
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

/////////////////////////////////////////////////Drawer//////////////////////////////////////////////////////////////////////
   
    const [state, setState] = React.useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });


    const toggleDrawer = (anchor, open) => (event) => {
      if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setState({ ...state, [anchor]: open });
    };
  
    const list = (anchor) => (
      <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >

        <div style={{display:'flex',flexDiration:'row',width:345}}>
          <div style={{padding:5,display:'flex',alignItems:'center'}}>
            <ShoppingCart/>
            <div style={{fontSize:16,fontWeight:'bold',padding:3,letterSpacing:1,display:'flex',alignItems:'center'}}>{keys.length} items </div>
            <div style={{fontSize:16,fontWeight:'bold',padding:3,letterSpacing:1,display:'flex',justifyContent:'flex-end',alignItem:'center',width:230}}>
           Total Amount:<span >&#8377;</span> {totalamt}</div>
          </div>
         
        </div>
        <Divider/>
        {showCart()}
      
      </div>
    );


    const showCart=()=>{
      return values.map((item)=>{
        return (

          <div style={{display:'flex',flexDiration:'row'}}>
          <div style={{padding:5,display:'flex',alignItems:'center'}}>
            <img src={`${ServerURL}/images/${item.icon}`} width='120'/>

            <div style={{width:160,display:'flex',flexDirection:'column',justifyContent:'left',alignSelf:'center'}}>
            <div style={{fontSize:10,padding:2,fontweight:'bold'}}>
            <b>{item.subcategoryname.length<=20?item.subcategoryname.toUpperCase():item.subcategoryname.toUpperCase().substring(0,18)+".."}</b>
             </div>

           <div style={{fontSize:10,padding:2}}>

               Price: <s>&#8377;{item.price}</s> <span><b>&#8377; {item.offer}</b></span>


              </div>

           <div style={{fontSize:10,padding:2}}>
             
              <span style={{color:'green'}}><b>You Save</b></span><b> &#8377; {item.price-item.offer}</b>


            </div>

            <div style={{fontSize:10,padding:2}}>
               <span style={{color:'green'}}><b>Qty:</b></span><b>{item.qtydemand} x {item.offer>0? 
            (<><span> <span>&#8377;</span> {item.offer} </span></>): (<span> <span>&#8377;</span> {item.price} </span>)}</b>


            </div>
            </div>

            
           
            <div style={{fontSize:10,fontWeight:'bold',padding:3,letterSpacing:1,display:'flex',flexDirection:'column',justifyContent:'flex-end',alignContent:'center',width:80}}>
              {item.offer>0? (<div> <span>&#8377;</span> {item.offer*item.qtydemand} </div>): (<div> <span>&#8377;</span> {item.price*item.qtydemand} </div>)}
           </div>

          </div>
          </div>


        )

      })
        

    }
  
  
    ////////////////////////////////////////////////////////////////////////////////////////////////////////



    ///////////////////////////////////////////Menu Design/////////////////////////////////////////////

   
    const fetchAllCategory=async()=>{
      var result = await getData('categories/displayAll')
      setListCategory(result)
    }
    useEffect (function(){
      fetchAllCategory()
    },[]);



    const fetchSubCategory=async(cid)=>{
      var body = {categoryid:cid}
      var result = await postData('subcategories/Displaysubcategorybycategoryid',body)
      setListSubCategory(result);
    }
   


     
  const handleMenuClick=async(event)=>{
    setAnchorMEl(event.currentTarget);
    fetchSubCategory(event.currentTarget.value)


    
}



    const menuCategory=()=>{
      return listCategory.map((item)=>{
          return(
            <>
            <div style={{padding:5,display:'flex',alignItems:'center',flexDirection:'column'}}>
            <img src={`${ServerURL}/images/${item.icon}`} width='30'/>
            <Button style={{color:"#000",fontWeight:'bold'}} value={item.categoryid} onClick={(event)=>handleMenuClick(event)}>{item.categoryname} <KeyboardArrowDownIcon/></Button>
            </div>
            </>
          )
  })
  }

  const menuCategoryItems=()=>{
    return listSubCategory.map((item)=>{
      return(
        <div onClick={()=>props.history.push({'pathname':'/productview'},{'product':item})}>
        <MenuItem onClick={handleMenuClose}>{item.subcategoryname}</MenuItem>
        </div>
      )
  })
}
 





  /////////////////////////////////////////////End/////////////////////////////////////////////////////////////

    const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
    };
  
    const handleMobileMenuOpen = (event) => {
      setMobileMoreAnchorEl(event.currentTarget);
    };

    
      const handleClose = () => {
        setAnchorMEl(null);
      };

  
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
       
      </Menu>
    );
  
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton onClick={toggleDrawer('right', true)} aria-label="show 11 new notifications" color="inherit">
            <Badge badgeContent={keys.length} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );
  
    return (
      <div className={classes.grow}>
        <AppBar 
        //position="sticky" 
          style={{background:'#FAF800', position:"fixed", top: '0px', left: '0px'}}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap style={{fontWeight:'bold'}}>
              E Commerce
            </Typography>
          
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton onClick={toggleDrawer('right', true)} aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={keys.length} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <AppBar 
        //position="static"
          style={{background:"#FFF", position:"fixed", top: '60px' }}>
            <Toolbar variant='dense'>
              <Typography variant="h6" color='inharit'>
                Edit
              </Typography>

              <div style={{display:'flex',flexDirection:'row',marginLeft:100 }}>

            {menuCategory()}
            
            
      <Menu
        id="simple-menu"
        anchorEl={anchorMEl}
        keepMounted
        open={Boolean(anchorMEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{vertical:'bottom',horizontal:'center'}}
        transformOrigin={{vertical:'top',horizontal:'center'}}



      >
         {menuCategoryItems()}
        
       
      </Menu>
      </div>

            </Toolbar>
          </AppBar>
        {renderMobileMenu}
        {renderMenu}

        <div>
    
        <React.Fragment key={'right'}>

          <Drawer
            anchor={'right'}
            open={state['right']}
            onClose={toggleDrawer('right', false)}
          >
            {list('right')}
          </Drawer>
        </React.Fragment>
    
    </div>

      </div>
    );
  }