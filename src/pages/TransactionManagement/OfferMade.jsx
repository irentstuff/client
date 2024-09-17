/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateError, updateSuccess } from '../../redux/reducer'
import { rentalStatus, patchActions, statusCanPatchActions } from '../../services/config'
import { rentalPatch } from '../../services/api'
import moment from 'moment'
/* -------------------------------- COMPONENT ------------------------------- */
import { Space, Input, Table, Tag, Button, Modal } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { ViewItem } from '../ItemManagement/ViewItem'
import { ReviewsFormModal } from '../../components/ReviewsFormModal'

/* -------------------------------------------------------------------------- */
/*                                  OfferMade                                 */
/* -------------------------------------------------------------------------- */
export const OfferMade = ({ setFetchDataAgain }) => {
  const dispatch = useDispatch()

  const allOffersMadeByCurrentUser = useSelector((state) => state.iRentStuff.allOffersMadeByCurrentUser)

  const [searchText, setSearchText] = useState('')
  const [searchData, setSearchData] = useState(allOffersMadeByCurrentUser)

  const [viewItemModal, setViewItemModal] = useState({ state: false, data: {} })
  const [editReviewModal, setEditReviewModal] = useState({ state: false, data: {} })

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
    setSearchData(allOffersMadeByCurrentUser)
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
      title: 'Item',
      dataIndex: ['itemDetails', 'title'],
      key: ['itemDetails', 'title'],
      width: '15%',
      sorter: (a, b) => a.itemDetails.title.localeCompare(b.itemDetails.title),
      ...getColumnSearchProps('itemDetails.title')
    },
    {
      title: 'Listed Deposit (SGD)',
      dataIndex: ['itemDetails', 'deposit'],
      key: ['itemDetails', 'deposit'],
      sorter: (a, b) => a.itemDetails.deposit - b.itemDetails.deposit
    },
    {
      title: 'Offered Deposit (SGD)',
      dataIndex: 'deposit',
      key: 'deposit',
      sorter: (a, b) => a.deposit - b.deposit
    },
    {
      title: 'Listed Rental Price (Per Day) (SGD)',
      dataIndex: ['itemDetails', 'price_per_day'],
      key: ['itemDetails', 'price_per_day'],
      sorter: (a, b) => a.itemDetails.price_per_day - b.itemDetails.price_per_day
    },

    {
      title: 'Offered Rental Price (Per Day) (SGD)',
      dataIndex: 'price_per_day',
      key: 'price_per_day',
      sorter: (a, b) => a.price_per_day - b.price_per_day
    },
    {
      title: 'Start Date',
      dataIndex: 'start_date',
      key: 'start_date',
      sorter: (a, b) => a.start_date.localeCompare(b.start_date)
    },
    {
      title: 'End Date',
      dataIndex: 'end_date',
      key: 'end_date',
      sorter: (a, b) => a.end_date.localeCompare(b.end_date)
    },
    {
      title: 'Offered Date',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: (text, record, index) => moment(text).format('YYYY-MM-DD'),
      sorter: (a, b) => a.updated_at.localeCompare(b.updated_at)
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
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
      render: (_, record) => (
        <Space size='middle'>
          <Button type='link' onClick={() => setViewItemModal({ state: true, data: record.itemDetails })}>
            View Item Details
          </Button>
          {statusCanPatchActions.cancel.includes(record.status) && (
            <Button type='link' onClick={() => cancelRental(record)}>
              Cancel
            </Button>
          )}
          {statusCanPatchActions.review.includes(record.status) && (
            <Button
              type='link'
              onClick={() =>
                setEditReviewModal({ state: true, inEdit: false, data: { item_id: record.item_id, rental_id: record.rental_id } })
              }
            >
              Leave a Review
            </Button>
          )}
        </Space>
      )
    }
  ]

  const cancelRental = async (record) => {
    try {
      const response = await rentalPatch(record.itemDetails.id, record.rental_id, patchActions.cancel)
      console.log(response)
      if (response.status === 200) {
        dispatch(
          updateSuccess({
            status: true,
            msg: `Rental offer is cancelled successfully`
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

  return (
    <Space
      direction='vertical'
      size='middle'
      style={{
        display: 'flex',
        paddingTop: '25px'
      }}
    >
      <Table columns={columns} dataSource={searchData} />
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
    </Space>
  )
}
