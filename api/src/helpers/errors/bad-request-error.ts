export class BadRequestError extends Error {
  constructor(
    public message: string,
    protected code: number = 400,
    protected description?: string
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
