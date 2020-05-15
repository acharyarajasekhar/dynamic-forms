
export const environment = {
  production: false,
  sampleFormConfig: {
    controls: [
      {
        order: 0,
        name: "fullName",
        controlType: 'input',
        inputType: 'text',
        icon: "avatar",
        label: "Full Name",
        validators: {
          required: { message: "Full Name is required" },
          minLength: { length: 5, message: "Full Name must be at least 5 characters long" },
          maxLength: { length: 50, message: "Full Name cannot be more than 50 characters long" },
          pattern: { regEx: "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$", message: 'Full Name must contain only letters' }
        }
      },
      {
        order: 1,
        name: "description",
        controlType: 'textarea',
        icon: "details",
        label: "Brief description about roles and responsibilities",
        validators: {
          required: { message: "Description is required" },
          minLength: { length: 10, message: "Description must be at least 10 characters long" },
          maxLength: { length: 5000, message: "Description cannot be more than 5000 characters long" }
        }
      },
      {
        order: 2,
        name: "contactNumber",
        controlType: 'input',
        inputType: 'number',
        icon: "call",
        label: "Contact Number",
        validators: {
          required: { message: "Contact Number is required" }
          // pattern: { regEx: "^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$", message: 'Invalid contact number' }
        }
      },
      {
        order: 3,
        name: "contactEmail",
        controlType: 'input',
        inputType: 'email',
        icon: "mail",
        label: "Contact Email",
        validators: {
          required: { message: "Contact Email is required" },
          email: { message: "Invalid email id" }
        }
      },
      {
        order: 4,
        name: "salary",
        controlType: 'input',
        inputType: 'number',
        icon: "rupee",
        label: "Monthly Salary",
        validators: {
          required: { message: "Monthly Salary is required" },
          min: { min: 0, message: "Monthly Salary  must be greater than 0" }
        }
      },
      {
        order: 5,
        name: "photos",
        controlType: 'photos',
        icon: "details",
        label: "Choose Cover Photos",
        multiple: true,
        accept: ".png, .jpg, .jpeg",
        validators: {

        }
      },
      {
        order: 6,
        name: "singleOption",
        controlType: 'radiolist',
        icon: "supplyfree",
        label: "Choose...",
        options: [
          "Accommodation",
          "LPG",
          "Rice",
          "Vegetables",
          "Milk"
        ],
        validators: {

        }
      },
      {
        order: 7,
        name: "multiOption",
        controlType: 'checkboxlist',
        icon: "supplyfree",
        label: "Choose...",
        options: [
          "Accommodation",
          "LPG",
          "Rice",
          "Vegetables",
          "Milk"
        ],
        validators: {

        }
      },
      {
        order: 8,
        name: "date",
        controlType: 'input',
        inputType: 'date',
        icon: "date",
        label: "Select Date",
        validators: {
          required: { message: "Date is required" }
        }
      },
      {
        order: 9,
        name: "time",
        controlType: 'input',
        inputType: 'time',
        icon: "time",
        label: "Select Time",
        validators: {
          required: { message: "Time is required" }
        }
      },
      {
        order: 10,
        name: "datetime",
        controlType: 'input',
        inputType: 'datetime-local',
        icon: "date",
        label: "Select DateTime",
        validators: {
          required: { message: "DateTime is required" }
        }
      },
      {
        order: 11,
        name: "address",
        controlType: 'address',
        icon: "postoffice",
        label: "Fill Address",
        validators: {
          required: { message: "Address is required" },
          address: { message: "Incomplete address details" }
        }
      }
    ]
  }
};
