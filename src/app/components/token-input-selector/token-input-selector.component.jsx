import { useEffect, useState } from 'react';
import './token-input-selector.component.css';
import { Skeleton, TextField } from '@mui/material';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { useNavigate } from 'react-router-dom';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import CurrencyRepository from '../../repositories/currency.repository';


/**
 *
 * @param {{
 *  label: string, handleAmountChange: (value: number) => void, disabled: boolean, isNotSelected: boolean
 *  loading: boolean, tokenData: {symbol: string, chainId: number, chainName: string, symbol: string, logoURI: string},
 *  handleTokenChange: () => void, inputKey: string, inputValue: string, USDValue: string
 * }} param0
 * @returns
 */
function TokenInputSelectorComponent({
    loading, label, inputValue, handleAmountChange, disabled, tokenData, handleTokenChange, inputKey, isNotSelected, USDValue }) {
    const navigate = useNavigate();
    function handleNavigate() {
        navigate(
            encodeURI(`/selectquote?inputType=${inputKey}&chainId=${tokenData.chainId ?? 1}`)
        );
    }
    useEffect(() => {
    }, [inputValue, tokenData, USDValue]);
    return (
        <div className='token-amount-details'>
            <div className='amount-details'>
                <span className='label'>{label}</span>
                <TextField type='text'
                    className='input' value={inputValue} disabled={disabled}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    placeholder={0.0} />
                {!USDValue ? <Skeleton variant='text' sx={{ fontSize: 'x-small', width: '100%' }} />
                    : <span className='in-doller'>= $ {Number(USDValue).toFixed(4)}</span>}
            </div>
            <div className='token-button' onClick={handleNavigate}>
                {isNotSelected ?
                    <>
                        <QuestionMarkIcon />
                        <span className='select-token-txt'>Select Token</span>
                    </> :
                    <>
                        <img className='token-image' src={tokenData.logoURI} />
                        <div className='token-detail'>
                            <span className='token-name'>{tokenData.symbol}</span>
                            <span className='chain-name'>{tokenData.chainName}</span>
                        </div>
                    </>
                }
                <KeyboardArrowDownOutlinedIcon />
            </div>
        </div>
    );
}

export default TokenInputSelectorComponent;