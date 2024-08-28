import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, Flex, Typography, Row, Col, Space } from 'antd'
const { Title } = Typography

export const Login = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values)
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
                  <a href=''>Forgot password</a>
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
