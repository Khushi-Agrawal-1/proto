import { useEffect, useMemo } from 'react';
import client from './socketClient';
import xtype from 'xtypejs'


const observerConfig = {
  attributes: true,
  characterData: true,
  attributeOldValue: true,
  subtree: true
};

export const useMutationObserver = (isActive, callback) => {
  const observer = useMemo(() => new MutationObserver(callback), [callback]);
  

  useEffect(
    () => {
      if (isActive) {
        const targetNode = document.getElementById('observedNode');
        observer.observe(targetNode, observerConfig);
        client.send("Hello mutation!");
        // console.log(xtype(observer))
        // client.send(observer);
        client.send(MutationRecord.type);
        // let myRecords = observer.takeRecords();
        // if (myRecords) {
        //   callback(myRecords);
        //   console.log(myRecords);
        //   client.send(myRecords);
        //   console.log(myRecords[0])
        // }
        
        // console.log(mutations)
        // client.send(observer.observe(targetNode, observerConfig));
        // console.log(xtype(observer.observe(targetNode, observerConfig)))
        // var x = " " + String(observer.observe(targetNode, observerConfig));
       

        //client.send(x);
        // console.log(xtype(x))
        
        
        // const ob = observer.observe(targetNode, observerConfig);
        // console.log(ob);
      } else {
        
        observer.disconnect();
      }

     

     return () => observer.disconnect();
    },
    
  );
};
