/* -------------------------------------------------------------------------- */
/*                                   IMPORT                                   */
/* -------------------------------------------------------------------------- */
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateError, updateSuccess } from '../redux/reducer'
/* ------------------------------- COMPONENTS ------------------------------- */
import { Modal, Col, Form, Input, Row, Select } from 'antd'
import { formItemLayout, conditionOptions, availabilityOptions } from '../services/config'
import { editItem } from '../services/api'

/* -------------------------------------------------------------------------- */
/*                                  ITEM EDIT                                 */
/* -------------------------------------------------------------------------- */
export const ItemEditModule = ({ modalDetails, updateModalDetails }) => {
  console.log(modalDetails)
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const allItemCategories = useSelector((state) => state.iRentStuff.allItemCategories)

  const itemDetails = modalDetails?.data
  console.log(itemDetails)

  const editNewItemLocal = async (payload) => {
    try {
      const response = await editItem(payload)
      console.log(response)
      if (response.status === 200) {
        dispatch(
          updateSuccess({
            status: true,
            msg: `Item is edited successfully`
          })
        )
        navigate('/MyItems')
        window.location.reload()
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
    const formattedPayload = { ...itemDetails, ...values }
    console.log(formattedPayload)
    editNewItemLocal(formattedPayload)
  }

  return (
    <>
      <Modal
        width={1000}
        title={`Edit Item`}
        open={modalDetails.state}
        okText='Edit Item'
        onOk={() => onFinish()}
        onCancel={() => updateModalDetails({ state: false, data: {} })}
      >
        <Row justify='center'>
          <Col xs={24} xl={12}>
            <Form
              {...formItemLayout}
              form={form}
              name='editItem'
              initialValues={itemDetails}
              style={{
                maxWidth: 850
              }}
              scrollToFirstError
            >
              <Form.Item
                name='title'
                label='Title'
                rules={[
                  {
                    required: true,
                    message: 'Please input your item title!',
                    whitespace: true
                  }
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name='description'
                label='Description'
                // rules={[
                //   {
                //     required: true,
                //     message: 'Please input your nickname!',
                //     whitespace: true
                //   }
                // ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name='category'
                label='Category'
                rules={[
                  {
                    required: true,
                    message: 'Please input your item catgory!'
                  }
                ]}
              >
                <Select
                  defaultValue={` ${allItemCategories.find((cat) => cat.id == itemDetails.category).label}`}
                  onChange={(value) => form.setFieldsValue({ category: value })}
                  options={allItemCategories}
                />{' '}
              </Form.Item>

              <Form.Item
                name='condition'
                label='Item Condition'
                rules={[
                  {
                    required: true,
                    message: 'Please input your item condition!'
                  }
                ]}
              >
                <Select
                  defaultValue={itemDetails.condition}
                  onChange={(value) => form.setFieldsValue({ condition: value })}
                  options={conditionOptions}
                />{' '}
              </Form.Item>

              <Form.Item
                name='availability'
                label='Item Availability'
                rules={[
                  {
                    required: true,
                    message: 'Please input your item availability!'
                  }
                ]}
              >
                <Select
                  defaultValue={itemDetails.availability}
                  onChange={(value) => form.setFieldsValue({ availability: value })}
                  options={availabilityOptions}
                />{' '}
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
                <Input prefix='$' suffix='SGD' type='number' step='0.01' />
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
                <Input prefix='$' suffix='SGD' type='number' step='0.01' />
              </Form.Item>

              {/* <Form.Item
                name='upload'
                label='Upload'
                valuePropName='fileList'
                tooltip='Only 6 images are allowed.'
                getValueFromEvent={normFile}
              >
                <UploadImage files={normFile} />
              </Form.Item> */}
            </Form>
          </Col>
        </Row>
      </Modal>
    </>
  )
}
