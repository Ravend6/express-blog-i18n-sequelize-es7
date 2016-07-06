export default (data, rules) => {
  let errors = {}
  for (let field in rules) {
    for (let rule in rules[field]) {
      // console.log(field, rule, rules[field][rule])
      switch (rule) {
        case 'require':
          if (isRequire(data[field], rules[field][rule])) {
            errors[field] = 'Поле ' + field + ' обязательно для заполнения.'
          }
          break
        case 'max':
          if (isMax(data[field], rules[field][rule])) {
            errors[field] = 'Поле ' + field + ' не может быть более ' + rules[field][rule] + '.'
          }
          break
        case 'min':
          if (isMin(data[field], rules[field][rule])) {
            errors[field] = 'Поле ' + field + ' должно быть не менее ' + rules[field][rule] + '.'
          }
          break
      }
    }
  }
  return errors
}

function isRequire(data, ruleValue) {
  if (ruleValue && data !== '') {
    return false
  }
  return true
}

function isMax(data, ruleValue) {
  if (data.length > ruleValue) {
    return true
  }
  return false
}

function isMin(data, ruleValue) {
  if (data.length < ruleValue) {
    return true
  }
  return false
}
