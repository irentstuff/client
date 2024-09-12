/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useState, useEffect } from 'react'
import { Rate, Typography, Space, Avatar, List } from 'antd'
import { getReviewsForItem, getAverageReviewsForItem } from '../services/api'
import { dayDifference } from '../services/config'

const { Title, Text } = Typography

export const ReviewsOverview = ({ itemId }) => {
  const [averageReviews, setAverageReviews] = useState({
    item_id: '',
    average_rating: 0.0,
    total_reviews: 0
  })
  const [totalReviews, setTotalReviews] = useState([])

  console.log('REVIEWS :', averageReviews, totalReviews)

  //get reviews for item
  const getAverageReviewsForItemLocal = async (payload) => {
    try {
      const response = await getAverageReviewsForItem(payload)
      console.log(response)
      if (response.status === 200) {
        setAverageReviews(response.data)
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
  const getReviewsForItemLocal = async (payload) => {
    try {
      const response = await getReviewsForItem(payload)
      console.log(response)
      if (response.status === 200) {
        setTotalReviews(response.data)
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

  useEffect(() => {
    //get reviews for item on load
    // getAverageReviewsForItemLocal({ id: itemId })
    // getReviewsForItemLocal({ id: itemId })
  }, [])

  return (
    <Space direction='vertical' size='large' style={{ width: '70%' }}>
      <Title level={3}>{`Reviews (${averageReviews.total_reviews})`}</Title>
      {/* <Space size={'large'}> */}
      <Rate disabled defaultValue={averageReviews.average_rating} />
      <Text></Text>
      {/* </Space> */}
      <List
        itemLayout='horizontal'
        dataSource={totalReviews}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              key={item.review_id}
              avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=8`} />}
              title={<Rate disabled defaultValue={item.rating} />}
              description={`${dayDifference(item.created_at)} days ago by ${item.user_id}`}
            />
            {item.comment}
          </List.Item>
        )}
      />
    </Space>
  )
}
