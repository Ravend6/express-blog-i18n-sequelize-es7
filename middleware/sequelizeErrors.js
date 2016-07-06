import sequelize from 'sequelize'

module.exports = (err, req, res, next) => {
  if (err instanceof sequelize.ValidationError) {
    res.locals.formErrors = translateValidation(err.errors, req)
    if (res.ctx) {
      return res.render(res.view, res.ctx)
    } else {
      return res.render(res.view)
    }
  }
  next(err)
}

function translateValidation(errors, req) {
  let newData = []
  // console.log(errors)
  for (let error of errors) {
    // console.log(error.message)
    if (error.message.startsWith('Validation len :max=')) {
      let myRegexp = /(.*?):max=(.*?)(?:\s|$)/g
      let match = myRegexp.exec(error.message)
      newData.push({
        message: req.__(`${match[1]}%s max %s`, req.__(error.path), match[2]),
        path: error.path,
        type: error.type,
        value: error.value,
        __raw: error.__raw
      })
      continue
    }
    let myRegexp = /(?:^|\s)(.*?):min=(.*?)(?:\s|$)(.*?):max=(.*?)(?:\s|$)/g
    let match = myRegexp.exec(error.message)
    if (match) {
      newData.push({
        message: req.__(`${match[1]}%s min %s max %s`, req.__(error.path), match[2], match[4]),
        path: error.path,
        type: error.type,
        value: error.value,
        __raw: error.__raw
      })
      continue
    }
    if (error.message.startsWith('Validation len :min=')) {
      let myRegexp = /(.*?):min=(.*?)(?:\s|$)/g
      let match = myRegexp.exec(error.message)
      newData.push({
        message: req.__(`${match[1]}%s min %s`, req.__(error.path), match[2]),
        path: error.path,
        type: error.type,
        value: error.value,
        __raw: error.__raw
      })
      continue
    }
    newData.push({
      message: req.__(`${error.message} %s`, req.__(error.path)),
      path: error.path,
      type: error.type,
      value: error.value,
      __raw: error.__raw
    })
  }

  return newData
}
