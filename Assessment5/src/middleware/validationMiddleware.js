const validationMiddleware = (schema, source = "body") => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[source], {
      abortEarly: false,
      stripUnknown: true,
      convert: true,
    });

    if (error) {
      const messages = error.details.map((detail) => detail.message.replace(/"/g, ""));
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: messages,
      });
    }

    // overwrite with the validated (and type-converted / defaulted) value
    req[source] = value;
    next();
  };
};

module.exports = validationMiddleware;
