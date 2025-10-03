import { Button, createTheme, Modal } from "@mantine/core";

const theme = createTheme({
  fontFamily: "var(--font-sans)",
  colors: {
    primary: [
      "#e5fef2",
      "#d4f8e6",
      "#abeecd",
      "#7fe5b2",
      "#5adc9b",
      "#42d78c",
      "#2bd17e",
      "#23bc71",
      "#15a863",
      "#009153",
    ],
  },
  primaryColor: "primary",
  primaryShade: 6,

  // syncing mantine's breakpoints with tailwind
  breakpoints: {
    xs: "36rem",
    sm: "40rem",
    md: "48rem",
    lg: "64rem",
    xl: "80rem",
    "2xl": "96rem",
  },

  components: {
    Button: Button.extend({
      defaultProps: {
        className: "rounded-[0.625rem]",
      },
    }),
    Modal: Modal.extend({
      classNames: {
        header: "relative",
        title: "text-center w-[90%] mx-auto",
        close: "absolute right-1 top-1",
      },
    }),
  },
});

export default theme;
