/* -------------------------------------------------------------------------- */
/*                                   IMPORT                                   */
/* -------------------------------------------------------------------------- */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateError, updateSuccess } from '../redux/reducer'
import moment from 'moment'
/* ------------------------------- COMPONENTS ------------------------------- */
import { Modal, Col, Form, Input, Row, Select } from 'antd'
import { UploadImage } from '../components/UploadImage'
import { formItemLayout, conditionOptions, availabilityOptions, assetsURL } from '../services/config'
import { editItem, uploadItemImage, deleteItemImage } from '../services/api'

/* -------------------------------------------------------------------------- */
/*                                  ITEM EDIT                                 */
/* -------------------------------------------------------------------------- */
export const ItemEditModule = ({ modalDetails, updateModalDetails }) => {
  console.log(modalDetails)
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const itemDetails = modalDetails?.data
  const itemImagePath = modalDetails?.itemImagePath

  const allItemCategories = useSelector((state) => state.iRentStuff.allItemCategories)
  const [uploadedFileList, setUploadedFileList] = useState([])

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

  const deleteItemImageLocal = async (imageUrl) => {
    try {
      console.log(imageUrl)

      const response = await deleteItemImage(imageUrl)
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

  const onFinish = () => {
    let imageFolderUrl = ''
    let uploadedImageUrl = []

    //update images
    if (
      itemDetails.image.endsWith('.jpg') ||
      itemDetails.image.endsWith('.jpeg') ||
      itemDetails.image.endsWith('.png') ||
      itemDetails.image == ''
    ) {
      imageFolderUrl = `${assetsURL}/${itemDetails.id}`
    } else {
      imageFolderUrl = itemDetails.image
    }

    console.log(imageFolderUrl)

    if (imageFolderUrl !== undefined) {
      console.log(uploadedFileList)

      uploadedFileList.map((img) => {
        let imageUrl = ''

        if (img.hasOwnProperty('originFileObj')) {
          const imageUrl = `${imageFolderUrl}/${img.originFileObj.uid}_${moment().format('YYYYMMDD_HH:mm:ss')}`
          uploadItemImageLocal(img.originFileObj, imageUrl)
        } else {
          imageUrl = img.url
        }

        uploadedImageUrl.push(imageUrl)
      })

      //delete images that are not in uploadedFileList
      const imagesToDelete = itemImagePath
        .filter((item) => !uploadedImageUrl.includes(item))
        .filter((imageUrl) => imageUrl.includes('irentstuff-assets'))
      console.log(imagesToDelete)
      imagesToDelete.map((img) => {
        deleteItemImageLocal(img)
      })
    }

    const values = form.getFieldsValue()
    const formattedPayload = { ...itemDetails, ...values, image: imageFolderUrl }
    console.log(formattedPayload)
    editNewItemLocal(formattedPayload)
  }

  useEffect(() => {
    let fileList = []
    itemImagePath.map((item) => {
      fileList.push({
        url: item
      })
    })
    setUploadedFileList(fileList)
  }, [])

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

              <Form.Item name='upload' label='Upload' valuePropName='fileList' tooltip='Only 6 images are allowed.'>
                <UploadImage uploadedFileList={uploadedFileList} setFileList={setUploadedFileList} />
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Modal>
    </>
  )
}
