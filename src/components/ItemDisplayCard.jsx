/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateError } from '../redux/reducer'
import { getOneItemImage } from '../services/api'
import { assetsURL, dayDifference, availabilityOptions, getCategoryLabel } from '../services/config'
/* ---------------------------------- antd ---------------------------------- */
import { Space, Typography, Col, Card, Avatar, Image, Tag } from 'antd'

const { Title, Text } = Typography
const { Meta } = Card

/* -------------------------------------------------------------------------- */
/*                               ItemDisplayCard                              */
/* -------------------------------------------------------------------------- */
export const ItemDisplayCard = ({ itemDetails }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const allItemCategories = useSelector((state) => state.iRentStuff.allItemCategories)

  const [imagePath, setImagePath] = useState('')
  // console.log(itemDetails)

  const getOneItemImageLocal = async (itemId) => {
    try {
      const response = await getOneItemImage(itemId)
      // console.log(response)
      if (response.status === 200) {
        if (!response.data?.errorType) {
          const path = `${assetsURL}/${itemId}/${response.data.substring(response.data.lastIndexOf('/') + 1)}`
          setImagePath(path)
        }
        // window.location.reload()
      } else {
        // dispatch(
        //   updateError({
        //     status: true,
        //     msg: response.statusText
        //   })
        // )
      }
    } catch (error) {
      // dispatch(
      //   updateError({
      //     status: true,
      //     msg: `${error.message}`
      //   })
      // )
    }
  }

  useEffect(() => {
    if (itemDetails.image.endsWith('.jpg') || itemDetails.image.endsWith('.jpeg') || itemDetails.image.endsWith('.png')) {
      setImagePath(itemDetails.image)
    } else if (itemDetails.image !== '') {
      getOneItemImageLocal(itemDetails.id)
    }
  }, [itemDetails])

  return (
    <Col xs={24} xl={6} key={itemDetails.id}>
      <Card
        title={
          <Meta
            avatar={<Avatar src='https://api.dicebear.com/7.x/miniavs/svg?seed=8' />}
            description={
              <>
                <Text>
                  Listed {dayDifference(itemDetails.created_date)} days ago by {itemDetails.owner}
                </Text>
                <Tag
                  style={{ float: 'right' }}
                  bordered={false}
                  color={availabilityOptions.find((option) => option.value === itemDetails.availability).color}
                >
                  {availabilityOptions.find((option) => option.value === itemDetails.availability).label}
                </Tag>
              </>
            }
          />
        }
        cover={
          imagePath === '' ? (
            <Image className='centered-image' src={`${assetsURL}/common/no-img.jpg`} preview={false} />
          ) : (
            <Image className='centered-image' src={`${imagePath}`} preview={false} />
          )
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
            <Text strong>
              {/* {` ${allItemCategories.find((cat) => cat.value === itemDetails.category || cat.id === itemDetails.category).label}`} */}
              {` ${getCategoryLabel(allItemCategories, itemDetails.category)}`}
            </Text>
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
