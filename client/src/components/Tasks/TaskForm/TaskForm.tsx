import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { Stack, DialogContent, DialogActions, Button, TextField, useTheme } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import FormField from '../../FormField';
import CheckpointField from '../../CheckpointField';
import { fields, initialValues } from './constants';

interface Props {
  onDialogClose?: ((e: React.MouseEvent<HTMLButtonElement>) => void) | undefined;
}

const TaskForm: React.FC<Props> = ({ onDialogClose }) => {
  const [checkpoints, setCheckpoints] = useState<string[]>([]);
  const theme = useTheme();

  const handleChangeCheckpoints = (value: string[]): void => {
    setCheckpoints(value);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={(): void => console.log('Submited')}>
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
              </Stack>
            </Form>
          </DialogContent>
          <DialogActions>
            <Button color="secondary" variant="contained" onClick={onDialogClose}>
              Cancel
            </Button>
            <LoadingButton variant="contained" type="submit" onClick={(): void => handleSubmit()}>
              Create
            </LoadingButton>
          </DialogActions>
        </>
      )}
    </Formik>
  );
};

export default TaskForm;
