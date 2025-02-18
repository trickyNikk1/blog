import React, { useEffect } from 'react'
import type { FormProps } from 'antd'
import { Form, Input, Button } from 'antd'
import { Link, useNavigate, useLocation } from 'react-router-dom'

import { login, rebootLoading } from '@store/authSlice'
import { useAppDispatch, useAppSelector, useAuth } from '@hooks/index'
import { SetFormContent } from '@hoc/set-form-content'

import styles from './sign-in-page.module.scss'

type FieldType = {
  username?: string
  email?: string
  password?: string
  repeatPassword?: string
  agreement?: string
}

export function SignInPage() {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [form] = Form.useForm<FieldType>()
  const { loading, error } = useAppSelector((state) => state.auth)
  const { isAuth } = useAuth()

  useEffect(() => {
    dispatch(rebootLoading())
  }, [])

  useEffect(() => {
    if (isAuth) {
      dispatch(rebootLoading())
      navigate(location.state?.from || '/', { replace: true })
    }
  }, [isAuth, navigate])

  useEffect(() => {
    if (error?.['email or password']) {
      form.setFields([{ name: 'email', errors: ['Email or password is invalid'] }])
    }
  }, [error])

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    if (values.password && values.email) {
      const user = {
        email: values.email,
        password: values.password,
      }
      dispatch(login(user))
    }
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className={styles.wrapper}>
      <SetFormContent status={loading} error={error}>
        <div className={styles.container}>
          <h1 className={styles.title}>Sign In</h1>

          <Form
            form={form}
            name="sign-up"
            labelCol={{ span: 32 }}
            wrapperCol={{ span: 32 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
            requiredMark={false}
            layout="vertical"
            className={styles.form}
          >
            <Form.Item<FieldType>
              className={styles.formItem}
              label="Email address"
              name="email"
              normalize={(value) => value.trim().toLowerCase()}
              rules={[{ type: 'email' }, { required: true, message: 'Please input your email address' }]}
            >
              <Input className={styles.input} placeholder="Email address" />
            </Form.Item>

            <Form.Item<FieldType>
              className={styles.formItem}
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password className={styles.input} placeholder="Password" />
            </Form.Item>

            <Form.Item className={styles.formItem} wrapperCol={{ span: 32 }}>
              <Button className={styles.button} disabled={loading === 'pending'} type="primary" htmlType="submit" block>
                Login
              </Button>
            </Form.Item>
          </Form>

          <div className={styles.offer}>
            Don&apos;t have an account?{' '}
            <Link className={styles.link} to="/sign-up">
              Sign Up.
            </Link>
          </div>
        </div>
      </SetFormContent>
    </div>
  )
}
