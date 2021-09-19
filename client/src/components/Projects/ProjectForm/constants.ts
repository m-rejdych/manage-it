import Field from '../../../types/FormField';
import validateInput from '../../../util/validateInput';

export interface Values {
  title: string;
  description: string;
  maxMembers: string;
}

export const initialValues: Values = { title: '', description: '', maxMembers: '8' };

export const fields: Field<Values>[] = [
  {
    name: 'title',
    label: 'Title',
    type: 'text',
    validate: (value) => {
      const error = validateInput(value, { length: 3 })
        ? undefined
        : 'Title must be at least 3 characters long.';

      return error;
    },
  },
  {
    name: 'description',
    label: 'Description',
    type: 'text',
    multiline: true,
    rows: 5,
  },
  {
    name: 'maxMembers',
    label: 'Max members',
    type: 'text',
    validate: (value) => {
      const error = validateInput(value, { regexp: /^\d+$/ })
        ? undefined
        : 'Max members must be a positive number.';

      return error;
    },
  },
];
