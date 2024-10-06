/* -------------------------------------------------------------------------- */
/*                                   IMPORT                                   */
/* -------------------------------------------------------------------------- */
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Space } from 'antd'
/* --------------------------------- AMPLIFY -------------------------------- */
import { Amplify } from 'aws-amplify'
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react'
// eslint-disable-next-line import/no-unresolved
import '@aws-amplify/ui-react/styles.css'
import awsExports from '../../services/aws-exports'

Amplify.configure(awsExports)

/* -------------------------------------------------------------------------- */
/*                                    LOGIN                                   */
/* -------------------------------------------------------------------------- */
export const Login = () => {
  const navigate = useNavigate()
  const { user } = useAuthenticator((context) => [context.user])

  useEffect(() => {
    if (user !== undefined) {
      // dispatch(
      //   updateCurrentUser({
      //     data: { authenticated: true, userDetails: user}
      //   })
      // )
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
      <Authenticator />
    </Space>
  )
}
