var getErrorMessage = function (existsMessage) {
  return function (err) {
    var message = "";

    if (err.code) {
      switch (err.code) {
        case 11000:
        case 11001:
          message = existsMessage;
          break;
        default:
          message = "Something went wrong";
      }
    } else {
      for (var errName in err.errors) {
        if (err.errors[errName].message) message = err.errors[errName].message;
      }
    }

    return message;
  };
};
module.exports.getErrorMessage = getErrorMessage;
