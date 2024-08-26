/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
/* -------------------------------- COMPONENT ------------------------------- */
import { Space, Input, Row } from 'antd'
import { ItemDisplayCard } from '../components/ItemDisplayCard'

const { Search } = Input

/* -------------------------------------------------------------------------- */
/*                                  HOMEPAGE                                  */
/* -------------------------------------------------------------------------- */
export const HomePage = ({ myItems }) => {
  const currentUser = useSelector((state) => state.iRentStuff.currentUser)
  const allItems = useSelector((state) => state.iRentStuff.allItems)
  const [searchedItems, setSearchedItems] = useState([])
  const [initialDisplayItems, setInitialDisplayItems] = useState([])
  console.log(initialDisplayItems)
  console.log(myItems)

  useEffect(() => {
    if (myItems) {
      let getInitialDisplayItems = allItems.filter((item) => item.owner_id == currentUser.id)
      console.log(getInitialDisplayItems)
      setInitialDisplayItems(getInitialDisplayItems)
      setSearchedItems(getInitialDisplayItems)
    } else {
      setInitialDisplayItems(allItems)
      setSearchedItems(allItems)
    }
  }, [myItems])

  const onChange = (e) => {
    const searchedValue = e.target.value.toLowerCase()

    if (searchedValue == '') {
      setSearchedItems(initialDisplayItems)
    } else {
      let items = initialDisplayItems.filter((item) => item.name.toLowerCase().includes(searchedValue))
      setSearchedItems(items)
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
      <Search placeholder='Search for an item' allowClear onChange={onChange} />
      <Row gutter={[16, 24]}>
        {searchedItems.length > 0 && searchedItems.map((item) => <ItemDisplayCard itemDetails={item} key={item.id} />)}
      </Row>
    </Space>
  )
}
