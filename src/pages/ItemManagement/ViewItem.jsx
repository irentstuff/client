/* -------------------------------------------------------------------------- */
/*                                   IMPORT                                   */
/* -------------------------------------------------------------------------- */
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { updateError, updateSuccess } from '../../redux/reducer'
/* ------------------------------- COMPONENTS ------------------------------- */
import { Button, Checkbox, Col, Form, Input, Row, Select, Space, Typography } from 'antd'
import { UploadImage } from '../../components/UploadImage'
import { ItemEditCard } from '../../components/ItemEditCard'
import { createNewItem } from '../../services/api'
import { formItemLayout, tailFormItemLayout, categoryOptions, conditionOptions, availabilityOptions } from '../../services/config'
const { Title } = Typography

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

  const currentUser = useSelector((state) => state.iRentStuff.currentUser)
  console.log(currentUser)

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

  return <ItemEditCard itemDetails={itemDetails} />
}
