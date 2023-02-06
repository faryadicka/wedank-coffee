const pagination = (page: any, limit: any, total: any, query: object, endpoint: string) => {
  let next = ''
  let prev = ''
  let totalPage = Math.round(total / limit)
  for (const [key, value] of Object.entries(query)) {
    next += `${key === 'page' ? '?' : '&'}${key}=${key === 'page' ? Number(value) + 1 : value}`
    prev += `${key === 'page' ? '?' : '&'}${key}=${key === 'page' ? Number(value) - 1 : value}`
  }
  return {
    nextPage: Number(page) < totalPage ? `${process.env.HOST}${endpoint}${next}` : null,
    prevPage: Number(page) > 1 ? `${process.env.HOST}${endpoint}${prev}` : null,
    totalPage,
    currentpage: Number(page)
  }
}

module.exports = { pagination }