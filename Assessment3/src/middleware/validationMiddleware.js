const validationMiddleware = (schema, type = "body") => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[type]);

  
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    } 
    req[type] = value;
    next();
  };
};

module.exports = validationMiddleware;
