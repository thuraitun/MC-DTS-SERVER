import { ZodError } from 'zod';
import ApiError from '../utils/apiError.js';

function validate(schema) {
      return (req, res, next) => {
            try {
                  const result = schema.parse({
                        body: req.body,
                        params: req.params,
                  });
                  req.body = result.body;
                  req.params = result.params || {};

                  next();
            } catch (error) {
                  if (error instanceof ZodError) {
                        next(ApiError.badRequest(error.issues[0].message, error.format()));
                  } else {
                        next(error);
                  }
            }
      };
};

export default validate;