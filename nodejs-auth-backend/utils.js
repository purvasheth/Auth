function userError(res, obj) {
  res.status(400).json(obj);
}

function success(res, obj) {
  res.status(200).json(obj);
}

function serverError(res, obj) {
  res.status(500).json(obj);
}
module.exports.userError = userError;
module.exports.success = success;
module.exports.serverError = serverError;
