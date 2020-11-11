import React from 'react';
import { Formik, Form } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {
    withStyles,
    makeStyles,
    withTheme,
  } from '@material-ui/core/styles';
import strings from '../../localization/label';

  const TextArea = withStyles({
    root: {
      '& .MuiInputBase-input':{
        color:'white',
      },
      '& label.Mui-focused': {
        color: 'green',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'red',
        },
        '&:hover fieldset': {
          borderColor: 'yellow',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'green',
        },
      },
    },
  })(TextField);

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      color: 'white',
      margin: theme.spacing(1),
    },
  }));
  
const DataEntryForm = ({setTextToCreateTag, data}) => {
    const classes = useStyles();
    return(<>
          <Typography variant="h3" gutterBottom>{strings.form_title}</Typography>
              <Formik
                  initialValues={{ data }}
                  validate={values => {
                      const errors = {};
                      if (!values.data) {
                      errors.data = "Can't proceed without data";
                      } 
                      return errors;
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                      setTextToCreateTag(values);
                  }}
                  >
              {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  isValidating
                  /* and other goodies */
              }) => (
                  <Form>
                      <Grid container spacing={3}>
                          <Grid item xs={12}>
                                  <TextArea
                                      className={classes.margin} 
                                      label={strings.enter_data}
                                      variant="filled"
                                      type="data"
                                      placeholder={strings.placeholder}
                                      name="data"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.email}
                                      multiline
                                      rows={10}
                                      rowsMax={10}
                                      fullWidth={true}
                                      error={errors.data && touched.data && errors.data}
                                      helperText={errors.data}
                                  />
                                  
                          </Grid>
                          <Grid item xs={12}>
                              <Button variant="contained" color="primary" onClick={handleSubmit} disabled={isSubmitting && isValidating}>
                                {strings.submit_button_label}
                              </Button>
                          </Grid>
                      </Grid>
                  </Form>
              )}
              </Formik>
          </>)
};

export default DataEntryForm;
