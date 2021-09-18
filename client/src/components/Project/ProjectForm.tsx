import { useState } from 'react';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { Stack, Button, DialogActions, FormControlLabel, Checkbox, useTheme } from '@mui/material';

import FormField from '../FormField';
import Field from '../../types/FormField';
import TagInput from '../TagInput';
import validateInput from '../../util/validateInput';
import { CreateProjectPayload } from '../../types/project/payloads';
import { createProject } from '../../store/ducks/projects/actions';

interface Values {
  title: string;
  description: string;
  maxMembers: string;
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
  {
    name: 'maxMembers',
    label: 'Max members',
    type: 'text',
    validate: (value: string) => {
      const error = !value || /^[0-9]*$/.test(value) ? undefined : 'Max members must be a number!';

      return error;
    },
  },
];

interface Props {
  onDialogClose?: ((e?: React.MouseEvent<HTMLButtonElement>) => void) | undefined;
}

const ProjectForm: React.FC<Props> = ({ onDialogClose }) => {
  const [tags, setTags] = useState<string[]>([]);
  const [isUnlimitedMembers, setIsUnlimitedMembers] = useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();

  const initialValues = { title: '', description: '', maxMembers: '8' };

  const handleSubmit = ({ maxMembers, ...values }: Values): void => {
    const data: CreateProjectPayload = { ...values };

    if (!isUnlimitedMembers) data.maxMembers = Number(maxMembers);
    if (tags.length) data.tags = tags;

    dispatch(createProject(data));

    if (onDialogClose) onDialogClose();
  };

  const handleChangeTags = (newTags: string[]): void => {
    setTags(newTags);
  };

  const handleChangeUnlimitedMembers = (
    valueSetter: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  ): void => {
    if (!isUnlimitedMembers) {
      setIsUnlimitedMembers(true);
      valueSetter('maxMembers', '', false);
    } else {
      setIsUnlimitedMembers(false);
      valueSetter('maxMembers', '8', false);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ setFieldValue }) => (
        <Form>
          <Stack spacing={1}>
            {fields.map((field) =>
              field.name === 'maxMembers' ? (
                <Stack spacing={1} direction="row" width="100%" key={field.name}>
                  <FormField
                    {...field}
                    label={isUnlimitedMembers ? 'Unlimited members' : field.label}
                    disabled={isUnlimitedMembers}
                    sx={{ flexGrow: 1 }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isUnlimitedMembers}
                        onChange={(): void => handleChangeUnlimitedMembers(setFieldValue)}
                      />
                    }
                    sx={{ paddingBottom: theme.spacing(2.25) }}
                    label="Unlimited members"
                  />
                </Stack>
              ) : (
                <FormField
                  {...field}
                  key={field.name}
                  sx={{ ':first-child': { marginTop: theme.spacing(1) } }}
                />
              )
            )}
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
