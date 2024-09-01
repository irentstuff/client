/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */
import { useSelector } from 'react-redux'
import default_img from '../assets/img-placeholder.png'
/* ---------------------------------- antd ---------------------------------- */
import { Space, Typography, Col, Row, Card, Avatar, Button } from 'antd'
const { Title, Text } = Typography
const { Meta } = Card

/* -------------------------------------------------------------------------- */
/*                               ItemDisplayCard                              */
/* -------------------------------------------------------------------------- */
export const ItemEditCard = ({ itemDetails }) => {
  const allUsers = useSelector((state) => state.iRentStuff.allUsers)
  const userDetails = allUsers.find((user) => user.id === itemDetails.owner)
  const currentUser = useSelector((state) => state.iRentStuff.currentUser)

  const currentUserIsItemOwner = currentUser?.userDetails[0]?.id === itemDetails?.owner

  console.log(itemDetails)
  console.log(currentUserIsItemOwner)

  return (
    <Space
      direction='vertical'
      size='middle'
      style={{
        display: 'flex',
        paddingTop: '25px'
      }}
    >
      <Card
        title={
          <Meta
            avatar={<Avatar src='https://api.dicebear.com/7.x/miniavs/svg?seed=8' />}
            description={<Text>{userDetails ? userDetails.username : itemDetails.owner}</Text>}
          />
        }
        style={{ textAlign: 'left' }}
      >
        <Row justify={'start'}>
          <Col xs={24} xl={8}>
            <img
              alt=''
              src={itemDetails.img_path}
              onError={(event) => {
                event.target.src = { default_img }
                event.onerror = null
              }}
            />
          </Col>
          <Col xs={24} xl={16}>
            <Space direction='vertical' size={'large'}>
              <Title level={3}>{itemDetails.title}</Title>
              <Text>
                Description: <Text strong>{`${itemDetails.description}`}</Text>
              </Text>

              <Text>
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

              {currentUserIsItemOwner ? <Button>Edit Item</Button> : <Button>Make Offer</Button>}
            </Space>
          </Col>
        </Row>
      </Card>
    </Space>
  )
}
