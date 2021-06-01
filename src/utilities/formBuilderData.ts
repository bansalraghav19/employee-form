export const formFields: any = [
  {
    heading: "Looking for Connecting with us?",
    fields: [
      {
        type: "BUTTON",
        name: "Start",
      },
    ],
  },
  {
    heading: "Hi there, what's your first name?",
    fields: [
      {
        name: "First Name",
        type: "INPUT",
        required: true,
        whitespace: true,
        inputType: "text",
      },
      {
        type: "BUTTON",
        name: "Next",
      },
    ],
    stateDetails: ["First Name"],
  },
  {
    heading: "And your last name?",
    fields: [
      {
        name: "Last Name",
        type: "INPUT",
        required: true,
        whitespace: true,
        inputType: "text",
      },
      {
        type: "BUTTON",
        name: "Next",
      },
    ],
    stateDetails: ["Last Name"],
  },
  {
    heading: "What is your Gender?",
    fields: [
      {
        name: "gender",
        type: "RADIO_GROUP",
        values: ["Male", "Female"],
      },
      {
        type: "BUTTON",
        name: "Next",
      },
    ],
    stateDetails: ["gender"],
  },
  {
    heading: "What's your Martial status?",
    fields: [
      {
        name: "martial status",
        type: "RADIO_GROUP",
        values: ["Married", "Unmarried"],
        childNodes: [
          {
            name: "Spouse Name",
            type: "INPUT",
            required: true,
            whitespace: true,
          },
        ],
      },
      {
        type: "BUTTON",
        name: "Next",
      },
    ],
    stateDetails: ["martial status", "Spouse Name"],
  },
  {
    heading: "What's your Email Address?",
    fields: [
      {
        name: "Email Adress",
        type: "INPUT",
        required: true,
        whitespace: true,
        inputType: "email",
      },
      {
        type: "BUTTON",
        name: "Next",
      },
    ],
    stateDetails: ["Email Adress"],
  },
  {
    heading: "Enter a Password?",
    fields: [
      {
        name: "Password",
        type: "INPUT",
        required: true,
        whitespace: true,
        inputType: "password",
      },
      {
        type: "BUTTON",
        name: "Next",
      },
    ],
    stateDetails: ["Password"],
  },
  {
    heading: "Tell us a bit about yourself",
    fields: [
      {
        name: "Other Details",
        type: "TEXTAREA",
      },
      {
        type: "BUTTON",
        name: "Next",
      },
    ],
    stateDetails: ["Other Details"],
  },
  {
    heading: "",
    fields: [
      {
        name: "Terms and Conditions",
        type: "CHECKBOX",
        values: "I accept terms and conditions",
      },
      {
        type: "BUTTON",
        name: "Submit",
      },
    ],
    stateDetails: ["Terms and Conditions"],
  },
];
