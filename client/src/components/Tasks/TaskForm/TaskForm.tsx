import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import { Stack, DialogContent, DialogActions, Button, useTheme } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import FormField from '../../FormField';
import TagInput from '../../TagInput';
import CheckpointField from '../../CheckpointField';
import { RootState } from '../../../store/types/state';
import { fields, initialValues, Values } from './constants';
import { CreateTaskPayload } from '../../../types/task/payloads';
import { createTask } from '../../../store/ducks/task/actions';

interface Props {
  onDialogClose?: ((e?: React.MouseEvent<HTMLButtonElement>) => void) | undefined;
  projectId: number;
}

const TaskForm: React.FC<Props> = ({ onDialogClose, projectId }) => {
  const [tags, setTags] = useState<string[]>([]);
  const loading = useSelector((state: RootState) => state.task.loading);
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleChangeTags = (newTags: string[]): void => {
    setTags(newTags);
  };

  const handleSubmit = ({ estimate, ...values }: Values): void => {
    const data: CreateTaskPayload = { ...values, estimate: Number(estimate), projectId };

    if (tags.length) data.tags = tags;

    dispatch(createTask(data));
    if (onDialogClose) onDialogClose();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ handleSubmit, setFieldValue }) => (
        <>
          <DialogContent>
            <Form>
              <Stack spacing={1}>
                {fields.map((field) =>
                  field.name === 'checkpoints' ? (
                    <CheckpointField
                      {...field}
                      onChange={(values: string[]): void => setFieldValue('checkpoints', values)}
                      key={field.name}
                    />
                  ) : (
                    <FormField
                      {...field}
                      key={field.name}
                      sx={{ ':first-child': { mt: theme.spacing(1) } }}
                    />
                  )
                )}
                <TagInput
                  fullWidth
                  placeholder="Enter tag name..."
                  tags={tags}
                  onTagChange={handleChangeTags}
                />
              </Stack>
            </Form>
          </DialogContent>
          <DialogActions>
            <Button color="secondary" variant="contained" onClick={onDialogClose}>
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

export default TaskForm;
