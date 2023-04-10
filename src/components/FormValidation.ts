type formValues = {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    gender?: string;
    dateOfBirth?: string;
  };
  
  export const validate = (values: formValues) => {
    const errors: formValues = {};
  
    if (!values.firstName) {
      errors.firstName = "*This Field is Required";
    } else if (values.firstName.length > 15) {
      errors.firstName = "Must be 15 characters or less";
    }
  
    if (!values.lastName) {
      errors.lastName = "*This Field is Required";
    } else if (values.lastName.length > 20) {
      errors.lastName = "Must be 20 characters or less";
    }
  
    if (!values.email) {
      errors.email = "*This Field is Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
  
    if (!values.password) {
      errors.password = "*This Field is Required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i.test(
        values.password
      )
    ) {
      errors.password =
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character";
    }
  
    if (!values.dateOfBirth) {
      errors.dateOfBirth = "*This Field is Required";
    } 
  
   
  
    return errors;
  };
  