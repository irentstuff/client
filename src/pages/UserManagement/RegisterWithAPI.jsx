/* -------------------------------------------------------------------------- */
/*                                   IMPORT                                   */
/* -------------------------------------------------------------------------- */
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateError, updateSuccess } from '../../redux/reducer'

/* ------------------------------- COMPONENTS ------------------------------- */
import { Button, Checkbox, Col, Form, Input, Row, Select, Space, Typography } from 'antd'
import { registerUser } from '../../services/api'
import { formItemLayout, tailFormItemLayout } from '../../services/config'
const { Title } = Typography

/* -------------------------------------------------------------------------- */
/*                                  REGISTER                                  */
/* -------------------------------------------------------------------------- */
export const RegisterWithAPI = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const registerUserLocal = async (payload) => {
    try {
      const response = await registerUser(payload)
      console.log(response)
      if (response.status === 201) {
        dispatch(
          updateSuccess({
            status: true,
            msg: `User is registered successfully`
          })
        )
        navigate('/Login')
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
    registerUserLocal(values)
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
        <Title type={3}>Register</Title>
        <Row justify='center'>
          <Col xs={24} xl={12}>
            <Form
              {...formItemLayout}
              form={form}
              name='register'
              onFinish={onFinish}
              style={{
                maxWidth: 850
              }}
              scrollToFirstError
            >
              <Form.Item
                name='email'
                label='E-mail'
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!'
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!'
                  }
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name='username'
                label='Username'
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                    whitespace: true
                  }
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name='nickname'
                label='Nickname'
                tooltip='What do you want others to call you?'
                rules={[
                  {
                    required: true,
                    message: 'Please input your nickname!',
                    whitespace: true
                  }
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name='password'
                label='Password'
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!'
                  }
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name='confirm'
                label='Confirm Password'
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!'
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error('The new password that you entered do not match!'))
                    }
                  })
                ]}
              >
                <Input.Password />
              </Form.Item>

              {/* <Form.Item label='Captcha' extra='We must make sure that your are a human.'>
                <Row gutter={8}>
                  <Col span={12}>
                    <Form.Item
                      name='captcha'
                      noStyle
                      rules={[
                        {
                          required: true,
                          message: 'Please input the captcha you got!'
                        }
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Button>Get captcha</Button>
                  </Col>
                </Row>
              </Form.Item> */}

              {/* <Form.Item
                name='agreement'
                valuePropName='checked'
                rules={[
                  {
                    validator: (_, value) => (value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')))
                  }
                ]}
                {...tailFormItemLayout}
              >
                <Checkbox>
                  I have read the <a href=''>agreement</a>
                </Checkbox>
              </Form.Item> */}
              <Form.Item {...tailFormItemLayout}>
                <Button type='primary' htmlType='submit'>
                  Register
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Space>
    </>
  )
}
