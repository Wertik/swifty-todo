export class CommandAlreadyRegisteredError extends Error {
  constructor(message: string = "Command already registered.") {
    super(message);
  }
}

export class InvalidCommandParamError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class TooManyArgsError extends Error {
  constructor(message: string = "Too many arguments.") {
    super(message);
  }
}

export class NotEnoughArgsError extends Error {
  constructor(message: string = "Not enough arguments.") {
    super(message);
  }
}
