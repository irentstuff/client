/* -------------------------------------------------------------------------- */
/*                                   IMPORT                                   */
/* -------------------------------------------------------------------------- */
import { useDispatch, useSelector } from 'react-redux'
import { updateError, updateSuccess } from '../redux/reducer'
import moment from 'moment'
/* ------------------------------- COMPONENTS ------------------------------- */
import { Col, Form, Input, Row, DatePicker, Button, Space } from 'antd'
import { modalFormItemLayout, tailFormItemLayout } from '../services/config'
import { createNewRental } from '../services/api'

const { RangePicker } = DatePicker

/* -------------------------------------------------------------------------- */
/*                                  ITEM EDIT                                 */
/* -------------------------------------------------------------------------- */
export const RentalForm = ({ itemDetails, setFetchDataAgain, updateModalDetails }) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const currentUser = useSelector((state) => state.iRentStuff.currentUser)

  const createNewRentalLocal = async (payload) => {
    try {
      const response = await createNewRental(payload, itemDetails.id)
      console.log(response)
      if (response.status === 200) {
        dispatch(
          updateSuccess({
            status: true,
            msg: `Rental offer is made successfully`
          })
        )
        setFetchDataAgain(true)
        updateModalDetails({ state: false, data: {} })
      } else {
        dispatch(
          updateError({
            status: true,
            msg: `${response.statusText} - ${response.data}`
          })
        )
      }
    } catch (error) {
      dispatch(
        updateError({
          status: true,
          msg: `${error.message}. ${error?.response?.data}`
        })
      )
    }
  }

  const onFinish = () => {
    const values = form.getFieldsValue()

    const formattedPayload = {
      users: { owner_id: itemDetails.owner, renter_id: currentUser.userDetails.username },
      rental_details: {
        start_date: moment(values.rental_dates[0], 'x').format('YYYY-MM-DD'),
        end_date: moment(values.rental_dates[1], 'x').format('YYYY-MM-DD'),
        price_per_day: parseFloat(values.price_per_day),
        deposit: parseFloat(values.deposit)
      }
    }

    console.log(formattedPayload)
    createNewRentalLocal(formattedPayload)
  }

  return (
    <Row justify='center' style={{ paddingTop: '2em' }}>
      <Col xs={24} xl={12}>
        <Form
          {...modalFormItemLayout}
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
              name='rental_dates'
              label='Rental Dates'
              rules={[
                {
                  required: true,
                  message: 'Please input your rental dates!'
                },
                {
                  validator: (_, value) =>
                    value && // Custom validation: check if the date is in the future
                    Promise.resolve()
                }
              ]}
            >
              <RangePicker
                disabledDate={(current) => {
                  return moment().add(-1, 'days') >= current
                }}
              />
            </Form.Item>

            <Form.Item
              name='price_per_day'
              label='Price Per Day'
              rules={[
                {
                  required: true,
                  message: 'Please input your rental price!'
                }
              ]}
            >
              <Input prefix='$' suffix='SGD' type='number' step='0.01' placeholder={itemDetails.price_per_day} />
            </Form.Item>

            <Form.Item
              name='deposit'
              label='Deposit'
              rules={[
                {
                  required: true,
                  message: 'Please input your deposit price!'
                }
              ]}
            >
              <Input prefix='$' suffix='SGD' type='number' step='0.01' placeholder={itemDetails.deposit} />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button type='primary' htmlType='submit'>
                Make Rental Offer
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </Col>
    </Row>
  )
}
