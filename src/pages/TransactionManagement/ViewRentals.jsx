/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateError, updateSuccess, updateItemById } from '../../redux/reducer'
import { rentalStatus, patchActions, statusCanPatchActions_rental, ownerCanPatchActions, userCanPatchActions } from '../../services/config'
import { rentalPatch, getItemByItemId } from '../../services/api'
import moment from 'moment'
/* -------------------------------- COMPONENT ------------------------------- */
import { Space, Input, Table, Tag, Button, Modal, Popconfirm } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { ViewItem } from '../ItemManagement/ViewItem'
import { ReviewsFormModal } from '../../components/ReviewsFormModal'

/* -------------------------------------------------------------------------- */
/*                                  ViewRentals                                 */
/* -------------------------------------------------------------------------- */
export const ViewRentals = ({ setFetchDataAgain, isOwner }) => {
  const dispatch = useDispatch()

  const allRentalOffers = isOwner
    ? useSelector((state) => state.iRentStuff.allRentalOffersReceivedByCurrentUser)
    : useSelector((state) => state.iRentStuff.allRentalOffersMadeByCurrentUser)

  const [searchText, setSearchText] = useState('')
  const [searchData, setSearchData] = useState([])

  const [viewItemModal, setViewItemModal] = useState({ state: false, data: {} })
  const [editReviewModal, setEditReviewModal] = useState({ state: false, data: {} })
  const refresh = useSelector((state) => state.iRentStuff.refreshReviews)

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
    setSearchData(allRentalOffers)
    close()
  }
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8
        }}
        onKeyDown={(e) => e.stopPropagation()}
        role='button'
        tabIndex={0}
      >
        <Input
          placeholder={`Search ${dataIndex}`}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onPressEnter={() => handleSearch(confirm, dataIndex, close)}
          style={{
            marginBottom: 8,
            display: 'block'
          }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() => handleSearch(confirm, dataIndex, close)}
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

  const getUpdatedItemByItemId = async (payload) => {
    try {
      const response = await getItemByItemId(payload)
      console.log(response)
      if (response.status === 200) {
        console.log(response.data)
        dispatch(
          updateItemById({
            data: response.data
          })
        )
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

  const updateRental = async (record, action) => {
    try {
      const response = await rentalPatch(record.itemDetails.id, record.rental_id, action)
      console.log(response)
      if (response.status === 200) {
        dispatch(
          updateSuccess({
            status: true,
            msg: `Rental offer is updated to ${action} successfully`
          })
        )
        setFetchDataAgain(true)
        //refetch the corresponding item details
        getUpdatedItemByItemId(record.itemDetails)
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

  const columns = [
    {
      title: 'Renter',
      dataIndex: 'renter_id',
      key: 'renter_id',
      // width: 100,
      show: isOwner,
      sorter: (a, b) => a.renter_id.localeCompare(b.renter_id),
      ...getColumnSearchProps('renter_id')
    },
    {
      title: 'Item',
      dataIndex: ['itemDetails', 'title'],
      key: ['itemDetails', 'title'],
      show: true,
      sorter: (a, b) => a.itemDetails.title.localeCompare(b.itemDetails.title),
      ...getColumnSearchProps('itemDetails.title')
    },
    // {
    //   title: 'Listed Deposit (SGD)',
    //   dataIndex: ['itemDetails', 'deposit'],
    //   key: ['itemDetails', 'deposit'],
    //   width: 150,
    //   sorter: (a, b) => a.itemDetails.deposit - b.itemDetails.deposit,
    // show: true
    // },
    {
      title: 'Offered Deposit (SGD)',
      dataIndex: 'deposit',
      key: 'deposit',
      width: 200,
      show: true,
      sorter: (a, b) => a.deposit - b.deposit
    },
    // {
    //   title: 'Listed Rental Price (Per Day) (SGD)',
    //   dataIndex: ['itemDetails', 'price_per_day'],
    //   key: ['itemDetails', 'price_per_day'],
    //   width: 150,
    //   sorter: (a, b) => a.itemDetails.price_per_day - b.itemDetails.price_per_day,
    // show: true
    // },

    {
      title: 'Offered Rental Price (Per Day) (SGD)',
      dataIndex: 'price_per_day',
      key: 'price_per_day',
      width: 200,
      show: true,
      sorter: (a, b) => a.price_per_day - b.price_per_day
    },
    {
      title: 'Start Date',
      dataIndex: 'start_date',
      key: 'start_date',
      // width: 100,
      show: true,

      sorter: (a, b) => a.start_date.localeCompare(b.start_date)
    },
    {
      title: 'End Date',
      dataIndex: 'end_date',
      key: 'end_date',
      // width: 100,
      show: true,
      sorter: (a, b) => a.end_date.localeCompare(b.end_date)
    },
    {
      title: 'Offered Date',
      dataIndex: 'created_at',
      key: 'created_at',
      // width: 100,
      show: true,
      render: (text) => moment(text).format('YYYY-MM-DD'),
      sorter: (a, b) => a.created_at.localeCompare(b.created_at)
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      show: true,
      render: (text) => (
        <Tag style={{ float: 'right' }} bordered={false} color={rentalStatus.find((option) => option.value === text)?.color}>
          {rentalStatus.find((option) => option.value === text)?.label}
        </Tag>
      ),
      sorter: (a, b) => a.status.localeCompare(b.status),
      filters: rentalStatus,
      onFilter: (value, record) => record.status.indexOf(value) === 0
    },
    {
      title: 'Action',
      key: 'action',
      show: true,
      render: (_, record) => (
        <Space size='middle'>
          <Button type='link' onClick={() => window.location.assign(`../messaging/?item=${record.item_id}&renter=${record.renter_id}`)}>
            View Chat
          </Button>
          <Button type='link' onClick={() => setViewItemModal({ state: true, data: record.itemDetails })}>
            View Item Details
          </Button>

          {roleAllowedPatchActions.includes('review') && statusCanPatchActions_rental.review.includes(record.status) && (
            <Button
              type='link'
              onClick={() =>
                setEditReviewModal({ state: true, inEdit: false, data: { item_id: record.item_id, rental_id: record.rental_id } })
              }
            >
              Review
            </Button>
          )}

          {/* UPDATE OFFER */}
          {roleAllowedPatchActions.includes('cancel') && statusCanPatchActions_rental.cancel.includes(record.status) && (
            <Popconfirm
              title='Delete rental offer'
              description='Are you sure to delete this offer?'
              onConfirm={() => updateRental(record, patchActions.cancel)}
              okText='Yes'
              cancelText='No'
            >
              <Button type='link'>Cancel</Button>
            </Popconfirm>
          )}
          {roleAllowedPatchActions.includes('confirm') && statusCanPatchActions_rental.confirm.includes(record.status) && (
            <Popconfirm
              title='Confirm rental offer'
              description='Are you sure to confirm this offer?'
              onConfirm={() => updateRental(record, patchActions.confirm)}
              okText='Yes'
              cancelText='No'
            >
              <Button type='link'>Confirm</Button>
            </Popconfirm>
          )}
          {roleAllowedPatchActions.includes('start') && statusCanPatchActions_rental.start.includes(record.status) && (
            <Popconfirm
              title='Start rental offer'
              description='Are you sure to start this offer?'
              onConfirm={() => updateRental(record, patchActions.start)}
              okText='Yes'
              cancelText='No'
            >
              <Button type='link'>Start</Button>
            </Popconfirm>
          )}
          {roleAllowedPatchActions.includes('complete') && statusCanPatchActions_rental.complete.includes(record.status) && (
            <Popconfirm
              title='Complete rental offer'
              description='Are you sure to complete this offer?'
              onConfirm={() => updateRental(record, patchActions.complete)}
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

  useEffect(() => {
    setSearchData(allRentalOffers)
  }, [allRentalOffers])

  return (
    <>
      <Table columns={columns.filter((col) => col.show)} dataSource={searchData} key={searchData.rental_id} scroll={{ x: 'max-content' }} />
      <Modal
        width={1000}
        footer={null}
        title='View Item Details'
        open={viewItemModal.state}
        onCancel={() => setViewItemModal({ state: false, data: {} })}
      >
        <ViewItem itemDetailsFromOffer={viewItemModal.data} />
      </Modal>
      {editReviewModal.state && <ReviewsFormModal modalDetails={editReviewModal} updateModalDetails={setEditReviewModal} />}
    </>
  )
}
