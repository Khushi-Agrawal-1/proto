/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState } from 'react';
import { Button, Typography } from 'antd';
import { useCountInterval, useMutationObserver } from './hooks';
import client from './hooks/socketClient';
import { TIME_INTERVAL } from './constants';
import xtype from 'xtypejs'
// import { w3cwebsocket as W3CWebSocket } from "websocket";


const { Title, Text } = Typography;
// const client = new W3CWebSocket('ws://127.0.0.1:8000');

function App() {

  // function onButtonClick = (value) => {
  //   client.send(JSON.stringify({
  //     type: "message",
  //     msg: value                                                                                                                                                                                                                                                                                                                                  
  //   }));
  // }

  useEffect(
    () => {
      client.onopen = () => {
        console.log('WebSocket Client Connected');
        client.send("Hello server!");
      }; 

      // client.onmessage = (message) => {
      //   const dataFromServer = JSON.parse(message.data);
      //   console.log('got reply', dataFromServer);
      // }
    }
  );





  // MUTATION OBSERVER
  const [isCounterActive, setIsCounterActive] = useState(false);
  const [isMutationObserverActive, setIsMutationObserverActive] = useState(
    false
  );

  const count = useCountInterval(isCounterActive);
  useMutationObserver(isMutationObserverActive, mutations => {
    console.log(xtype(mutations), mutations);
    client.send(mutations);
  }
    
  );

  const handleStartCounterClick = () => {
    setIsCounterActive(true);
  };

  const handleStopCounterClick = () => {
    setIsCounterActive(false);
  };

  const handleStartMutationObserverClick = () => {
    setIsMutationObserverActive(true);
  };

  const handleStopMutationObserverClick = () => {
    setIsMutationObserverActive(false);
  };



  return (
    <div className="App">
      {/* <button onClick={() => this.onButtonClick("hello")}> send mssg</button> */}
      {/* <useMutationObserver {...this.props} socket={client} /> */}

          <div className="block blockFlex">
            <Button
              type="default"
              onClick={
                isCounterActive
                  ? handleStopCounterClick
                  : handleStartCounterClick
              }
            >
              {isCounterActive ? 'Stop' : 'Start'} counter
            </Button>
            <Button
              type="primary"
              className="primaryButton"
              onClick={
                isMutationObserverActive
                  ? handleStopMutationObserverClick
                  : handleStartMutationObserverClick
              }
            >
              {isMutationObserverActive ? 'Stop' : 'Start'} MutationObserver
            </Button>
          </div>
          <div className="block">
            <Title level={4} >
              Counter is{' '}
              <Text >
                {isCounterActive ? 'on' : 'off'}
              </Text>
            </Title>
            <Title level={4} >
              MutationObserver is{' '}
              <Text >
                {isMutationObserverActive ? 'on' : 'off'}
              </Text>
            </Title>
          </div>
 
          <Title data-count={count} id="observedNode" className="text" >
            Current count: {count}
          </Title>
          {isCounterActive && (
            <p>
              <Text className="text">
                Counter active Incremented every {TIME_INTERVAL / 1000} seconds
              </Text>
            </p>
          )}
          {isMutationObserverActive && (
            <p>
              <Text className="text">
                MutationObserver active
              </Text>
            </p>
          )}
          {isMutationObserverActive &&
            !isCounterActive && (
              <p>
                <Text className="text">
                MutationObserver active, Counter is not active
                </Text>
              </p>
            )}


    </div>
          

    
  );
};

export default App;
