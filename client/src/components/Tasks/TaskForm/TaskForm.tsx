import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import {
  Stack,
  DialogContent,
  DialogActions,
  Button,
  useTheme,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import FormField from '../../FormField';
import TagInput from '../../TagInput';
import CheckpointField from '../../CheckpointField';
import SearchField from '../../Search/SearchField';
import SearchItem from '../../Search/types/SearchItem';
import { RootState } from '../../../store/types/state';
import { fields, initialValues, Values } from './constants';
import { CreateTaskPayload } from '../../../types/task/payloads';
import { createTask } from '../../../store/ducks/task/actions';

interface Props {
  onDialogClose?:
    | ((e?: React.MouseEvent<HTMLButtonElement>) => void)
    | undefined;
  projectId: number;
}

type ValueSetter = (
  field: string,
  value: any,
  shouldValidate?: boolean | undefined,
) => void;

const TaskForm: React.FC<Props> = ({ onDialogClose, projectId }) => {
  const [tags, setTags] = useState<string[]>([]);
  const loading = useSelector((state: RootState) => state.task.loading);
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleChangeTags = (newTags: string[]): void => {
    setTags(newTags);
  };

  const handleSubmit = ({ estimate, assignedTo, ...values }: Values): void => {
    const data: CreateTaskPayload = {
      ...values,
      estimate: parseInt(estimate),
      projectId,
    };

    if (tags.length) data.tags = tags;
    if (assignedTo) data.assignedToId = assignedTo.id;

    dispatch(createTask(data));
    if (onDialogClose) onDialogClose();
  };

  const renderFields = (valueSetter: ValueSetter): JSX.Element[] =>
    fields.map((field) => {
      if (field.name === 'checkpoints') {
        return (
          <CheckpointField
            {...field}
            onChange={(values: string[]): void =>
              valueSetter('checkpoints', values)
            }
            key={field.name}
            sx={{ minHeight: 80 }}
          />
        );
      }

      if (field.name === 'assignedTo') {
        return (
          <SearchField
            {...field}
            onChange={(value: SearchItem | null): void =>
              valueSetter('assignedTo', value)
            }
            key={field.name}
            sx={{ mb: `${theme.spacing(1)}`, minHeight: 80 }}
            fullWidth
            clearAfterSelect
          />
        );
      }

      return (
        <FormField
          {...field}
          key={field.name}
          sx={{ ':first-child': { mt: theme.spacing(1) } }}
        />
      );
    });

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ handleSubmit, setFieldValue }) => (
        <>
          <DialogContent>
            <Form>
              <Stack spacing={1}>
                {renderFields(setFieldValue)}
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
            <Button
              color="secondary"
              variant="contained"
              onClick={onDialogClose}
            >
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
