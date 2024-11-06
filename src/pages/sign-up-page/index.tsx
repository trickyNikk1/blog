import React, { useEffect } from 'react'
import type { FormProps } from 'antd'
import { Form, Input, Checkbox, Button, Alert, Spin } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

import { rebootLoading, registerNewUser } from '@store/authSlice'
import { useAppDispatch, useAppSelector, useAuth } from '@hooks/index'

import styles from './sign-up-page.module.scss'

type FieldType = {
  username?: string
  email?: string
  password?: string
  repeatPassword?: string
  agreement?: string
}

export function SignUpPage() {
  const navigate = useNavigate()
  const { isAuth } = useAuth()
  const [form] = Form.useForm<FieldType>()
  const dispatch = useAppDispatch()
  const { loading, error } = useAppSelector((state) => state.auth)
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    if (values.password && values.email && values.username) {
      const user = {
        username: values.username,
        email: values.email,
        password: values.password,
      }
      dispatch(registerNewUser(user))
    }
  }
  useEffect(() => {
    dispatch(rebootLoading())
  }, [])
  useEffect(() => {
    if (isAuth) {
      dispatch(rebootLoading())
      navigate('/')
    }
  }, [isAuth, navigate])
  useEffect(() => {
    if (error) {
      form.setFields([
        { name: 'username', errors: error.errors?.username ? [error.errors?.username] : undefined },
        { name: 'email', errors: error.errors?.email ? [error.errors?.email] : undefined },
        { name: 'password', errors: error.errors?.password ? [error.errors?.password] : undefined },
      ])
    }
  }, [error])
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  const spinner = loading === 'pending' ? <Spin className={styles.spinner} fullscreen={true} /> : null

  return (
    <div className={styles.wrapper}>
      {spinner}
      {error?.errors?.message ? (
        <Alert message={error.errors.error?.status + ' ' + error.errors.message} type="error" />
      ) : null}
      <div className={styles.container}>
        <h1 className={styles.title}>Create new account</h1>
        <Form
          form={form}
          name="sign-up"
          labelCol={{ span: 32 }}
          wrapperCol={{ span: 32 }}
          initialValues={{ agreement: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
          requiredMark={false}
          layout="vertical"
          scrollToFirstError
          className={styles.form}
        >
          <Form.Item<FieldType>
            className={styles.formItem}
            label="Username"
            name="username"
            rules={[
              { type: 'string' },
              { min: 3, message: 'Username must be at least 3 characters.' },
              { max: 20, message: 'Username must be at most 20 characters.' },
              { required: true, message: 'Please input your username.' },
            ]}
          >
            <Input className={styles.input} placeholder="Username" />
          </Form.Item>
          <Form.Item<FieldType>
            className={styles.formItem}
            label="Email address"
            name="email"
            normalize={(value) => value.trim().toLowerCase()}
            rules={[
              { type: 'email', message: 'The input is not valid E-mail.' },
              { required: true, message: 'Please input your email address.' },
            ]}
          >
            <Input className={styles.input} placeholder="Email address" />
          </Form.Item>

          <Form.Item<FieldType>
            className={styles.formItem}
            label="Password"
            name="password"
            rules={[
              { type: 'string' },
              { min: 6, message: 'Password must be at least 6 characters.' },
              { max: 40, message: 'Password must be at most 40 characters.' },
              { required: true, message: 'Please input your password.' },
            ]}
          >
            <Input.Password className={styles.input} placeholder="Password" />
          </Form.Item>
          <Form.Item<FieldType>
            className={styles.formItem}
            label="Repeat Password"
            name="repeatPassword"
            rules={[
              { type: 'string' },
              { required: true, message: 'Please repeat your password.' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Passwords must match'))
                },
              }),
            ]}
          >
            <Input.Password className={styles.input} placeholder="Password" />
          </Form.Item>

          <Form.Item<FieldType>
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
              },
            ]}
            wrapperCol={{ span: 32 }}
          >
            <Checkbox className={styles.checkbox}>I agree to the processing of my personal information</Checkbox>
          </Form.Item>
          <Form.Item className={styles.formItem} wrapperCol={{ span: 32 }}>
            <Button disabled={loading === 'pending'} className={styles.button} type="primary" htmlType="submit" block>
              Create
            </Button>
          </Form.Item>
        </Form>

        <div className={styles.offer}>
          Already have an account?{' '}
          <Link className={styles.link} to="/sign-in">
            Sign In.
          </Link>
        </div>
      </div>
    </div>
  )
}
