/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
/* -------------------------------- COMPONENT ------------------------------- */
import { Space, Tabs, Table, Tag, Button, Modal } from 'antd'
import { ViewRentals } from './ViewRentals'
import { ViewPurchases } from './ViewPurchases'

/* -------------------------------------------------------------------------- */
/*                                  OfferMade                                 */
/* -------------------------------------------------------------------------- */
export const OfferReceived = ({ setFetchDataAgain }) => {
  const items = [
    {
      key: '1',
      label: 'Rentals',
      children: <ViewRentals setFetchDataAgain={setFetchDataAgain} isOwner={true} />
    },
    {
      key: '2',
      label: 'Purchase',
      children: <ViewPurchases setFetchDataAgain={setFetchDataAgain} isOwner={true} />
    }
  ]

  return (
    <Space
      direction='vertical'
      size='middle'
      style={{
        display: 'flex',
        paddingTop: '25px'
      }}
    >
      <Tabs type='card' items={items} size='large' />
    </Space>
  )
}
