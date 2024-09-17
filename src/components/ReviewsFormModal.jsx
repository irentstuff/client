/* -------------------------------------------------------------------------- */
/*                                   IMPORT                                   */
/* -------------------------------------------------------------------------- */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateError, updateSuccess } from '../redux/reducer'
import { createNewReview, editReview } from '../services/api'
/* ------------------------------- COMPONENTS ------------------------------- */
import { Col, Form, Input, Row, Rate, Button, Modal } from 'antd'

/* -------------------------------------------------------------------------- */
/*                                REVIEWS CRUD                                */
/* -------------------------------------------------------------------------- */
export const ReviewsFormModal = ({ modalDetails, updateModalDetails, setRefresh }) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  console.log(modalDetails)
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
        updateModalDetails({ state: false, data: {} })
        // setRefresh(true)
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
        setRefresh(true)
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
        item_id: modalDetails.data.item_id,
        rental_id: modalDetails.data.rental_id,
        user_id: currentUser.userDetails.username,
        created: new Date()
      }
      console.log(formattedPayload)
      createReviewsLocal(formattedPayload)
    } else {
      const formattedPayload = { ...modalDetails.data, ...values }
      console.log(formattedPayload)
      editReviewsLocal(formattedPayload)
    }
  }

  useEffect(() => {
    if (modalDetails.inEdit) {
      form.setFieldsValue({ rating: modalDetails.data.rating })
    }
  }, [modalDetails])

  return (
    <>
      <Modal
        width={1000}
        title={`${modalDetails.inEdit ? 'Edit' : 'Add'} Review`}
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
                <Rate onChange={(value) => form.setFieldsValue({ rating: value })} defaultValue={modalDetails.data?.rating} />;
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
    </>
  )
}
