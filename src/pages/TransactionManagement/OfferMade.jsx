/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { dayDifference, rentalStatus } from '../../services/config'
import moment from 'moment'
/* -------------------------------- COMPONENT ------------------------------- */
import Highlighter from 'react-highlight-words'
import { Space, Input, Row, Pagination, List, Avatar, Col, Typography, Table, Tag, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

const { Title, Text } = Typography
const { Search } = Input

/* -------------------------------------------------------------------------- */
/*                                  OfferMade                                 */
/* -------------------------------------------------------------------------- */
export const OfferMade = ({ myItems }) => {
  const currentUser = useSelector((state) => state.iRentStuff.currentUser)
  const allItems = useSelector((state) => state.iRentStuff.allItems)
  const allOffersMadeByCurrentUser = useSelector((state) => state.iRentStuff.allOffersMadeByCurrentUser)

  const [searchText, setSearchText] = useState('')
  const [searchData, setSearchData] = useState(allOffersMadeByCurrentUser)

  const getNestedValue = (obj, path) => {
    if (!path) return undefined

    const keys = path.split('.')
    return keys.reduce((acc, key) => acc && acc[key], obj)
  }

  const handleSearch = (confirm, dataIndex) => {
    confirm()
    console.log(searchText)
    console.log(
      allOffersMadeByCurrentUser.filter((offer) => getNestedValue(offer, dataIndex).toLowerCase().includes(searchText.toLowerCase()))
    )
    setSearchData(
      allOffersMadeByCurrentUser.filter((offer) => getNestedValue(offer, dataIndex).toLowerCase().includes(searchText.toLowerCase()))
    )
  }
  const handleReset = (clearFilters) => {
    clearFilters()
    setSearchText('')
    setSearchData(allOffersMadeByCurrentUser)
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
          onPressEnter={(e) => handleSearch(confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block'
          }}
        />
        <Space>
          <Button
            type='primary'
            onClick={(e) => handleSearch(confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{
              width: 90
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
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
    // onFilter: (value, record) => getNestedValue(record, dataIndex)?.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchText.current?.select(), 100)
      }
    }
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     <Highlighter
    //       highlightStyle={{
    //         backgroundColor: '#ffc069',
    //         padding: 0
    //       }}
    //       searchWords={[searchText]}
    //       autoEscape
    //       textToHighlight={text ? text.toString() : ''}
    //     />
    //   ) : (
    //     text
    //   )
  })

  console.log(allItems)
  console.log(allOffersMadeByCurrentUser)

  const columns = [
    {
      title: 'Item',
      dataIndex: ['itemDetails', 'title'],
      key: ['itemDetails', 'title'],
      width: '20%',
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
      sorter: (a, b) => a.status.localeCompare(b.status)
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      )
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
      <Table columns={columns} dataSource={searchData} />
    </Space>
  )
}
