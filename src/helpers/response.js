export const successResponse = (res, data) => {
  return res.status(200).json(data)
}

export const errorResponse = (res, message, status = 400) => {
  return res.status(status).json({
    status,
    message,
  })
}
