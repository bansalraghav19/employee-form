export const formFields: any = [
  {
    heading: "Looking for Connecting with us?",
    fields: [
      {
        type: "button",
        name: "Start",
      },
    ],
  },
  {
    heading: "Hi there, what's your first name?",
    fields: [
      {
        name: "First Name",
        type: "input",
        required: true,
        whitespace: true,
      },
      {
        type: "button",
        name: "Next",
      },
    ],
  },
  {
    heading: "And your last name?",
    fields: [
      {
        name: "Last Name",
        type: "input",
        required: true,
        whitespace: true,
      },
      {
        type: "button",
        name: "Next",
      },
    ],
  },
  {
    heading: "What is your Gender?",
    fields: [
      {
        name: "gender",
        type: "radio_group",
        values: ["Male", "Female"],
        required: true,
        whitespace: true,
      },
      {
        type: "button",
        name: "Next",
      },
    ],
  },
  {
    heading: "What's your Martial status?",
    fields: [
      {
        name: "martial status",
        type: "radio_group",
        values: ["Married", "Unmarried"],
        required: true,
        whitespace: true,
      },
      {
        type: "button",
        name: "Next",
      },
    ],
  },
  {
    heading: "Tell us a bit about yourself",
    fields: [
      {
        name: "Other Details",
        type: "text_area",
      },
      {
        type: "button",
        name: "Next",
      },
    ],
  },
  {
    heading: "",
    fields: [
      {
        name: "Terms and Conditions",
        type: "checkbox",
        values: "I accept terms and conditions",
      },
      {
        type: "button",
        name: "Submit",
      },
    ],
  },
];
