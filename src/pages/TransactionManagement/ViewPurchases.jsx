/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateError, updateSuccess } from '../../redux/reducer'
import { rentalStatus, patchActions, statusCanPatchActions, ownerCanPatchActions, userCanPatchActions } from '../../services/config'
import { purchasePatch } from '../../services/api'
import moment from 'moment'
/* -------------------------------- COMPONENT ------------------------------- */
import { Space, Input, Table, Tag, Button, Modal, Popconfirm } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { ViewItem } from '../ItemManagement/ViewItem'
import { ReviewsFormModal } from '../../components/ReviewsFormModal'

/* -------------------------------------------------------------------------- */
/*                                  ViewPurchases                                 */
/* -------------------------------------------------------------------------- */
export const ViewPurchases = ({ setFetchDataAgain, isOwner }) => {
  const dispatch = useDispatch()

  const allPurchaseOffers = isOwner
    ? useSelector((state) => state.iRentStuff.allPurchaseOffersReceivedByCurrentUser)
    : useSelector((state) => state.iRentStuff.allPurchaseOffersMadeByCurrentUser)

  console.log(allPurchaseOffers)
  const [searchText, setSearchText] = useState('')
  const [searchData, setSearchData] = useState([])

  const [viewItemModal, setViewItemModal] = useState({ state: false, data: {} })
  const [editReviewModal, setEditReviewModal] = useState({ state: false, data: {} })

  const roleAllowedPatchActions = isOwner ? ownerCanPatchActions : userCanPatchActions

  const getNestedValue = (obj, path) => {
    if (!path) return undefined

    const keys = path.split('.')
    return keys.reduce((acc, key) => acc && acc[key], obj)
  }
  const handleSearch = (confirm, dataIndex, close) => {
    confirm()
    setSearchData(searchData.filter((offer) => getNestedValue(offer, dataIndex).toLowerCase().includes(searchText.toLowerCase())))
    close()
  }
  const handleReset = (clearFilters, close) => {
    clearFilters()
    setSearchText('')
    setSearchData(allPurchaseOffersMadeByCurrentUser)
    close()
  }
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          placeholder={`Search ${dataIndex}`}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onPressEnter={(e) => handleSearch(confirm, dataIndex, close)}
          style={{
            marginBottom: 8,
            display: 'block'
          }}
        />
        <Space>
          <Button
            type='primary'
            onClick={(e) => handleSearch(confirm, dataIndex, close)}
            icon={<SearchOutlined />}
            size='small'
            style={{
              width: 90
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters, close)}
            size='small'
            style={{
              width: 90
            }}
          >
            Reset
          </Button>

          <Button
            type='link'
            size='small'
            onClick={() => {
              close()
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined
        }}
      />
    ),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchText.current?.select(), 100)
      }
    }
  })

  const columns = [
    {
      title: 'Buyer',
      dataIndex: 'buyer_id',
      key: 'buyer_id',
      // width: 100,
      show: isOwner,
      sorter: (a, b) => a.buyer_id.localeCompare(b.buyer_id),
      ...getColumnSearchProps('buyer_id')
    },
    {
      title: 'Item',
      dataIndex: ['itemDetails', 'title'],
      key: ['itemDetails', 'title'],
      width: '15%',
      show: true,
      sorter: (a, b) => a.itemDetails.title.localeCompare(b.itemDetails.title),
      ...getColumnSearchProps('itemDetails.title')
    },
    {
      title: 'Offered Price (SGD)',
      dataIndex: 'purchase_price',
      key: 'purchase_price',
      show: true,
      sorter: (a, b) => a.purchase_price - b.purchase_price
    },
    {
      title: 'Offered Date',
      dataIndex: 'updated_at',
      key: 'updated_at',
      show: true,
      render: (text, record, index) => moment(text).format('YYYY-MM-DD'),
      sorter: (a, b) => a.updated_at.localeCompare(b.updated_at)
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      show: true,
      render: (text, record, index) => (
        <Tag style={{ float: 'right' }} bordered={false} color={rentalStatus.find((option) => option.value == text).color}>
          {rentalStatus.find((option) => option.value == text).label}
        </Tag>
      ),
      sorter: (a, b) => a.status.localeCompare(b.status),
      filters: rentalStatus,
      onFilter: (value, record) => record.status.indexOf(status) === 0
    },
    {
      title: 'Action',
      key: 'action',
      show: true,
      render: (_, record) => (
        <Space size='middle'>
          <Button type='link' onClick={() => setViewItemModal({ state: true, data: record.itemDetails })}>
            View Item Details
          </Button>
          {/* {statusCanPatchActions.review.includes(record.status) && (
            <Button
              type='link'
              onClick={() =>
                setEditReviewModal({ state: true, inEdit: false, data: { item_id: record.item_id, purchase_id: record.purchase_id } })
              }
            >
              Leave a Review
            </Button>
          )} */}

          {/* UPDATE PURCHASE */}
          {roleAllowedPatchActions.includes('cancel') && statusCanPatchActions.cancel.includes(record.status) && (
            <Popconfirm
              title='Delete purchase offer'
              description='Are you sure to purchase this offer?'
              onConfirm={() => updatePurchase(record, patchActions.cancel)}
              okText='Yes'
              cancelText='No'
            >
              <Button type='link'>Cancel</Button>
            </Popconfirm>
          )}
          {roleAllowedPatchActions.includes('confirm') && statusCanPatchActions.confirm.includes(record.status) && (
            <Popconfirm
              title='Confirm purchase offer'
              description='Are you sure to confirm this offer?'
              onConfirm={() => updatePurchase(record, patchActions.confirm)}
              okText='Yes'
              cancelText='No'
            >
              <Button type='link'>Confirm</Button>
            </Popconfirm>
          )}
          {roleAllowedPatchActions.includes('complete') && statusCanPatchActions.complete.includes(record.status) && (
            <Popconfirm
              title='Complete purchase offer'
              description='Are you sure to complete this offer?'
              onConfirm={() => updatePurchase(record, patchActions.complete)}
              okText='Yes'
              cancelText='No'
            >
              <Button type='link'>Complete</Button>
            </Popconfirm>
          )}
        </Space>
      )
    }
  ]

  const updatePurchase = async (record, action) => {
    try {
      const response = await purchasePatch(record.itemDetails.id, record.purchase_id, action)
      console.log(response)
      if (response.status === 200) {
        dispatch(
          updateSuccess({
            status: true,
            msg: `Purchase offer is updated to ${action} successfully`
          })
        )
        setFetchDataAgain(true)
      } else {
        dispatch(
          updateError({
            status: true,
            msg: response.statusText
          })
        )
      }
    } catch (error) {
      dispatch(
        updateError({
          status: true,
          msg: `${error.message}`
        })
      )
    }
  }

  useEffect(() => {
    setSearchData(allPurchaseOffers)
  }, [allPurchaseOffers])

  return (
    <>
      <Table
        columns={columns.filter((col) => col.show)}
        dataSource={searchData}
        key={searchData.purchase_id}
        scroll={{ x: 'max-content' }}
      />
      <Modal
        width={1000}
        footer={null}
        title={`View Item Details`}
        open={viewItemModal.state}
        onCancel={() => setViewItemModal({ state: false, data: {} })}
      >
        <ViewItem itemDetailsFromOffer={viewItemModal.data} />
      </Modal>
      {editReviewModal.state && <ReviewsFormModal modalDetails={editReviewModal} updateModalDetails={setEditReviewModal} />}
    </>
  )
}
