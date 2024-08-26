/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */
import default_img from '../assets/img-placeholder.png'
/* ---------------------------------- antd ---------------------------------- */
import { Space, Typography, Col, Card, Avatar } from 'antd'
const { Title, Text } = Typography
const { Meta } = Card

/* -------------------------------------------------------------------------- */
/*                               ItemDisplayCard                              */
/* -------------------------------------------------------------------------- */
export const ItemDisplayCard = (itemDetails) => {
  console.log(itemDetails)

  return (
    <Col xs={24} xl={8} key={itemDetails.id}>
      <Card
        title={
          <Meta
            avatar={<Avatar src='https://api.dicebear.com/7.x/miniavs/svg?seed=8' />}
            description={<Text>{itemDetails.ownerId}</Text>}
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
      >
        <Title level={3} ellipsis={true}>
          {itemDetails.name}
        </Title>
        <Space direction='vertical'>
          <Text>Rental Price (per day):</Text>
          <Text strong>{`$${itemDetails.price_per_day}.00`}</Text>
        </Space>
      </Card>
    </Col>
  )
}
