/* -------------------------------------------------------------------------- */
/*                                   IMPORT                                   */
/* -------------------------------------------------------------------------- */
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateCurrentUser, updateError, updateSuccess } from '../../redux/reducer'
import { getUserByEmailAndId } from '../../services/api'
/* -------------------------------- COMPONENT ------------------------------- */
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, Flex, Typography, Row, Col, Space } from 'antd'
const { Title } = Typography

/* -------------------------------------------------------------------------- */
/*                                    LOGIN                                   */
/* -------------------------------------------------------------------------- */
export const LoginWithAPI = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const loginUserLocal = async (payload) => {
    try {
      console.log(payload)
      const response = await getUserByEmailAndId(payload)
      console.log(response)
      if (response.status === 200) {
        if (response.data.length == 0) {
          dispatch(
            updateError({
              status: true,
              msg: 'User not found.'
            })
          )
        } else {
          dispatch(
            updateSuccess({
              status: true,
              msg: `User is login successfully`
            })
          )
          dispatch(
            updateCurrentUser({
              data: {
                authenticated: true,
                userDetails: response.data
              }
            })
          )

          // Persist user state in localStorage
          localStorage.setItem(
            'user',
            JSON.stringify({
              authenticated: true,
              userDetails: response.data
            })
          )

          navigate('/')
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

  const onFinish = (values) => {
    console.log('Received values of form: ', values)
    const formattedPayload = {
      username: values.username,
      password: values.password
    }
    loginUserLocal(formattedPayload)
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
        <Title type={3}>Login</Title>
        <Row justify='center'>
          <Col xs={24} xl={12}>
            <Form
              name='login'
              initialValues={{
                remember: true
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name='username'
                rules={[
                  {
                    required: true,
                    message: 'Please input your Username!'
                  }
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder='Username' />
              </Form.Item>
              <Form.Item
                name='password'
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!'
                  }
                ]}
              >
                <Input prefix={<LockOutlined />} type='password' placeholder='Password' />
              </Form.Item>
              <Form.Item>
                <Flex justify='space-between' align='center'>
                  <Form.Item name='remember' valuePropName='checked' noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                  {/* <a href=''>Forgot password</a> */}
                </Flex>
              </Form.Item>

              <Form.Item>
                <Button block type='primary' htmlType='submit'>
                  Log in
                </Button>
                or <a href='Register'>Register now!</a>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Space>
    </>
  )
}
