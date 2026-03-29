const fs = require('fs')
const path = require('path')
const { register_anonimous } = require('./main')
const { cookieToJson } = require('./util/index')

const tmpPath = require('os').tmpdir()
async function generateConfig() {
  try {
    const res = await register_anonimous()
    const cookie = res.body.cookie
    if (cookie) {
      const cookieObj = cookieToJson(cookie)
      try {
        fs.writeFileSync(
          path.resolve(tmpPath, 'anonymous_token'),
          cookieObj.MUSIC_A,
          'utf-8',
        )
      } catch (fsError) {
        console.log('Warning: Could not write to anonymous_token file, continuing without it')
      }
    }
  } catch (error) {
    console.log(error)
  }
}
module.exports = generateConfig
