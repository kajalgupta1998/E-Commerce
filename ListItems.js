import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import CategoryInterface from './CategoryInterface'
import DisplayAllCategory from './DisplayAllCategories'
import SubCategory from './SubCategory'
import Displayallsubcategory from './DisplayAllSubCategories'
import SubConsolePicture from './SubConsolePicture'


 export default function ListItems(props)
 {
     const handleClick=(v)=>{
         props.setComponent(v)
     }


     return(
         <div>
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Categories" onClick={()=>handleClick(<CategoryInterface/>)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="List Categories" onClick={()=>handleClick(<DisplayAllCategory/>)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Sub Categories" onClick={()=>handleClick(<SubCategory/>)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="List Sub Categories" onClick={()=>handleClick(<Displayallsubcategory/>)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Sub Console Picture" onClick={()=>handleClick(<SubConsolePicture/>)} />
    </ListItem>
   </div>
</div>
);
}