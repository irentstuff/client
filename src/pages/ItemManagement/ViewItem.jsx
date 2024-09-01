/* -------------------------------------------------------------------------- */
/*                                   IMPORT                                   */
/* -------------------------------------------------------------------------- */
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { updateError, updateSuccess } from '../../redux/reducer'
import default_img from '../../assets/img-placeholder.png'
/* ------------------------------- COMPONENTS ------------------------------- */
import { Avatar, Button, Card, Checkbox, Col, Form, Input, Row, Select, Space, Typography } from 'antd'
import { UploadImage } from '../../components/UploadImage'
import { createNewItem } from '../../services/api'
import { formItemLayout, tailFormItemLayout, categoryOptions, conditionOptions, availabilityOptions } from '../../services/config'
import { ItemEditModule } from '../../components/ItemEditModule'
const { Meta } = Card
const { Title, Text } = Typography

/* -------------------------------------------------------------------------- */
/*                                  ADD ITEM                                  */
/* -------------------------------------------------------------------------- */
export const ViewItem = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { state } = location

  const itemDetails = state
  console.log(itemDetails)

  const allUsers = useSelector((state) => state.iRentStuff.allUsers)
  const userDetails = allUsers.find((user) => user.id === itemDetails.owner)
  const currentUser = useSelector((state) => state.iRentStuff.currentUser)
  const allItemCategories = useSelector((state) => state.iRentStuff.allItemCategories)

  const currentUserIsItemOwner = currentUser?.userDetails[0]?.id === itemDetails?.owner

  const [editItemModule, setEditItemModule] = useState({ state: false, data: {} })

  console.log(itemDetails)
  console.log(currentUserIsItemOwner)
  console.log(editItemModule)

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

  const normFile = (e) => {
    console.log('Upload event:', e)
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }

  const onFinish = (values) => {
    const formattedPayload = { ...values, created_date: new Date(), owner: currentUser.userDetails[0].id }
    console.log(formattedPayload)
    createNewItemLocal(formattedPayload)
  }

  return (
    <>
      <Space
        direction='vertical'
        size='middle'
        style={{
          display: 'flex',
          paddingTop: '25px'
        }}
      >
        <Card
          title={
            <Meta
              avatar={<Avatar src='https://api.dicebear.com/7.x/miniavs/svg?seed=8' />}
              description={<Text>{userDetails ? userDetails.username : itemDetails.owner}</Text>}
            />
          }
          style={{ textAlign: 'left' }}
        >
          <Row justify={'start'}>
            <Col xs={24} xl={8}>
              <img
                alt=''
                src={itemDetails.img_path}
                onError={(event) => {
                  event.target.src = { default_img }
                  event.onerror = null
                }}
              />
            </Col>
            <Col xs={24} xl={16}>
              <Space direction='vertical' size={'large'}>
                <Title level={3}>{itemDetails.title}</Title>

                <Text ellipsis={true}>
                  Category:
                  <Text strong>{` ${allItemCategories.find((cat) => cat.id == itemDetails.category).label}`}</Text>
                </Text>

                <Text>
                  Description: <Text strong>{`${itemDetails.description}`}</Text>
                </Text>

                <Text>
                  Condition:
                  <Text strong>{` ${itemDetails.condition}`}</Text>
                </Text>

                <Text>
                  Rental Price (per day):
                  <Text strong>{` $${itemDetails.price_per_day}`}</Text>
                </Text>

                <Text>
                  Deposit Price (per day):
                  <Text strong>{` $${itemDetails.deposit}`}</Text>
                </Text>

                {currentUserIsItemOwner ? (
                  <Button onClick={() => setEditItemModule({ state: true, data: itemDetails })}>Edit Item</Button>
                ) : (
                  <Button>Make Offer</Button>
                )}
              </Space>
            </Col>
          </Row>
        </Card>
      </Space>
      {editItemModule.state && <ItemEditModule modalDetails={editItemModule} updateModalDetails={setEditItemModule} />}
    </>
  )
}
