/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState } from 'react';
import { Button, Typography } from 'antd';
import { useCountInterval, useMutationObserver } from './hooks';
import { TIME_INTERVAL } from './constants';
 import io  from "socket.io-client";

const { Title, Text } = Typography;

let socket;
const URL = "localhost:5000/";

function App() {

  const [changes, setChange] = useState("");

  useEffect(() => {
    socket = io(URL);
  }, [URL]);

 
  useEffect(() => {
    // socket.on("send_message", (data) => {
    //   socket.emit("send_message",changes);
    //   console.log(data); 
    
    // });
    setChange({count});
    socket.on("receive_message", changes);
  }, []); 






  // MUTATION OBSERVER
  const [isCounterActive, setIsCounterActive] = useState(false);
  const [isMutationObserverActive, setIsMutationObserverActive] = useState(
    false
  );

  const count = useCountInterval(isCounterActive);
  useMutationObserver(isMutationObserverActive, mutations =>
    console.log('mutations', mutations)
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
 
          <Title data-count={count} id="observedNode" className="text" onChange={(e) => {setChange(e.target.value)}}>
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
