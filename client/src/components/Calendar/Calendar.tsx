import { useState } from 'react';
import { StaticDatePicker, PickersDay, PickersDayProps } from '@mui/lab';

const Calendar: React.FC = () => {
  const [value, setValue] = useState<Date | null>(new Date());

  const renderDay = (
    _: Date,
    __: (Date | null)[],
    pickersDayProps: PickersDayProps<Date>
  ): JSX.Element => {
    return <PickersDay {...pickersDayProps} />;
  };

  return (
    <StaticDatePicker
      showToolbar={false}
      value={value}
      onChange={(date): void => setValue(date)}
      renderInput={() => <input />}
      renderDay={renderDay}
    />
  );
};

export default Calendar;
