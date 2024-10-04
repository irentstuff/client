/* -------------------------------------------------------------------------- */
/*                                   IMPORT                                   */
/* -------------------------------------------------------------------------- */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { updateError, updateSuccess, updateRefreshReviews } from '../../redux/reducer'
/* ------------------------------- COMPONENTS ------------------------------- */
import { Popconfirm, Avatar, Button, Card, Col, Row, Space, Typography, Image, Tag, Empty } from 'antd'
import { deleteItem, getItemImage } from '../../services/api'
import { ItemEditModal } from '../../components/ItemEditModal'
import { MakeOfferModal } from '../../components/MakeOfferModal'
import { ReviewsOverview } from '../../components/ReviewsOverview'
import { assetsURL, availabilityOptions, dayDifference, getCategoryLabel } from '../../services/config'

const { Meta } = Card
const { Title, Text } = Typography

/* -------------------------------------------------------------------------- */
/*                                  ADD ITEM                                  */
/* -------------------------------------------------------------------------- */
export const ViewItem = ({ setFetchDataAgain, itemDetailsFromOffer }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()
  const { state } = location
  const { itemId } = params

  console.log(itemId)

  const currentUser = useSelector((storeState) => storeState.iRentStuff.currentUser)
  const allItemCategories = useSelector((storeState) => storeState.iRentStuff.allItemCategories)
  const allItemsMap = useSelector((storeState) => storeState.iRentStuff.allItemsMap)

  const [itemDetails, setItemDetails] = useState({})

  const currentUserIsItemOwner =
    currentUser?.userDetails.userId === itemDetails?.owner || currentUser?.userDetails.username === itemDetails?.owner

  const [editItemModal, setEditItemModal] = useState({ state: false, data: {} })
  const [makeOfferModal, setMakeOfferModal] = useState({ state: false, data: {} })
  const [itemImagePath, setItemImagePath] = useState([])
  const [getImageAgain, setGetImageAgain] = useState(false)

  console.log(itemDetails)
  console.log(itemImagePath)
  console.log(currentUserIsItemOwner)
  console.log(editItemModal)

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
        setFetchDataAgain(true)
        navigate('/MyItems')
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
        if (response.data !== null && response.data.length > 0) {
          const imagePath = response.data.map((image) => {
            const path = `${imageUrl}/${image.Key.substring(image.Key.lastIndexOf('/') + 1)}`
            return path
          })
          setItemImagePath(imagePath)
        } else {
          setItemImagePath([])
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

  /* ----------------------------- page functions ----------------------------- */
  const confirm = () => {
    console.log(itemDetails)
    deleteItemLocal(itemDetails)
  }

  useEffect(() => {
    if (itemDetailsFromOffer !== undefined) {
      setItemDetails(itemDetailsFromOffer)
    }

    setItemDetails(state)
  }, [])

  useEffect(() => {
    if (itemId !== undefined) {
      setItemDetails(allItemsMap[itemId])
    }
  }, [itemId, allItemsMap])

  useEffect(() => {
    //update reviews refresh
    dispatch(
      updateRefreshReviews({
        data: true
      })
    ) //get item images
    if (itemDetails?.image) {
      if (itemDetails?.image.endsWith('.jpg') || itemDetails?.image.endsWith('.jpeg') || itemDetails?.image.endsWith('.png')) {
        setItemImagePath([itemDetails.image])
      } else if (itemDetails?.image !== '') {
        getItemImageLocal(`${assetsURL}/${itemDetails.id}`)
      }
      setGetImageAgain(false)
    }
  }, [itemDetails, getImageAgain])

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
        {itemDetails == undefined ? (
          <Empty />
        ) : (
          <Card
            title={
              <Meta
                avatar={<Avatar src='https://api.dicebear.com/7.x/miniavs/svg?seed=8' />}
                description={
                  <>
                    {' '}
                    <Text>
                      Listed {dayDifference(itemDetails?.created_date)} days ago by {itemDetails?.owner}
                    </Text>
                    <Tag
                      style={{ float: 'right' }}
                      bordered={false}
                      color={availabilityOptions.find((option) => option.value === itemDetails?.availability)?.color}
                    >
                      {availabilityOptions.find((option) => option.value === itemDetails?.availability)?.label}
                    </Tag>
                  </>
                }
              />
            }
            style={{ textAlign: 'left' }}
          >
            <Row justify='start'>
              <Col xs={24} xl={8}>
                {itemImagePath.length === 0 ? (
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
                <Space direction='vertical' size='large'>
                  <Title level={3}>{itemDetails?.title}</Title>

                  <Text ellipsis={true}>
                    Category:
                    <Text strong>
                      {/* {` ${allItemCategories.find((cat) => cat.value === itemDetails.category || cat.id === itemDetails.category).label}`}*/}
                      {` ${getCategoryLabel(allItemCategories, itemDetails?.category)}`}
                    </Text>
                  </Text>

                  <Text>
                    Description: <Text strong>{`${itemDetails?.description}`}</Text>
                  </Text>

                  <Text>
                    Condition:
                    <Text strong>{` ${itemDetails?.condition}`}</Text>
                  </Text>

                  <Text>
                    Rental Price (per day):
                    <Text strong>{` $${itemDetails?.price_per_day}`}</Text>
                  </Text>

                  <Text>
                    Deposit Price:
                    <Text strong>{` $${itemDetails?.deposit}`}</Text>
                  </Text>

                  {currentUserIsItemOwner ? (
                    <Row gutter={8}>
                      <Col>
                        <Button onClick={() => setEditItemModal({ state: true, data: itemDetails, itemImagePath })}>Edit Item</Button>
                      </Col>
                      <Col>
                        <Popconfirm
                          title={`Delete item: ${itemDetails?.title}`}
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
                    <Space>
                      <Button
                        onClick={() =>
                          window.location.assign(`../messaging/?item=${itemDetails.id}&renter=${currentUser.userDetails.username}`)
                        }
                      >
                        Enquire
                      </Button>
                      <Button onClick={() => setMakeOfferModal({ state: true, data: itemDetails })}>Make Offer</Button>
                    </Space>
                  )}
                </Space>
              </Col>
            </Row>
            <ReviewsOverview itemId={itemDetails?.id} />
          </Card>
        )}
      </Space>
      {editItemModal.state && (
        <ItemEditModal
          modalDetails={editItemModal}
          updateModalDetails={setEditItemModal}
          setFetchDataAgain={setFetchDataAgain}
          setGetImageAgain={setGetImageAgain}
        />
      )}
      {makeOfferModal.state && <MakeOfferModal modalDetails={makeOfferModal} updateModalDetails={setMakeOfferModal} />}
    </>
  )
}
