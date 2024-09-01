/* -------------------------------------------------------------------------- */
/*                                   IMPORT                                   */
/* -------------------------------------------------------------------------- */
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateCurrentUser } from '../../redux/reducer'
import { Space } from 'antd'
/* --------------------------------- AMPLIFY -------------------------------- */
import { Amplify } from 'aws-amplify'
import { Authenticator } from '@aws-amplify/ui-react'
import { useAuthenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import awsExports from '../../services/aws-exports'

Amplify.configure(awsExports)

/* -------------------------------------------------------------------------- */
/*                                    LOGIN                                   */
/* -------------------------------------------------------------------------- */
export const Login = ({ signOut }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useAuthenticator((context) => [context.user])

  useEffect(() => {
    console.log(user)

    if (user != undefined) {
      dispatch(
        updateCurrentUser({
          data: { authenticated: true, userDetails: user }
        })
      )
      navigate('/')
    }
  }, [user])

  return (
    <Space
      direction='vertical'
      size='middle'
      style={{
        display: 'flex',
        paddingTop: '25px'
      }}
    >
      <Authenticator></Authenticator>
    </Space>
  )
}
