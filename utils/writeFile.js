const fs = require('fs')
const path = require('path')

const writeFile = (file, data) => {
  const filePath = path.join(__dirname, file)
  fs.writeFile(filePath, JSON.stringify(data), function(err) {
    if(err) console.log(err)
  })
}

module.exports = writeFile
