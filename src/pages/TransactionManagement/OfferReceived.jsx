/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { Space, Tabs } from 'antd'
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
      <Tabs type='card' items={items} size='large' key={items.key} />
    </Space>
  )
}
