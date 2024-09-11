/* -------------------------------------------------------------------------- */
/*                                   IMPORT                                   */
/* -------------------------------------------------------------------------- */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateError, updateSuccess } from '../../redux/reducer'
/* ------------------------------- COMPONENTS ------------------------------- */
import { Button, Col, Form, Input, Row, Select, Space, Typography } from 'antd'
import { UploadImage } from '../../components/UploadImage'
import { createNewItem, uploadItemImage, editItem } from '../../services/api'
import { formItemLayout, tailFormItemLayout, conditionOptions, availabilityOptions, assetsURL } from '../../services/config'
const { Title } = Typography

/* -------------------------------------------------------------------------- */
/*                                  ADD ITEM                                  */
/* -------------------------------------------------------------------------- */
export const AddItem = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const currentUser = useSelector((state) => state.iRentStuff.currentUser)
  const allItemCategories = useSelector((state) => state.iRentStuff.allItemCategories)
  const [uploadedFileList, setFileList] = useState([])

  const createNewItemLocal = async (payload) => {
    try {
      const response = await createNewItem(payload)
      console.log(response)
      if (response.status === 200) {
        dispatch(
          updateSuccess({
            status: true,
            msg: `Item is added successfully`
          })
        )
        return response.data
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

  const uploadItemImageLocal = async (payload, imageUrl) => {
    try {
      console.log(payload, imageUrl)

      const response = await uploadItemImage(payload, imageUrl)
      console.log(response)
      if (response.status === 200) {
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

  const onFinish = async (values) => {
    const formattedPayload = { ...values, created_date: new Date(), owner: currentUser.userDetails.userId }
    console.log(formattedPayload)
    const createdResponsed = await createNewItemLocal(formattedPayload)
    const imageFolderUrl = `${assetsURL}/${createdResponsed.id}`
    // const imageFolderUrl = `${assetsURL}/72`

    //upload image based on imageid created
    console.log(uploadedFileList)
    if (imageFolderUrl !== undefined) {
      uploadedFileList.map((img) => {
        const imageUrl = `${imageFolderUrl}/${img.originFileObj.name}`
        uploadItemImageLocal(img.originFileObj, imageUrl)
      })
    }

    //update items with image path
    editNewItemLocal({ ...createdResponsed, image: imageFolderUrl })
  }

  return (
    <>
      <Space
        direction='vertical'
        size='large'
        style={{
          display: 'flex'
        }}
      >
        <Title type={3}>Add New Item</Title>
        <Row justify='center'>
          <Col xs={24} xl={12}>
            <Form
              {...formItemLayout}
              form={form}
              name='addNewItem'
              initialValues={{ availability: 'available', description: '' }}
              onFinish={onFinish}
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
                <Select defaultValue='' onChange={(value) => form.setFieldsValue({ category: value })} options={allItemCategories} />{' '}
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
                <Select defaultValue='' onChange={(value) => form.setFieldsValue({ condition: value })} options={conditionOptions} />{' '}
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
                  defaultValue='available'
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

              <Form.Item name='upload' label='Upload' valuePropName='fileList' tooltip='Only 6 images are allowed.'>
                <UploadImage fileList={uploadedFileList} setFileList={setFileList} />
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button type='primary' htmlType='submit'>
                  Add New Item
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Space>
    </>
  )
}
