import { format } from 'date-fns'

export const formatedDate = (createdAt: string, updatedAt: string) =>
  createdAt ? format(new Date(createdAt), 'MMMM dd, yyyy') : format(new Date(updatedAt), 'MMMM dd, yyyy')
