/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
/* -------------------------------- COMPONENT ------------------------------- */
import { Space, Input, Row, Popover, Button, Col } from 'antd'
import { ItemDisplayCard } from '../components/ItemDisplayCard'
import { SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons'

const { Search } = Input

/* -------------------------------------------------------------------------- */
/*                                  HOMEPAGE                                  */
/* -------------------------------------------------------------------------- */
export const HomePage = ({ myItems }) => {
  const allItems = useSelector((state) => state.iRentStuff.allItems)
  const allItemsCreatedByCurrentUser = useSelector((state) => state.iRentStuff.allItemsCreatedByCurrentUser)
  const [searchedItems, setSearchedItems] = useState([])
  const [sortCategory, setSortCategory] = useState(['created_date', 1]) //0 is ascending, 1 is descending
  const [initialDisplayItems, setInitialDisplayItems] = useState([])
  // console.log(allItems)

  useEffect(() => {
    if (allItems) {
      if (myItems) {
        // let getInitialDisplayItems = allItems.filter((item) => item.owner == currentUser.userDetails.username)
        // const sortedMyItem = [...allItemsCreatedByCurrentUser].sort((a, b) => b.created_date.localeCompare(a.created_date))
        const sortedMyItem = sortItems(allItemsCreatedByCurrentUser, 'created_date')
        setInitialDisplayItems(sortedMyItem)
      } else {
        // const sortedItem = [...allItems].sort((a, b) => b.created_date.localeCompare(a.created_date))
        const sortedItem = sortItems(allItems, 'created_date')
        setInitialDisplayItems(sortedItem)
      }
    }
  }, [allItems, allItemsCreatedByCurrentUser, myItems])

  useEffect(() => {
    setSearchedItems(initialDisplayItems)
  }, [initialDisplayItems])

  const onChange = (e) => {
    const searchedValue = e.target.value.toLowerCase()

    if (searchedValue === '') {
      setSearchedItems(initialDisplayItems)
    } else {
      const items = initialDisplayItems.filter((item) => item.title.toLowerCase().includes(searchedValue))
      setSearchedItems(items)
    }
  }

  //sort
  const sortItems = (allItem, sortCategory, direction) => {
    const intCompare = ['deposit', 'price_per_day']

    try {
      if (intCompare.includes(sortCategory)) {
        return [...allItem].sort((a, b) => {
          if (!a[sortCategory] || !b[sortCategory]) {
            throw new Error('Invalid format')
          }
          return direction === 0 ? a[sortCategory] - b[sortCategory] : b[sortCategory] - a[sortCategory]
        })
      } else {
        return [...allItem].sort((a, b) => {
          if (!a[sortCategory] || !b[sortCategory]) {
            throw new Error(`Invalid ${sortCategory} format`)
          }
          return direction === 0 ? a[sortCategory].localeCompare(b[sortCategory]) : b[sortCategory].localeCompare(a[sortCategory])
        })
      }
    } catch (error) {
      console.error('Error sorting items:', error)
      // Optionally return the original array or handle the error accordingly
      return allItem
    }
  }

  const updateSortCategory = (option) => {
    if (option === sortCategory[0]) {
      if (sortCategory[1] === 0) {
        setSortCategory([option, 1])
      }

      if (sortCategory[1] === 1) {
        setSortCategory('')
      }
    } else {
      setSortCategory([option, 0])
    }
  }

  useEffect(() => {
    if (sortCategory === '') {
      setSearchedItems(initialDisplayItems)
    } else {
      const sortedItem = sortItems(searchedItems, sortCategory[0], sortCategory[1])
      console.log(sortCategory, sortedItem)
      setSearchedItems(sortedItem)
    }
  }, [sortCategory])

  const sortContent = () => {
    const sortOptions = ['created_date', 'availability', 'owner', 'category', 'deposit', 'price_per_day']
    return sortOptions.map((option) => (
      <Row key={option}>
        <Button onClick={() => updateSortCategory(option)} type={option === sortCategory[0] ? 'primary' : 'text'}>
          {option}
          {option === sortCategory[0] && sortCategory[1] === 1 && <SortAscendingOutlined />}
          {option === sortCategory[0] && sortCategory[1] === 0 && <SortDescendingOutlined />}
        </Button>
      </Row>
    ))
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
      <Row gutter={[8, 16]}>
        <Col xs={24} lg={22}>
          <Search placeholder='Search for an item' allowClear onChange={onChange} />
        </Col>
        <Col flex='auto'>
          <Popover content={sortContent} trigger='click'>
            <Button block>Sort By</Button>
          </Popover>
        </Col>
      </Row>
      <Row gutter={[16, 24]}>
        {searchedItems?.length > 0 && searchedItems.map((item) => <ItemDisplayCard itemDetails={item} key={item.id} />)}
      </Row>
    </Space>
  )
}
