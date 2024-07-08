import { Box, IconButton, InputBase, List, ListItem, Paper, Skeleton } from "@mui/material";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';

import './quote-selector.component.css';
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BridgeRepository from "../../repositories/bridge.repository";
import { actions } from "../../features/reducer";
import Icons from "../../utils/enums/icon.enum";


function QuoteSelectorComponent() {
    const supportedChains = useSelector((state) => state.Chains);
    const [Tokens, setTokens] = useState([]);
    const [filteredTokens, setFilteredTokens] = useState([]);
    const [Chains, setChains] = useState([]);
    const dispatch = useDispatch();
    const [searchparams, setSearchParams] = useSearchParams();
    const [chainId, setChainId] = useState(searchparams.get('chainId'));
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);
    const [searchText, setSearchText] = useState('');
    function getChainNameFromChainId(chainId) {
        if (chainId == 'all')
            return;
        for (let chain of supportedChains) {
            if (chain.chainId === chainId) {
                return chain.name;
            }
        }
    }
    function loadFirst4Chains(chainId) {
        let data = [];
        for (let i = 0; i < 4 && supportedChains.length > 3; i++) {
            data.push(supportedChains[i]);
        }
        let isSet = false;
        for (let i = 0; i < data.length; i++) {
            let chain = data[i];
            if (chain.chainId === chainId) {
                let temp = data[0];
                data[0] = chain;
                data[i] = temp;
                isSet = true;
            }
        }
        if (!isSet) {
            for (let chain of supportedChains) {
                if (chain.chainId === chainId) {
                    data[0] = chain;
                }
            }
        }
        setChains(data);
    }
    function handleExpandOrCollapse() {
        function hasChainId(chainId) {
            for (let chain of Chains) {
                if (chain.chainId === chainId)
                    return true;
            }
            return false;
        }
        if (!expanded) {
            let data = Chains;
            supportedChains.forEach(chain => {
                if (!hasChainId(chain.chainId)) {
                    data.push(chain);
                }
            });
            setChains(data);
            setExpanded(true);
        } else {
            loadFirst4Chains(chainId);
            setExpanded(false);
        }
    }
    /**
     *
     * @param {'all' | number} value
     */
    async function handleChainChange(value) {
        setChainId(value);
        setSearchParams({ inputType: searchparams.get('inputType'), chainId: value });
        loadFirst4Chains(value);
        setLoading(true);
        setExpanded(false);
        const data = await BridgeRepository.getTokenData(value, getChainNameFromChainId(value));
        if (data.length == 0)
            dispatch(actions.SHOW_ALERT({severity: 'error', message: 'Try with different Data!'}));
        setTokens(data);
        search(searchText, data);
        setLoading(false);
    }
    /**
     *
     * @param { string } value
     * @param {Array<any>} tokens
     */
    function search(value, tokens) {
        setSearchText(value);
        setFilteredTokens([...tokens].filter((token => token?.address?.toLowerCase()?.includes(value)
            || token?.name?.toLowerCase()?.includes(value))));
    }

    function navigateToQT() {
        navigate('/');
    }

    function handleTokenSelection(token) {
        if (searchparams.get('inputType') === 'to') {
            dispatch(actions.SET_TO_QUOTE({...token}));
            navigateToQT();
        } else if (searchparams.get('inputType') === 'from'){
            dispatch(actions.SET_FROM_QUOTE({...token}));
            navigateToQT();
        }
    }
    useEffect(() => {
        async function initData() {
            setLoading(true);
            if (supportedChains.length == 0) {
                dispatch(actions.SET_SUPPORTED_CHAINS(await BridgeRepository.getSupportedChains()));
            } else {
                loadFirst4Chains(chainId);
            }
            if (chainId && supportedChains.length > 0) {
                await handleChainChange(chainId === 'all' ? 'all' : parseInt(chainId));
            }
            setLoading(false);
        }
        initData();
    }, [supportedChains]);
    return (
        <>
            <Box className='qt-header'>
                <IconButton className='qt-header-icon-button' onClick={navigateToQT}>
                    <KeyboardBackspaceIcon />
                </IconButton>
                <span className="text">Select a token</span>
            </Box>
            <Paper
                className='qt-search'
                component="form"
            >
                <InputBase
                    placeholder="Token name or address"
                    value={searchText}
                    onChange={(e) => search(e.target.value, Tokens)}
                    disabled={loading}
                />
                <IconButton type="button">
                    <SearchIcon />
                </IconButton>
            </Paper>
            <List className={`qt-token-list ${expanded ? 'expanded' : 'collapsed'}`}>
                <ListItem onClick={() => handleChainChange('all')} className={`qt-token-list-item all ${'all' === chainId ? 'selected' : ''}`}>All</ListItem>
                {Chains.map((item) => (
                    <ListItem onClick={() => handleChainChange(item.chainId)} className={`qt-token-list-item ${item.chainId == chainId ? 'selected' : ''}`}>
                        <img className='token-image' src={Icons[item.name]} />
                        <span className="token-name">{item.name}</span>
                    </ListItem>
                ))}
            </List>
            <div className={`qt-ec-btn ${expanded ? 'expanded' : 'collapsed'}`} onClick={handleExpandOrCollapse}>
                <span className="text">{expanded ? 'Less' : 'More'}</span>
                {expanded ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
            </div>
            {!loading && filteredTokens.length === 0 ? (
                <div className={`no-data-container ${expanded ? 'expanded' : 'collapsed'}`}>
                    No Tokens Available Try Different One!
                </div>
            ) : <List className={`qt-chain-list ${expanded ? 'expanded' : 'collapsed'}`}>
                {!loading ? filteredTokens.map(item => (
                    <ListItem className="qt-chain-list-item" onClick={() => handleTokenSelection(item)}>
                        <div className="details">
                            <img className='chain-image' src={item.logoURI} />
                            <div className="chain-data">
                                <span className="chain-name">{item.symbol}</span>
                                <span className="token-name">{item.chainName ? item.chainName : ''}</span>
                            </div>
                        </div>
                        <div className="balance">0</div>
                    </ListItem>
                )) : ['', '', ''].map(() => (
                    <Skeleton className="qt-chain-list-item loader" variant="rectangular" />
                ))}
            </List>}

        </>
    )
}

export default QuoteSelectorComponent;