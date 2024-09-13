/* -------------------------------------------------------------------------- */
/*                                   IMPORT                                   */
/* -------------------------------------------------------------------------- */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateError, updateSuccess } from '../redux/reducer'
import { createNewReview } from '../services/api'
/* ------------------------------- COMPONENTS ------------------------------- */
import { Col, Form, Input, Row, Rate, Button } from 'antd'

/* -------------------------------------------------------------------------- */
/*                                REVIEWS CRUD                                */
/* -------------------------------------------------------------------------- */
export const ReviewsForm = ({ item_id, rental_id }) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const currentUser = useSelector((state) => state.iRentStuff.currentUser)

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
        // navigate('/MyItems')
        // window.location.reload()
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
    const formattedPayload = { ...values, item_id: item_id, user_id: currentUser.userDetails.userId }
    console.log(formattedPayload)
    createReviewsLocal(formattedPayload)
  }

  return (
    <>
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
              <Rate onChange={(value) => form.setFieldsValue({ rating: value })} />;
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
    </>
  )
}
