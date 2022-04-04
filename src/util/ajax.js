import jquery from 'jquery'

function ajax(req) {
  const url = `${!req.url.includes('://') ? process.env.POSTS_EDITOR_URL : ''}${req.url}`
  return jquery.ajax({ ...req, url })
}

export default { ajax }
