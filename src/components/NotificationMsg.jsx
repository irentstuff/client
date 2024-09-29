/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */
import { useEffect } from 'react'
/* ---------------------------------- redux --------------------------------- */
import { useSelector, useDispatch } from 'react-redux'
import { updateSuccess, updateError } from '../redux/reducer'
/* ---------------------------------- antd ---------------------------------- */
import { notification } from 'antd'

/* -------------------------------------------------------------------------- */
/*                               NotificationMsg                              */
/* -------------------------------------------------------------------------- */
export const NotificationMsg = () => {
  console.log('NotificationMsg - render')

  const dispatch = useDispatch()
  const successMsg = useSelector((state) => state.iRentStuff.showSuccess)
  const errorMsg = useSelector((state) => state.iRentStuff.showError)

  useEffect(() => {
    if (successMsg.status) {
      return notification.success({
        message: successMsg.msg,
        placement: 'top',
        onClose: () =>
          dispatch(
            updateSuccess({
              status: false,
              msg: ''
            })
          )
      })
    }

    return undefined
  }, [successMsg])

  useEffect(() => {
    if (errorMsg.status) {
      return notification.error({
        message: errorMsg.msg,
        placement: 'top',
        onClose: () =>
          dispatch(
            updateError({
              status: false,
              msg: ''
            })
          )
      })
    }
    return undefined
  }, [errorMsg])
}
