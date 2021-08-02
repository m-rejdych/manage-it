import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { Stack, Button, DialogActions } from '@material-ui/core';

import FormField from '../FormField';
import Field from '../../types/FormField';
import validateInput from '../../util/validateInput';
import { createProject } from '../../store/ducks/projects/actions';

interface Values {
  title: string;
}

const fields: Field<Values>[] = [
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
];

interface Props {
  onDialogClose?: ((event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void) | undefined;
}

const ProjectForm: React.FC<Props> = ({ onDialogClose }) => {
  const initialValues = { title: '' };
  const dispatch = useDispatch();

  const handleSubmit = (values: Values): void => {
    dispatch(createProject(values));
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({}) => (
        <Form>
          <Stack spacing={1}>
            {fields.map((field) => (
              <FormField key={field.name} {...field} />
            ))}
          </Stack>
          <DialogActions>
            <Button variant="contained" color="secondary" onClick={onDialogClose}>
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Create
            </Button>
          </DialogActions>
        </Form>
      )}
    </Formik>
  );
};

export default ProjectForm;
