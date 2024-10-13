/* -------------------------------------------------------------------------- */
/*                                   IMPORT                                   */
/* -------------------------------------------------------------------------- */
import { Modal, Tabs } from 'antd'
import { RentalForm } from './RentalForm'
import { PurchaseForm } from './PurchaseForm'

/* -------------------------------------------------------------------------- */
/*                                  ITEM EDIT                                 */
/* -------------------------------------------------------------------------- */
export const MakeOfferModal = ({ modalDetails, updateModalDetails, setFetchDataAgain }) => {
  console.log(modalDetails)

  const items = [
    {
      key: '1',
      label: 'I want to rent!',
      children: <RentalForm itemDetails={modalDetails.data} setFetchDataAgain={setFetchDataAgain} updateModalDetails={updateModalDetails} />
    },
    {
      key: '2',
      label: 'I want to buy!',
      children: (
        <PurchaseForm itemDetails={modalDetails.data} setFetchDataAgain={setFetchDataAgain} updateModalDetails={updateModalDetails} />
      )
    }
  ]

  return (
    <Modal
      width={1000}
      footer={null}
      title='Make Offer'
      open={modalDetails.state}
      onCancel={() => updateModalDetails({ state: false, data: {} })}
    >
      <Tabs type='card' items={items} size='large' />
    </Modal>
  )
}
