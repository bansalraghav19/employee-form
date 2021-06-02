export const formFields: any = [
  {
    heading: "Looking for Connecting with us?",
    fields: [
      {
        type: "BUTTON",
        name: "Start",
      },
    ],
    stateDetails: [],
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
    stateDetails: [{ name: "First Name", type: "INPUT" }],
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
    stateDetails: [{ name: "Last Name", type: "INPUT" }],
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
    stateDetails: [{ name: "gender", type: "RADIO_GROUP" }],
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
    stateDetails: [
      { name: "martial status", type: "RADIO_GROUP" },
      { name: "Spouse Name", type: "INPUT" },
    ],
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
    stateDetails: [{ name: "Email Adress", type: "INPUT" }],
  },
  {
    heading: "Enter the OTP Recieved?",
    fields: [
      {
        name: "Otp",
        type: "OTP",
        length: 6,
        autoFocus: true,
        isNumberInput: true,
      },
      {
        type: "BUTTON",
        name: "Next",
      },
    ],
    stateDetails: ["Otp"],
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
    stateDetails: [{ name: "Password", type: "INPUT" }],
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
    stateDetails: [{ name: "Other Details", type: "TEXTAREA" }],
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
    stateDetails: [{ name: "Terms and Conditions", type: "CHECKBOX" }],
  },
];
