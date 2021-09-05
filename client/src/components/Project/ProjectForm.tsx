import { useState } from 'react';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { Stack, Button, DialogActions } from '@material-ui/core';

import FormField from '../FormField';
import Field from '../../types/FormField';
import TagInput from '../TagInput';
import validateInput from '../../util/validateInput';
import { CreateProjectPayload } from '../../types/project/payloads';
import { createProject } from '../../store/ducks/projects/actions';

interface Values {
  title: string;
  description: string;
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
  {
    name: 'description',
    label: 'Description',
    type: 'text',
    multiline: true,
    rows: 5,
  },
];

interface Props {
  onDialogClose?: ((e?: React.MouseEvent<HTMLButtonElement>) => void) | undefined;
}

const ProjectForm: React.FC<Props> = ({ onDialogClose }) => {
  const [tags, setTags] = useState<string[]>([]);
  const initialValues = { title: '', description: '' };
  const dispatch = useDispatch();

  const handleSubmit = (values: Values): void => {
    const data: CreateProjectPayload = { ...values };
    if (tags.length) data.tags = tags;

    dispatch(createProject(data));

    if (onDialogClose) onDialogClose();
  };

  const handleChangeTags = (newTags: string[]): void => {
    setTags(newTags);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({}) => (
        <Form>
          <Stack spacing={1}>
            {fields.map((field) => (
              <FormField key={field.name} {...field} />
            ))}
            <TagInput fullWidth onTagChange={handleChangeTags} placeholder="Enter tag name..." />
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
