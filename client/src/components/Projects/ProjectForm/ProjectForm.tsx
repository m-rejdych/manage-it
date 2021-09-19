import { useState } from 'react';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {
  Stack,
  Button,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
  useTheme,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import FormField from '../../FormField';
import TagInput from '../../TagInput';
import { RootState } from '../../../store/types/state';
import { CreateProjectPayload } from '../../../types/project/payloads';
import { createProject } from '../../../store/ducks/projects/actions';
import { initialValues, fields, Values } from './constants';

interface Props {
  onDialogClose?: ((e?: React.MouseEvent<HTMLButtonElement>) => void) | undefined;
}

const ProjectForm: React.FC<Props> = ({ onDialogClose }) => {
  const [tags, setTags] = useState<string[]>([]);
  const [isUnlimitedMembers, setIsUnlimitedMembers] = useState(false);
  const loading = useSelector((state: RootState) => state.project.loading);
  const theme = useTheme();
  const dispatch = useDispatch();

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
    valueSetter: (field: string, value: any, shouldValidate?: boolean | undefined) => void,
    errorSetter: (field: string, message: string | undefined) => void
  ): void => {
    if (!isUnlimitedMembers) {
      setIsUnlimitedMembers(true);
      valueSetter('maxMembers', '', false);
      errorSetter('maxMembers', undefined);
    } else {
      setIsUnlimitedMembers(false);
      valueSetter('maxMembers', '8', false);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ setFieldValue, setFieldError, handleSubmit }) => (
        <>
          <DialogContent>
            <Form>
              <Stack spacing={1}>
                {fields.map((field) =>
                  field.name === 'maxMembers' ? (
                    <Stack spacing={1} direction="row" width="100%" key={field.name}>
                      <FormField
                        {...field}
                        shouldValidate={field.name !== 'maxMembers' || !isUnlimitedMembers}
                        label={isUnlimitedMembers ? 'Unlimited members' : field.label}
                        disabled={isUnlimitedMembers}
                        sx={{ flexGrow: 1 }}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={isUnlimitedMembers}
                            onChange={(): void =>
                              handleChangeUnlimitedMembers(setFieldValue, setFieldError)
                            }
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
                <TagInput
                  fullWidth
                  onTagChange={handleChangeTags}
                  placeholder="Enter tag name..."
                />
              </Stack>
            </Form>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="secondary" onClick={onDialogClose}>
              Cancel
            </Button>
            <LoadingButton
              loading={loading}
              variant="contained"
              type="submit"
              onClick={(): void => handleSubmit()}
            >
              Create
            </LoadingButton>
          </DialogActions>
        </>
      )}
    </Formik>
  );
};

export default ProjectForm;
