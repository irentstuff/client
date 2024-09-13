/* -------------------------------------------------------------------------- */
/*                                   IMPORT                                   */
/* -------------------------------------------------------------------------- */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { updateError, updateSuccess } from '../../redux/reducer'
/* ------------------------------- COMPONENTS ------------------------------- */
import { Popconfirm, Avatar, Button, Card, Col, Form, Row, Space, Typography, Image, Tag } from 'antd'
import { deleteItem, getItemImage, getReviewsForItem, getAverageReviewsForItem } from '../../services/api'
import { ItemEditModule } from '../../components/ItemEditModule'
import { MakeOfferModule } from '../../components/MakeOfferModule'
import { assetsURL, availabilityOptions } from '../../services/config'
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

  // Calculate the difference in milliseconds
  const diffInMs = new Date() - new Date(itemDetails.created_date)

  console.log(itemDetails)

  const allUsers = useSelector((state) => state.iRentStuff.allUsers)
  const userDetails = allUsers.find((user) => user.id === itemDetails.owner)
  const currentUser = useSelector((state) => state.iRentStuff.currentUser)
  const allItemCategories = useSelector((state) => state.iRentStuff.allItemCategories)

  const currentUserIsItemOwner =
    currentUser?.userDetails.userId === itemDetails?.owner || currentUser?.userDetails.username === itemDetails?.owner

  const [editItemModule, setEditItemModule] = useState({ state: false, data: {} })
  const [makeOfferModule, setMakeOfferModule] = useState({ state: false, data: {} })
  const [itemImagePath, setItemImagePath] = useState([])

  console.log(itemDetails)
  console.log(itemImagePath)
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

  //get images
  const getItemImageLocal = async (imageUrl) => {
    try {
      const response = await getItemImage(imageUrl)
      console.log(response)
      if (response.status === 200) {
        if (response.data.length > 0 && response.data !== null) {
          let imagePath = []
          response.data.map((image) => {
            const path = `${imageUrl}/${image.Key.substring(image.Key.lastIndexOf('/') + 1)}`
            imagePath.push(path)
          })
          setItemImagePath(imagePath)
        }
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
    //get item images
    if (itemDetails.image.endsWith('.jpg') || itemDetails.image.endsWith('.jpeg') || itemDetails.image.endsWith('.png')) {
      setItemImagePath([itemDetails.image])
    } else if (itemDetails.image !== '') {
      getItemImageLocal(itemDetails.image)
    }

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
                <>
                  {' '}
                  <Text>
                    Listed {Math.ceil(diffInMs / (1000 * 60 * 60 * 24))} days ago by {itemDetails.owner}
                  </Text>
                  <Tag
                    style={{ float: 'right' }}
                    bordered={false}
                    color={availabilityOptions.find((option) => option.value == itemDetails.availability).color}
                  >
                    {availabilityOptions.find((option) => option.value == itemDetails.availability).label}
                  </Tag>
                </>
              }
            />
          }
          style={{ textAlign: 'left' }}
        >
          <Row justify={'start'}>
            <Col xs={24} xl={8}>
              {itemImagePath.length == 0 ? (
                <Image className='centered-image' src={`${assetsURL}/common/no-img.jpg`} preview={false} />
              ) : (
                <Image.PreviewGroup
                  preview={{
                    onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`)
                  }}
                >
                  {itemImagePath.map((imagePath) => (
                    <Image key={imagePath} width={200} src={`${imagePath}`} />
                  ))}
                </Image.PreviewGroup>
              )}
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
                      <Button onClick={() => setEditItemModule({ state: true, data: itemDetails, itemImagePath: itemImagePath })}>
                        Edit Item
                      </Button>
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
                  <Button onClick={() => setMakeOfferModule({ state: true, data: itemDetails })}>Make Offer</Button>
                )}
              </Space>
            </Col>
          </Row>
        </Card>
      </Space>
      {editItemModule.state && <ItemEditModule modalDetails={editItemModule} updateModalDetails={setEditItemModule} />}
      {makeOfferModule.state && <MakeOfferModule modalDetails={makeOfferModule} updateModalDetails={setMakeOfferModule} />}
    </>
  )
}
