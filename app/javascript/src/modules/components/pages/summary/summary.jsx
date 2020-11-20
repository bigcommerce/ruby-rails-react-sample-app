import React, { useState, useEffect} from 'react'
import { Box, Panel, Text, Grid } from '@bigcommerce/big-design';

import Loader from '../../common/Loader';
import {ApiService} from '../../../../services/apiServices';

export default function Summary(props) {
  let {storeId} = props;
  const [loading, setLoading] = useState(true)
  const [storeInfo, setStoreInfo] = useState([])

  useEffect(() => {
    ApiService.getStoreInfo({store_id: storeId})
      .then(function (response) {
        setStoreInfo(response.data.store_info)
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      })
  },[]);

  return(
    <>
      { loading && <Loader />
      }
      { !loading &&
      <>
        <Panel header="Store Overview"
               action={{
                 variant: 'secondary',
                 text: 'View Storefront',
                 onClick: () => {
                   // Do some action
                 }}}>
          <p>A view in to your BigCommerce store front.</p>
          <Box backgroundColor="white" border="box" borderRadius="normal" padding="medium">
            <h3>Domain</h3>
            <p>{storeInfo.domain}</p>
          </Box>
        </Panel>
        <Panel header="Catalog Summary">
          <p>A simple overview of your catalog.</p>
          <Grid gridColumns="repeat(3, 1fr)">
            <Box backgroundColor="white" border="box" borderRadius="normal" padding="medium" display="inline">
              <Text>Variant Count</Text>
              <p style={{ fontSize: '2rem' }}>29</p>
            </Box>
            <Box backgroundColor="white" border="box" borderRadius="normal" padding="medium" display="inline">
              <Text>Inventory Count</Text>
              <p style={{ fontSize: '2rem' }}>45</p>
            </Box>
            <Box backgroundColor="white" border="box" borderRadius="normal" padding="medium" display="inline">
              <Text>Inventory Value</Text>
              <p style={{ fontSize: '2rem' }}>$110.00</p>
            </Box>
          </Grid>
        </Panel>
      </>
      }
    </>
  )}