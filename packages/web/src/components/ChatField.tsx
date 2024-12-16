import React, { useEffect, useState } from 'react';
import { IField } from '@frontend/shared/types';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import ChatMessage from './ChatMessage';

type ChatFieldProps = {
  field: IField;
  responsedFields: string[];
  setResponsedFields: (fields: string[]) => void;
  displayStatus: boolean;
};

const ChatField = ({
  field,
  responsedFields,
  setResponsedFields,
  displayStatus,
}: ChatFieldProps) => {
  const [displayLabel, setDisplayLabel] = useState<string>('');
  const [showInput, setShowInput] = useState<boolean>(false);

  const changeHandler = () => {
    if (!responsedFields.includes(field._id)) {
      setResponsedFields([...responsedFields, field._id]);
    }
  };

  useEffect(() => {
    if (displayStatus) {
      if (displayLabel.length < field.label.length) {
        setTimeout(() => {
          setDisplayLabel(field.label.slice(0, displayLabel.length + 1));
        }, 50);
      }
    }
    if (displayLabel === field.label) {
      setShowInput(true);
    }
  }, [displayStatus, displayLabel]);

  if (displayStatus) {
    return (
      <>
        <div>
          <ChatMessage type="bot" message={displayLabel} />
          {showInput &&
            (field.fieldType === 'boolean' ? (
              <FormControlLabel
                control={<Checkbox defaultChecked onChange={changeHandler} />}
                label={field.label}
              />
            ) : field.fieldType === 'text' && field.options.selectOptions ? (
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label={field.label}
                  onChange={changeHandler}
                >
                  {field.options.selectOptions.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : null)}
        </div>
      </>
    );
  }
  return null;
};

export default ChatField;
