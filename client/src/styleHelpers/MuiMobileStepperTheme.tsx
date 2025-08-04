import { createTheme } from '@mui/material/styles';

export const muiMobileStepperTheme = createTheme({
  components: {
    MuiMobileStepper: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          justifyContent: 'center',
        },
        dot: {
          backgroundColor: 'var(--text-color)',   // неактивна крапка
          margin: '0 5px',                         // відстань між крапками = 10px
          width: 8,
          height: 8,
        },
        dotActive: {
          backgroundColor: 'var(--text-hover)',   // активна крапка
          width: 10,
          height: 10,
        },
      },
    },
  },
});
