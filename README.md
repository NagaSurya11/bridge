# Bridge MERN Task



Setup

    1. npm i to install all libraries
    2. npm run watch to build continuously on changes
    3. npm run start ro start the express server
    4. both FE and BE are hosted as express app using React Server Side Rendering
    5. hit `localhost:3000` to launch app
    6. apis are available at /api whereas default routes render react app.


Developed So Far

    1. The initial page is loaded with bridge tokens page
    2. You need to select the token
    3. When the select token is pressed FE will first fetch the supportedChains via /api/supportedChains and make the first one as initial or for token change it will get from the query params of react route.
    4. When you chainge the chain type based on chainId it will fetch the available tokens from api /api/tokens>chainId={chainID}&chainName={chainName} and it will get displayed as list from that you can able to select.
    5. Using settings icon we can able to change the slippage percentage.
    6. When the from and to quotes are selected and when the user enters the amount of from quotes after 1.5 secs if the previos value is not the current value it will hit the post api/quote and fetch the brigde details the gas fee is shown for the transactions
    7. As for now only the first bridge transactions is taken for display in quote transfer page and its gas fee.
    8. Written jest Unit testcases for server side some apis.


Note:

    I don't have the crypto currency balance to proceed further with buildTx End to End flow any how i have build the api for buildTx and checked validations
