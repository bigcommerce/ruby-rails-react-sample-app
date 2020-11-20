import React, {useState, useEffect} from 'react'
import {Box, Tabs, Text} from "@bigcommerce/big-design";

import Summary from './components/pages/summary/summary'
import Orders from './components/pages/orders/orders'

export default function Main() {
  const [activeTab, setActiveTab] = useState('orders');
  const [currentStore, setCurrentStore] = useState('2');

  const items = [
    { id: 'home', title: 'Home' },
    { id: 'orders', title: 'Orders' },
  ];

  useEffect(() =>{
    setCurrentStore(localStorage.getItem('store_id') || '2')
  })

  return (
    <div style={{marginLeft: '50px'}}>
      <Tabs activeTab={activeTab} items={items} onTabClick={setActiveTab} />
      <Box marginTop="large">
        {activeTab === 'home' && <Summary storeId={currentStore}/>}
        {activeTab === 'orders' && <Orders storeId={currentStore}/>}
      </Box>
    </div>
  )
}