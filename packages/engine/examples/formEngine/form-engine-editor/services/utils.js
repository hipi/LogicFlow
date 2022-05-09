export function getError(errorno, msg) {
  if (typeof errorno === 'object') {
    return new Error(JSON.stringify(errorno))
  }
  const error = {
    errorno,
    msg
  }
  return new Error(JSON.stringify(error))
}

