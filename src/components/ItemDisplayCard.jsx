/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import default_img from '../assets/img-placeholder.png'
/* ---------------------------------- antd ---------------------------------- */
import { Space, Typography, Col, Card, Avatar } from 'antd'
const { Title, Text } = Typography
const { Meta } = Card

/* -------------------------------------------------------------------------- */
/*                               ItemDisplayCard                              */
/* -------------------------------------------------------------------------- */
export const ItemDisplayCard = ({ itemDetails }) => {
  const navigate = useNavigate()
  const allUsers = useSelector((state) => state.iRentStuff.allUsers)
  const userDetails = allUsers.find((user) => user.id === itemDetails.owner)
  const allItemCategories = useSelector((state) => state.iRentStuff.allItemCategories)
  // console.log(itemDetails)

  return (
    <Col xs={24} xl={8} key={itemDetails.id}>
      <Card
        title={
          <Meta
            avatar={<Avatar src='https://api.dicebear.com/7.x/miniavs/svg?seed=8' />}
            description={<Text>{userDetails ? userDetails.username : itemDetails.owner}</Text>}
          />
        }
        cover={
          <img
            alt=''
            src={itemDetails.img_path}
            onError={(event) => {
              event.target.src = { default_img }
              event.onerror = null
            }}
          />
        }
        hoverable
        onClick={() => navigate('ViewItem', { state: itemDetails })}
      >
        <Title level={3} ellipsis={true}>
          {itemDetails.title}
        </Title>
        <Space direction='vertical'>
          <Text ellipsis={true}>
            Category:
            <Text strong>{` ${allItemCategories.find((cat) => cat.id == itemDetails.category).label}`}</Text>
          </Text>

          <Text ellipsis={true}>
            Condition:
            <Text strong>{` ${itemDetails.condition}`}</Text>
          </Text>

          <Text>
            Rental Price (per day):
            <Text strong>{` $${itemDetails.price_per_day}`}</Text>
          </Text>

          <Text>
            Deposit Price (per day):
            <Text strong>{` $${itemDetails.deposit}`}</Text>
          </Text>
        </Space>
      </Card>
    </Col>
  )
}
