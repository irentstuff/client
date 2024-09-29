/* -------------------------------------------------------------------------- */
/*                                   IMPORT                                   */
/* -------------------------------------------------------------------------- */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateRefreshReviews, updateError, updateSuccess } from '../redux/reducer'
import { createNewReview, editReview, getReviewsForUser } from '../services/api'
/* ------------------------------- COMPONENTS ------------------------------- */
import { Col, Form, Input, Row, Rate, Button, Modal } from 'antd'

/* -------------------------------------------------------------------------- */
/*                                REVIEWS CRUD                                */
/* -------------------------------------------------------------------------- */
export const ReviewsFormModal = ({ modalDetails, updateModalDetails }) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  console.log(modalDetails)
  const initModalDetails = modalDetails
  const currentUser = useSelector((state) => state.iRentStuff.currentUser)
  const [reviewsByCurrentUser, setReviewsByCurrentUser] = useState([])
  const [rateValue, setRateValue] = useState(0)

  const createReviewsLocal = async (payload) => {
    try {
      const response = await createNewReview(payload)
      console.log(response)
      if (response.status === 200) {
        dispatch(
          updateSuccess({
            status: true,
            msg: `Reviews is added successfully`
          })
        )
        updateModalDetails({ state: false, data: {} })
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

  const editReviewsLocal = async (payload) => {
    try {
      const response = await editReview(payload)
      console.log(response)
      if (response.status === 200) {
        dispatch(
          updateSuccess({
            status: true,
            msg: `Review is edited successfully`
          })
        )
        updateModalDetails({ state: false, data: {} })
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

  const onFinish = () => {
    const values = form.getFieldsValue()
    if (!modalDetails.inEdit) {
      const formattedPayload = {
        ...values,
        rating: rateValue,
        item_id: modalDetails.data.item_id,
        rental_id: modalDetails.data.rental_id,
        user_id: currentUser.userDetails.username,
        created: new Date()
      }
      console.log(formattedPayload)
      createReviewsLocal(formattedPayload)
    } else {
      const formattedPayload = { ...modalDetails.data, ...values, rating: rateValue }
      console.log(formattedPayload)
      editReviewsLocal(formattedPayload)
    }
  }

  //check if user has reviewed before when component is triggered from offers pages
  const getReviewsForUserLocal = async (payload) => {
    try {
      const response = await getReviewsForUser(payload)
      console.log(response)
      if (response.status === 200) {
        console.log(response.data)
        setReviewsByCurrentUser(response.data)
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
    console.log(modalDetails)
    if (modalDetails.inEdit) {
      form.setFieldsValue({ rating: modalDetails?.data?.rating, comment: modalDetails?.data?.comment })
      setRateValue(modalDetails?.data?.rating)
    }
  }, [modalDetails])

  useEffect(() => {
    if (currentUser?.userDetails?.username) {
      getReviewsForUserLocal(currentUser.userDetails.username)
    }
  }, [currentUser])

  useEffect(() => {
    const reviewByUserForItemAndRental = reviewsByCurrentUser.filter(
      (review) => review.item_id === initModalDetails.data.item_id && review.rental_id === initModalDetails.data.rental_id
    )

    console.log(reviewByUserForItemAndRental)
    if (reviewByUserForItemAndRental.length > 0) {
      updateModalDetails({ ...initModalDetails, inEdit: true, data: reviewByUserForItemAndRental[0] })
    }
  }, [reviewsByCurrentUser])

  return (
    <Modal
      width={1000}
      title={`${modalDetails.inEdit ? 'Edit Your Previous' : 'Leave a'} Review`}
      open={modalDetails.state}
      footer={null}
      onCancel={() => updateModalDetails({ state: false, data: {} })}
    >
      <Row justify='start'>
        <Col xs={24} xl={12}>
          <Form
            form={form}
            name='reviews'
            style={{
              maxWidth: 850
            }}
            scrollToFirstError
            onFinish={onFinish}
            initialValues={modalDetails.inEdit ? modalDetails.data : {}}
          >
            <Form.Item
              name='rating'
              // label='Rating'
              rules={[
                {
                  required: true,
                  message: 'Please input your rating!'
                }
              ]}
            >
              <Rate
                onChange={(value) => {
                  setRateValue(value)
                  form.setFieldsValue({ rating: value })
                }}
                value={rateValue}
              />
            </Form.Item>

            <Form.Item name='comment'>
              <Input placeholder='Leave a review.' />
            </Form.Item>

            <Button type='primary' htmlType='submit'>
              Submit Review
            </Button>
          </Form>
        </Col>
      </Row>
    </Modal>
  )
}
