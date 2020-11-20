import React, { useState, useEffect } from 'react'
import { Flex, ProgressCircle } from '@bigcommerce/big-design';

export default function Loader() {

    return (
        <div>
            <Flex justifyContent="center" style={{marginTop: '35vh'}}>
            <ProgressCircle size="large" />
            </Flex>
        </div>
    )
}