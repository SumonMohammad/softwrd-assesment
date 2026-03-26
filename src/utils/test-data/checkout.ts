export const checkoutData = {
  validUser: {
    firstName: "Sumon",
    lastName: "Mohammad",
    postalCode: "1212",
  },

  invalidUser: {
    noFirstName: {
      firstName: "",
      lastName: "Mohammad",
      postalCode: "1212",
    },
   
    noPostalCode: {
      firstName: "Sumon",
      lastName: "Mohammad",
      postalCode: "",
    },

     noLastName: {
      firstName: "Sumon",
      lastName: "",
      postalCode: "1212",
    },
  },
};
