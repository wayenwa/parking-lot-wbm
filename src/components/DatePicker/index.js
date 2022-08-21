import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function DatePicker(props) {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <Stack component="form" noValidate spacing={3}>
        <TextField
          id="datetime-local"
          label= { (props.label) ?  props.label : "Time of entry" }
          type="datetime-local"
          defaultValue={ new Date()}
          sx={{ width: 250 }}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={ props.onChange }
        />
      </Stack>
    </div>
  );
}