const requestTimeStamp = (request, response, superNext) => {
  // Request object aanpassen
  request.web3 = new Date().toLocaleDateString();
  superNext();
};

const requestTimeStampWithDate = (req, res, next) => {
  req.web3 = new Date().toISOString();
  next();
};

module.exports = {
  requestDateMiddleware: requestTimeStamp,
  requestTimeMiddleware: requestTimeStampWithDate,
};
