import React from 'react'
import { AlertsManager, createAlertsManager } from '@bigcommerce/big-design';

import Main from './modules/main'

export default function App() {
  return(
    <>
      <AlertsManager manager={alertsManager} />
      <Main/>
    </>
  )
}
export const alertsManager = createAlertsManager();
