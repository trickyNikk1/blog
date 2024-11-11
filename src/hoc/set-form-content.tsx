import React from 'react'
import { Alert, Spin } from 'antd'

import { FieldErrorsType, LoadingType } from '@my-types/index'

type SetFormContentProps = {
  children: React.ReactNode
  status: LoadingType
  error?: FieldErrorsType | null
}
export const SetFormContent = ({ children, status, error }: SetFormContentProps) => {
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
        <>
          <Alert
            type="error"
            message={error?.error?.status || 'Error'}
            description={error?.message || 'Something went wrong!'}
          />
          {children}
        </>
      )
    case 'succeeded':
      return children
    default:
      return null
  }
}
