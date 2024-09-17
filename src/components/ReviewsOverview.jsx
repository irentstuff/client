/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateRefreshReviews, updateError, updateSuccess } from '../redux/reducer'
import { Rate, Typography, Space, Avatar, List, Input, Modal, Button, Popconfirm } from 'antd'
import { ReviewsFormModal } from './ReviewsFormModal'

import { getReviewsForItem, getAverageReviewsForItem, deleteReviews } from '../services/api'
import { dayDifference } from '../services/config'

const { Title, Text } = Typography

/* -------------------------------------------------------------------------- */
/*                              REVIEWS OVERVIEW                              */
/* -------------------------------------------------------------------------- */
export const ReviewsOverview = ({ itemId }) => {
  const dispatch = useDispatch()

  const [averageReviews, setAverageReviews] = useState({
    item_id: '',
    average_rating: 0.0,
    total_reviews: 0
  })
  const [totalReviews, setTotalReviews] = useState([])
  const [editReviewModal, setEditReviewModal] = useState({ state: false, data: {} })

  const currentUser = useSelector((state) => state.iRentStuff.currentUser)
  const refresh = useSelector((state) => state.iRentStuff.refreshReviews)

  console.log('REVIEWS :', averageReviews, totalReviews)

  //get reviews for item
  const getAverageReviewsForItemLocal = async (payload) => {
    try {
      const response = await getAverageReviewsForItem(payload)
      console.log(response)
      if (response.status === 200) {
        if (response.data?.total_reviews) {
          setAverageReviews(response.data)
        } else {
          setAverageReviews({
            item_id: '',
            average_rating: 0.0,
            total_reviews: 0
          })
        }
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
        if (!response.data?.message) {
          setTotalReviews(response.data)
        } else {
          setTotalReviews([])
        }
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

  //delete review
  const deleteReview = async (payload) => {
    try {
      const response = await deleteReviews(payload)
      console.log(response)
      if (response.status === 200) {
        dispatch(
          updateSuccess({
            status: true,
            msg: `Review is deleted successfully`
          })
        )
        dispatch(
          updateRefreshReviews({
            data: true
          })
        )
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
    if (refresh) {
      //get reviews for item on load
      getAverageReviewsForItemLocal({ id: itemId })
      getReviewsForItemLocal({ id: itemId })
      dispatch(
        updateRefreshReviews({
          data: false
        })
      )
      setEditReviewModal({ state: false, data: {} })
    }
  }, [refresh])

  return (
    <Space direction='vertical' size='large' style={{ width: '70%' }}>
      <Title level={3}>{`Reviews (${averageReviews.total_reviews})`}</Title>
      <Rate disabled value={averageReviews.average_rating} allowHalf />
      <List
        itemLayout='horizontal'
        dataSource={totalReviews}
        renderItem={(review, index) => (
          <List.Item
            actions={
              currentUser.userDetails.username === review.user_id
                ? [
                    <a key='list-loadmore-edit' onClick={() => setEditReviewModal({ state: true, inEdit: true, data: review })}>
                      edit
                    </a>,
                    <Popconfirm
                      title='Delete review'
                      description='Are you sure to delete this review?'
                      onConfirm={() => deleteReview(review)}
                      okText='Yes'
                      cancelText='No'
                    >
                      <a key='list-loadmore-more'>delete</a>
                    </Popconfirm>
                  ]
                : []
            }
          >
            <List.Item.Meta
              key={review.review_id}
              avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=8`} />}
              title={<Rate disabled value={review.rating} allowHalf />}
              description={`${dayDifference(review.created_at)} day(s) ago by ${review.user_id}`}
            />
            {review.comment}
          </List.Item>
        )}
      />
      {editReviewModal.state && <ReviewsFormModal modalDetails={editReviewModal} updateModalDetails={setEditReviewModal} />}
    </Space>
  )
}
