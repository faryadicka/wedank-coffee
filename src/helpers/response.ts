export const onSuccess = (res: any, status: number = 200, message: string, data?: any, total?: any, meta?: any) => {
  res.status(status).json({
    status,
    message,
    data,
    total,
    meta
  })
}

export const onFailed = (res: any, status: number = 500, message: string, err: any) => {
  res.status(status).json({
    status,
    message,
    err
  })
} 