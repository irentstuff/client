/* -------------------------------------------------------------------------- */
/*                                   IMPORT                                   */
/* -------------------------------------------------------------------------- */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateError, updateSuccess } from '../redux/reducer'
/* ------------------------------- COMPONENTS ------------------------------- */
import { Modal, Col, Form, Input, Row, Select, DatePicker, Button, Space } from 'antd'
import { UploadImage } from './UploadImage'
import { formItemLayout, tailFormItemLayout, conditionOptions, availabilityOptions, assetsURL } from '../services/config'
import { createNewPurchase } from '../services/api'

/* -------------------------------------------------------------------------- */
/*                                  ITEM EDIT                                 */
/* -------------------------------------------------------------------------- */
export const PurchaseForm = ({ itemDetails }) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const currentUser = useSelector((state) => state.iRentStuff.currentUser)

  const createNewPurchaseLocal = async (payload) => {
    try {
      const response = await createNewPurchase(payload, itemDetails.id)
      console.log(response)
      if (response.status === 200) {
        dispatch(
          updateSuccess({
            status: true,
            msg: `Purchase offer is made successfully`
          })
        )
      } else {
        dispatch(
          updateError({
            status: true,
            msg: `${response.statusText} - ${response.message}`
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
    console.log(values)

    const formattedPayload = {
      users: { owner_id: itemDetails.owner, buyer_id: currentUser.userDetails.username },
      purchase_details: {
        purchase_price: parseFloat(values.purchase_price)
      }
    }

    console.log(formattedPayload)
    createNewPurchaseLocal(formattedPayload)
  }

  return (
    <>
      <Row justify='center' style={{ paddingTop: '2em' }}>
        <Col xs={24} xl={12}>
          <Form
            {...formItemLayout}
            form={form}
            name='makeOffer'
            style={{
              maxWidth: 850
            }}
            scrollToFirstError
            onFinish={onFinish}
          >
            <Space direction='vertical'>
              <Form.Item
                name='purchase_price'
                label='Purchase Price'
                rules={[
                  {
                    required: true,
                    message: 'Please input your purchase price!'
                  }
                ]}
              >
                <Input prefix='$' suffix='SGD' type='number' step='0.01' />
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button type='primary' htmlType='submit'>
                  Make Purchase Offer
                </Button>
              </Form.Item>
            </Space>
          </Form>
        </Col>
      </Row>
    </>
  )
}
