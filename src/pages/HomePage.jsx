import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import img from '../assets/img-placeholder.png'
/* -------------------------------- COMPONENT ------------------------------- */
import { Avatar, Card, Row, Col } from 'antd'
const { Meta } = Card

export const HomePage = () => {
  const allItems = useSelector((state) => state.iRentStuff.allItems)
  console.log(allItems)

  return (
    <>
      <Row gutter={[16, 24]}>
        {allItems.length > 0 &&
          allItems.map((item) => (
            <Col span={8}>
              <Card
                title={<Meta avatar={<Avatar src='https://api.dicebear.com/7.x/miniavs/svg?seed=8' />} />}
                cover={<img alt='example' src={img} />}
              >
                <p>{item.name}</p>
                <p>{`${item.description}`}</p>
                <p>{`Rental Price (per day): \n ${item.price_per_day}`}</p>
              </Card>
            </Col>
          ))}
      </Row>
    </>
  )
}
