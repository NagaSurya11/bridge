import React, { useEffect, useState } from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import IconImportMap from '../constants/icon.import.map';
/**
 * @param {{iconName: string, props: object}} param0
 */
const CustomSvgIcon = ({ iconName, ...props }) => {
  const [IconComponent, setIconComponent] = useState(null);
  useEffect(() => {
    // Dynamically import the SVG file
    if (IconImportMap[iconName]) {
      setIconComponent(IconImportMap[iconName]);
    }else {
      throw Error(`Icon ${iconName} not found`);
    }
  }, [iconName]);
  return (
    <SvgIcon
      {...props}
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
      }}
      component="div"
    >
      <img src={IconComponent} alt={iconName}></img>
    </SvgIcon>
  )
};


export default CustomSvgIcon;