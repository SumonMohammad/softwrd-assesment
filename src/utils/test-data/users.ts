export const users = {
  standard: {
    username: "standard_user",
    password: "secret_sauce",
  },
  locked: {
    username: "locked_out_user",
    password: "secret_sauce",
  },
  problem: {
    username: "problem_user",
    password: "secret_sauce",
  },
  performance: {
    username: "performance_glitch_user",
    password: "secret_sauce",
  },
  error: {
    username: "error_user",
    password: "secret_sauce",
  },
  invalid: {
    wrongPassword: {
      username: "standard_user",
      password: "wrong_pass",
    },
    empty: {
      username: "",
      password: "",
    },
    sqlInjection: {
      username: "' OR 1=1 --",
      password: "test",
    },
  },
};
