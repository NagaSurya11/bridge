import { Box, Button, ButtonGroup, IconButton } from "@mui/material";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import './settings.component.css';
import { useDispatch, useSelector } from "react-redux";
import { availablePercentage } from "../../utils/constants/settings.constant";
import { actions } from "../../features/reducer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function SettingsComponent() {
    const slippage = useSelector(state => state.QuoteTransfer.slippage);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    function handlePercentageChange(percent) {
        dispatch(actions.SET_SLIPPAGE(percent));
    }
    useEffect(() => {
    }, [slippage]);
    return (
        <>
            <Box className='st-header'>
                <IconButton className='icon-button' onClick={() => navigate('/')}>
                    <KeyboardBackspaceIcon />
                </IconButton>
                <span>Settings</span>
            </Box>
            <Box className='st-main'>
                <span className="header">
                    Slippage Tolerence
                </span>
                <span className="content">
                    Your transaction will revert if the price changes by more than the below percentage. Please note: this slippage tolerance exclude AMM bridges' slippage as their slippage settings are outside of XY Finance's jurisdiction.
                </span>
                <ButtonGroup variant="outlined" aria-label="Basic button group">
                    {availablePercentage.map(percentage => (
                        <Button className={slippage === percentage ? 'selected' : ''}
                            onClick={() => handlePercentageChange(percentage)}
                        >{percentage}</Button>
                    ))}
                </ButtonGroup>
            </Box>
        </>
    )
}

export default SettingsComponent;