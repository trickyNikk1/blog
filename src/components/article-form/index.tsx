import React from 'react'
import { Form, Input, Button } from 'antd'
import type { FormProps } from 'antd'

import styles from './article-form.module.scss'

const { TextArea } = Input

type FieldType = {
  title?: string
  description?: string
  body?: string
  tagList?: { tag: string }[]
}
export function ArticleForm(props: FormProps<FieldType>) {
  const { form, onFinish, onFinishFailed, initialValues } = props
  return (
    <Form
      form={form}
      name="new-article"
      autoComplete="off"
      requiredMark={false}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className={styles.form}
      initialValues={initialValues}
    >
      <Form.Item<FieldType>
        className={styles.formItem}
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please input your title.' }]}
      >
        <Input className={styles.input} placeholder="Title" />
      </Form.Item>
      <Form.Item<FieldType>
        className={styles.formItem}
        label="Short description"
        name="description"
        rules={[{ required: true, message: 'Please input your description.' }]}
      >
        <Input className={styles.input} placeholder="Description" />
      </Form.Item>
      <Form.Item<FieldType>
        className={styles.formItem}
        label="Text"
        name="body"
        rules={[{ required: true, message: 'Please input your text.' }]}
      >
        <TextArea className={styles.input} placeholder="Text" autoSize={{ minRows: 7, maxRows: 14 }} />
      </Form.Item>
      <Form.List name="tagList">
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <div className={styles.tagContainer} key={field.key}>
                <Form.Item
                  label={index === 0 ? 'tagList' : ''}
                  validateTrigger={['onChange', 'onBlur']}
                  className={styles.formItem_tag}
                  {...field}
                  key={field.key}
                  name={[field.name, 'tag']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: 'Please input your tag or delete an empty tag field.',
                    },
                  ]}
                  layout="vertical"
                >
                  <Input placeholder="Tag" className={styles.input_tag} />
                </Form.Item>
                {fields.length > 0 ? (
                  <Button className={styles.button_delete} onClick={() => remove(field.name)} danger>
                    Delete
                  </Button>
                ) : null}
                {fields.length - 1 === index ? (
                  <Button className={styles.button_add} color="primary" variant="outlined" onClick={() => add()}>
                    Add tag
                  </Button>
                ) : null}
              </div>
            ))}
            {fields.length === 0 ? (
              <Button className={styles.button_add} color="primary" variant="outlined" onClick={() => add()}>
                Add tag
              </Button>
            ) : null}
            <Form.ErrorList errors={errors} />
          </>
        )}
      </Form.List>
      <Form.Item className={styles.formItem + ' ' + styles.formItem_send} noStyle>
        <Button type="primary" className={styles.button_send} htmlType="submit">
          Send
        </Button>
      </Form.Item>
    </Form>
  )
}
