export class AppError extends Error {
  readonly status: number;
  readonly title: string;

  constructor(status: number, title: string, detail: string) {
    super(detail);
    this.name = new.target.name;
    this.status = status;
    this.title = title;
  }
}

export class NotFoundError extends AppError {
  constructor(detail: string) {
    super(404, "Not Found", detail);
  }
}
