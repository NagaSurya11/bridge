import { List, ListItem, ListItemIcon, ListItemText, } from "@mui/material";
import SideNavData from "../../utils/constants/side-nav-data.constant";

import './side-nav.component.css';
import { useEffect, useState } from "react";
import CustomSvgIcon from "../../utils/components/icon.component";
import { useNavigate } from 'react-router-dom';

function SideNavComponent() {
    const [active, setActive] = useState(1);
    const navigate = useNavigate();
    /**
     *
     * @param {number} id
     */
    const handleClick = (id, routePath) => {
        setActive(id);
        navigate(routePath);
    }
    useEffect(() => {
        handleClick(active, SideNavData[active - 1].routePath);
    })
    return (
        <List className='list'>
            {SideNavData.map(navItem => (
                <ListItem className={`list-item ${active === navItem.listItemId ? 'selected' : ''}`}  key={navItem.listItemId} onClick={() => handleClick(navItem.listItemId, navItem.routePath)}>
                    <ListItemIcon className="list-item-icon"><CustomSvgIcon iconName={navItem.listItemIconName} key={navItem.listItemId} /></ListItemIcon>
                    <ListItemText>{navItem.listItemText}</ListItemText>
                </ListItem>
            ))}
        </List>
    )
}

export default SideNavComponent;