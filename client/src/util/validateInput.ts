interface Options {
  regexp?: RegExp;
  length?: number;
  equalTo?: string;
  inArray?: string[];
}

const validateInput = (value: string | string[], options?: Options): boolean => {
  let isValid = true;

  if (options?.regexp && typeof value === 'string') {
    isValid = options.regexp.test(value);
  }

  if (options?.length && isValid) {
    const trimmedValue = Array.isArray(value) ? value : value.trim();
    isValid = trimmedValue.length >= options.length;
  }

  if (options?.equalTo && isValid) {
    isValid = value === options?.equalTo;
  }

  if (options?.inArray && typeof value === 'string' && isValid) {
    isValid = options?.inArray.includes(value);
  }

  return isValid;
};

export default validateInput;
