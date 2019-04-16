class HttpError {
  private code: number;
  private description: string;

  constructor(code: number, description: string) {
    this.code = code;
    this.description = description;
  }

  public toObject() {
    return {
      code: this.code,
      description: this.description,
    };
  }
}

const BAD_REQUEST: HttpError = new HttpError(
  400,
  "We can't go further with your request. Please check request parameters and try again",
);
const NOT_FOUND: HttpError = new HttpError(
  404,
  "The API does not respond to resource you are trying to reach",
);

const HttpErrorMiddleware = (err: any, _: any, res: any, __: any) => {
  res.status(err.code).send(err);
};

export { BAD_REQUEST, NOT_FOUND };
export default HttpErrorMiddleware;
