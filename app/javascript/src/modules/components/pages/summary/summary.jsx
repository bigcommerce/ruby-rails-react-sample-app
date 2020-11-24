import React, { useState, useEffect} from 'react'
import { Box, Panel, Text, Grid } from '@bigcommerce/big-design';

import Loader from '../../common/Loader';
import {ApiService} from '../../../../services/apiServices';
import {alertsManager} from "../../../../app";

export default function Summary(props) {
  let {storeId} = props;
  const [loading, setLoading] = useState(true)
  const [storeInfo, setStoreInfo] = useState([])
  const [storeInventory, setInventory] = useState([])

  function AddAlert(title, details, type) {
    const alert = {
      header: title,
      messages: [
        {
          text: details,
        },
      ],
      type: type,
      onClose: () => null,
    }
    alertsManager.add(alert);
  }

  useEffect(() => {
    ApiService.getStoreInfo({store_id: storeId})
      .then(function (response) {
        setStoreInfo(response.data.store_info)
        setInventory(response.data.store_inventory)
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        AddAlert('Error', 'Unable To Fetch Data, Please Try Again!', 'error')
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
                   window.open(`https://${storeInfo.domain}`, '_blank')
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
              <p style={{ fontSize: '2rem' }}>{storeInventory.data.variant_count}</p>
            </Box>
            <Box backgroundColor="white" border="box" borderRadius="normal" padding="medium" display="inline">
              <Text>Inventory Count</Text>
              <p style={{ fontSize: '2rem' }}>{storeInventory.data.inventory_count}</p>
            </Box>
            <Box backgroundColor="white" border="box" borderRadius="normal" padding="medium" display="inline">
              <Text>Inventory Value</Text>
              <p style={{ fontSize: '2rem' }}>{storeInfo.currency_symbol} {storeInventory.data.inventory_value}</p>
            </Box>
          </Grid>
        </Panel>
      </>
      }
    </>
  )}
