import React, {useState, useEffect} from 'react'
import {Box, Tabs, Text} from "@bigcommerce/big-design";

import Summary from './components/pages/summary/summary'
import Orders from './components/pages/orders/orders'

export default function Main() {
  const [activeTab, setActiveTab] = useState('summary');
  const [currentStore, setCurrentStore] = useState('');

  const items = [
    { id: 'summary', title: 'Summary' },
    { id: 'orders', title: 'Orders List' },
  ];

  useEffect(() =>{
    setCurrentStore(localStorage.getItem('store_id'));
  }, [])

  useEffect(() =>{
    document.body.style.backgroundColor = '#f6f7f9'
    document.body.style.fontFamily = 'Source Sans Pro,Helvetica Neue,arial,sans-serif'
  })

  return (
    <div>
      <div style={{marginLeft: '50px'}}>
        <h1 style={{color: '#313440',
          fontSize: '1.5rem',
          fontWeight: 400,
          lineHeight: '2rem'}}>
          Sample App</h1>
      </div>
      <div style={{borderBottom: '1px solid #D9DCE9'}}>
        <div style={{marginLeft: '50px'}}>
          <Tabs activeTab={activeTab} items={items} onTabClick={setActiveTab} />
        </div>
      </div>
      { currentStore &&
      <div style={{marginLeft: '50px'}}>
        <Box marginTop="large">
          {activeTab === 'summary' && <Summary storeId={currentStore}/>}
          {activeTab === 'orders' && <Orders storeId={currentStore}/>}
        </Box>
      </div>
      }
    </div>
  )
}
