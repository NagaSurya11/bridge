

import { Button, Chip, IconButton, LinearProgress, Skeleton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import RotateLeftSharpIcon from '@mui/icons-material/RotateLeftSharp';
import './bridge.component.css';
import TokenInputSelectorComponent from '../token-input-selector/token-input-selector.component';
import { useEffect, useState } from 'react';
import SwapVertOutlinedIcon from '@mui/icons-material/SwapVertOutlined';
import WalletIcon from '@mui/icons-material/Wallet';
import StarIcon from '@mui/icons-material/Star';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import { useDispatch, useSelector } from 'react-redux';
import BridgeRepository from '../../repositories/bridge.repository';
import { actions } from '../../features/reducer';
import { useNavigate } from 'react-router-dom';
import SwapHorizontalCircleOutlinedIcon from '@mui/icons-material/SwapHorizontalCircleOutlined';

function BridgeComponent() {
    const quoteTransferState = useSelector((state) => state['QuoteTransfer']);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [fromAmount, setFromAmount] = useState('0');
    const [toAmount, setToAmount] = useState('0');
    const [lastFromAmount, setLastFromAmount] = useState('0');
    const [timeoutId, setTimeoutId] = useState(null);
    const [fromUSDValue, setFromUSDValue] = useState('0');
    const [toUSDValue, setToUSDValue] = useState('0');
    const [gasFee, setGasFee] = useState(0);
    const [noOfSwaps, setNoOfSwaps] = useState(0);
    const navigate = useNavigate();
    /**
     *
     * @param {string} value
     */
    function removeTrailingZeros(value) {
        let arr = value.split('');
        let result = '';
        let idx = 0;
        // remove trailing zeros
        while (idx < arr.length - 1 && arr[idx] === '0' && arr[idx + 1] !== '.') {
            idx++;
        }
        while (idx < arr.length) {
            result += arr[idx++];
        }
        return result;
    }

    /**
     *
     * @param {string} value
     * @param {number} decimals
     * @returns
     */
    function addPaddedZeros(value, decimals) {
        return Number(value) * (10 ** decimals);
    }
    /**
     *
     * @param {string} value
     */
    function handleAmountChange(value) {
        if (/^-?\d*\.?\d*$/.test(value)) {
            setFromAmount(removeTrailingZeros(value));
        }
    }

    function isEmptyObject(object) {
        return Object.keys(object).length === 0;
    }
    function resetData() {
        setFromUSDValue('0');
        setToUSDValue('0');
        setToAmount('0');
        setGasFee(0);
        setNoOfSwaps(0);
    }
    function getExchangeRate() {
        const fromSymbol = quoteTransferState?.from?.symbol;
        const toSymbol = quoteTransferState?.to?.symbol;
        const fromValue = Number(fromAmount);
        const toValue = Number(toAmount);
        if (fromValue && toValue && fromSymbol && toSymbol) {
            return `1 ${fromSymbol} = ${1 / fromValue * toValue} ${toSymbol}`;
        } else {
            return '_ _ = _ _ . _ _ _ _ _ _';
        }
    }
    async function Quote(quoteTransferState) {
        if (fromAmount === '0') {
            resetData();
            return;
        }
        setFromUSDValue(undefined);
        setToUSDValue(undefined);
        setToAmount(undefined);
        setLoading(true);
        let value = removeTrailingZeros(fromAmount);
        let srcAmount = addPaddedZeros(value, quoteTransferState.from['decimals'])
        const response = await BridgeRepository.Quotes(
            quoteTransferState.from.chainId, quoteTransferState.from.address,
            srcAmount, quoteTransferState['to'].chainId, quoteTransferState['to'].address, quoteTransferState.slippage
        );
        if (response.length > 0) {
            const obj = response[0];
            setFromUSDValue(obj.srcQuoteTokenUsdValue);
            setToUSDValue(obj.dstQuoteTokenUsdValue);
            setToAmount(obj.dstQuoteTokenAmount);
            setGasFee(obj.bridgeFee);
            setNoOfSwaps(obj.transactionCounts);
        } else {
            resetData();
        }
        setLoading(false);
    }
    async function handleSwap() {
        if (loading)
            return;
        let from = {... quoteTransferState.from};
        let to = {... quoteTransferState.to};
        if (!isEmptyObject(from) && !isEmptyObject(quoteTransferState.to)) {
            dispatch(actions.SET_FROM_QUOTE(quoteTransferState.to));
            dispatch(actions.SET_TO_QUOTE(from));
            let temp = fromUSDValue;
            setFromUSDValue(toUSDValue);
            setToUSDValue(temp);
            await Quote({from: {...to}, to: {...from}});
            setLastFromAmount(fromAmount);
        }
    }
    useEffect(() => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        if (fromAmount !== lastFromAmount) {
            const newTimeoutId = setTimeout(() => {
                Quote(quoteTransferState);
                setLastFromAmount(fromAmount);
            }, 1500);
            setTimeoutId(newTimeoutId);
        }
    }, [quoteTransferState, fromAmount, fromUSDValue, toUSDValue]);
    return (
        <>
            <div className="ct-header">
                <span className='ct-header-text'>Transfer</span>
                <IconButton className='ct-header-icon-button' onClick={() => navigate('/settings')}>
                    <SettingsIcon />
                </IconButton>
                <IconButton className='ct-header-icon-button'>
                    <ShareOutlinedIcon />
                </IconButton>
                <IconButton className='ct-header-icon-button' onClick={() => Quote(quoteTransferState)}>
                    <RotateLeftSharpIcon />
                </IconButton>
            </div>
            <div className="ct-main">
                <div className='ct-main-r1'>
                    <span className='balance-text'>
                        Balance: 0
                    </span>
                </div>
                <TokenInputSelectorComponent
                    label='From (Quote)'
                    handleAmountChange={handleAmountChange}
                    loading={loading}
                    disabled={loading || (isEmptyObject(quoteTransferState['from']))}
                    inputValue={fromAmount}
                    USDValue={fromUSDValue}
                    inputKey='from'
                    tokenData={{ ...quoteTransferState['from'] }}
                    isNotSelected={isEmptyObject(quoteTransferState['from'])}
                />
                <IconButton onClick={handleSwap}>
                    <SwapVertOutlinedIcon />
                </IconButton>
                <TokenInputSelectorComponent
                    label='To (Quote)'
                    disabled={true}
                    loading={loading}
                    inputValue={toAmount}
                    USDValue={toUSDValue}
                    inputKey='to'
                    isNotSelected={isEmptyObject(quoteTransferState['to'])}
                    tokenData={{
                        ...quoteTransferState['to'],
                        chainId: isEmptyObject(quoteTransferState['to']) ? quoteTransferState['from'].chainId : quoteTransferState['to'].chainId
                    }}
                />
                <div className='rate-details'>
                    <span className='label'>Exchange Rate</span>
                    {loading ? <Skeleton variant='text' sx={{ fontSize: 'x-small', width: '8vw' }} /> :
                        <span className='value'>{getExchangeRate()}</span>}
                </div>
                <div className='rate-details'>
                    <span className='label'>Slipage</span>
                    {!quoteTransferState.slippage ? <span className="value">_._ %</span> :
                        <span className='value'>{quoteTransferState.slippage} %</span>}
                </div>
                {loading ? <div className='bridge-info-loading'>
                    <span className='label'>Searching for route...</span>
                    <LinearProgress />
                </div> :
                    <div className='bridge-info'>
                        <span className='label'>Bridge</span>
                        <div className='content'>
                            <Chip icon={<StarIcon />} color='primary' variant='outlined' label='Best' />
                            <Chip icon={<LocalGasStationIcon />} color='primary' variant='outlined' label={`$ ${Number(gasFee.toFixed(4))}`} />
                            <Chip icon={<SwapHorizontalCircleOutlinedIcon />} color='primary' variant='outlined' label={noOfSwaps} clickable />
                        </div>
                    </div>}
            </div>
            <Button id='action-button' variant="contained" startIcon={<WalletIcon />}>
                Connect Wallet
            </Button>
        </>
    )
}

export default BridgeComponent;