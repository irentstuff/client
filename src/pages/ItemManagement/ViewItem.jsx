/* -------------------------------------------------------------------------- */
/*                                   IMPORT                                   */
/* -------------------------------------------------------------------------- */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { updateError, updateSuccess } from '../../redux/reducer'
import default_img from '../../assets/img-placeholder.png'
/* ------------------------------- COMPONENTS ------------------------------- */
import { Popconfirm, Avatar, Button, Card, Col, Form, Row, Space, Typography } from 'antd'
import { UploadImage } from '../../components/UploadImage'
import { deleteItem, getReviewsForItem, getAverageReviewsForItem } from '../../services/api'
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

  const currentUserIsItemOwner = currentUser?.userDetails.userId === itemDetails?.owner

  const [editItemModule, setEditItemModule] = useState({ state: false, data: {} })

  console.log(itemDetails)
  console.log(currentUserIsItemOwner)
  console.log(editItemModule)

  /* ------------------------------ api services ------------------------------ */
  const deleteItemLocal = async (payload) => {
    try {
      const response = await deleteItem(payload)
      console.log(response)
      if (response.status === 200) {
        dispatch(
          updateSuccess({
            status: true,
            msg: `Item is deleted successfully`
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

  //get reviews for item
  const getAverageReviewsForItemLocal = async (payload) => {
    try {
      const response = await getAverageReviewsForItem(payload)
      console.log(response)
      if (response.status === 200) {
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

  /* ----------------------------- page functions ----------------------------- */
  const normFile = (e) => {
    console.log('Upload event:', e)
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }

  const confirm = () => {
    console.log(itemDetails)
    deleteItemLocal(itemDetails)
  }

  useEffect(() => {
    //get reviews for item on load
    // getAverageReviewsForItemLocal(itemDetails)
    // getReviewsForItemLocal(itemDetails)
  }, [itemDetails])

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
              description={
                <Text>
                  {itemDetails.owner} {itemDetails.created_date}
                </Text>
              }
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
                  <Row gutter={8}>
                    <Col>
                      <Button onClick={() => setEditItemModule({ state: true, data: itemDetails })}>Edit Item</Button>
                    </Col>
                    <Col>
                      <Popconfirm
                        title={`Delete item: ${itemDetails.title}`}
                        description='Are you sure to delete this item?'
                        onConfirm={confirm}
                        okText='Yes'
                        cancelText='No'
                      >
                        <Button danger>Delete Item</Button>
                      </Popconfirm>
                    </Col>
                  </Row>
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
