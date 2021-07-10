interface Options {
  regexp?: RegExp;
  length?: number;
  equalTo?: string;
}

const validateInput = (value: string, options?: Options): boolean => {
  let isValid = true;

  if (options?.regexp) {
    isValid = options.regexp.test(value);
  }

  if (options?.length && isValid) {
    isValid = value.trim().length >= options.length;
  }

  if (options?.equalTo) {
    isValid = value === options?.equalTo;
  }

  return isValid;
};

export default validateInput;
