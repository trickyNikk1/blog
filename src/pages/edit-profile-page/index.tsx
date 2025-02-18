import React, { useEffect } from 'react'
import type { FormProps } from 'antd'
import { Form, Input, Button } from 'antd'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector, useAuth } from '@hooks/index'
import { updateProfile } from '@store/authSlice'
import { SetFormContent } from '@hoc/set-form-content'

import styles from './edit-profile-page.module.scss'

type FieldType = {
  username?: string
  email?: string
  password?: string
  image?: string
}

export function EditProfilePage() {
  const navigate = useNavigate()
  const { isAuth } = useAuth()
  const [form] = Form.useForm<FieldType>()
  const dispatch = useAppDispatch()
  const { loading, error, user } = useAppSelector((state) => state?.auth)

  const onFinish: FormProps<FieldType>['onFinish'] = ({ username, email, password, image }) => {
    const userData = {
      username: username || '',
      email: email || '',
      password: password || '',
      image: image || '',
      token: user.token || '',
    }
    dispatch(updateProfile(userData))
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  useEffect(() => {
    if (!isAuth) {
      navigate('/sign-up')
    }
  }, [isAuth, navigate])

  useEffect(() => {
    if (error) {
      form.setFields([
        { name: 'username', errors: error.username ? [error.username] : undefined },
        { name: 'email', errors: error.email ? [error.email] : undefined },
        { name: 'password', errors: error.password ? [error.password] : undefined },
        { name: 'image', errors: error.image ? [error.image] : undefined },
      ])
    }
  }, [error])

  return (
    <div className={styles.wrapper}>
      <SetFormContent status={loading} error={error}>
        <div className={styles.container}>
          <h1 className={styles.title}>Edit Profile</h1>
          <Form
            form={form}
            name="sign-up"
            labelCol={{ span: 32 }}
            wrapperCol={{ span: 32 }}
            initialValues={{ username: user?.username, email: user?.email, image: user?.image }}
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
                { type: 'email', message: 'The input is not valid email.' },
                { required: true, message: 'Please input your email!' },
              ]}
            >
              <Input className={styles.input} placeholder="Email address" />
            </Form.Item>

            <Form.Item<FieldType>
              className={styles.formItem}
              label="New password"
              name="password"
              rules={[
                { type: 'string' },
                { min: 6, message: 'Password must be at least 6 characters.' },
                { max: 40, message: 'Password must be at most 40 characters.' },
              ]}
            >
              <Input.Password className={styles.input} placeholder="New password" />
            </Form.Item>
            <Form.Item<FieldType>
              className={styles.formItem}
              label="Avatar Image (url)"
              name="image"
              rules={[{ type: 'url', message: 'The input is not valid URL.' }]}
            >
              <Input className={styles.input} placeholder="Avatar image" />
            </Form.Item>

            <Form.Item className={styles.formItem} wrapperCol={{ span: 32 }}>
              <Button disabled={loading === 'pending'} className={styles.button} type="primary" htmlType="submit" block>
                Save
              </Button>
            </Form.Item>
          </Form>
        </div>
      </SetFormContent>
    </div>
  )
}
