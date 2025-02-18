import React from 'react'
import { Alert, Spin } from 'antd'

import { FieldErrorsType, LoadingType } from '@my-types/index'

type SetContentProps = {
  children: React.ReactNode
  status: LoadingType
  error?: FieldErrorsType | null
}
export const SetContent = ({ children, status, error }: SetContentProps) => {
  switch (status) {
    case 'idle':
      return children
    case 'pending':
      return (
        <>
          <Spin fullscreen={true} />
          {children}
        </>
      )
    case 'failed':
      return (
        <Alert
          type="error"
          message={error?.error?.status || 'Error'}
          description={error?.message || 'Something went wrong!'}
        />
      )
    case 'succeeded':
      return children
    default:
      return null
  }
}
