export class ConflictError extends Error {
  constructor(
    public message: string,
    protected code: number = 409,
    protected description?: string
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
