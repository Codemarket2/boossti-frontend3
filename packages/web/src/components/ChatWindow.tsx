import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IField } from '@frontend/shared/types';
import ChatMessage from './ChatMessage';
import ChatSelect from './ChatSelect';
import ChatField from './ChatField';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    padding: theme.spacing(4),
    maxWidth: 'md',
    margin: '0 auto 2rem auto',
    border: '1px solid #ddd',
    borderRadius: '1rem',
    boxShadow: theme.shadows[2],
  },
}));

type ChatWindowProps = {
  fields: IField[];
};

const ChatWindow = ({ fields }: ChatWindowProps) => {
  const classes = useStyles();

  const [fieldsDisplayStatus, setFieldsDisplayStatus] = useState<boolean[]>([]);

  const [responsedFields, setResponsedFields] = useState<string[]>([]);

  useEffect(() => {
    setFieldsDisplayStatus(Array.from({ length: responsedFields.length + 1 }, () => true));
  }, [responsedFields]);

  return (
    <div className={classes.root}>
      {fields.map((field, index) => (
        <ChatField
          key={field._id}
          field={field}
          responsedFields={responsedFields}
          setResponsedFields={setResponsedFields}
          displayStatus={fieldsDisplayStatus[index] ?? false}
        />
      ))}
    </div>
  );
};

export default ChatWindow;
