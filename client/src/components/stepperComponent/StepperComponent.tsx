import React, { FC } from 'react';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { Box } from '@mui/material';

const StepperComponent: FC<{steps: number, setStep: (value: React.SetStateAction<number>) => void, activeStep: number, maxSteps: number}> = ({steps, activeStep, setStep, maxSteps}) => {

  const theme = useTheme();

  const handleNext = () => {
    setStep(activeStep + 1);
  };

  const handleBack = () => {
    setStep(activeStep - 1);
  };

  return (
    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>

    <MobileStepper
      variant="dots"
      steps={steps}
      position="static"
      activeStep={activeStep}
      sx={{ maxWidth: 400, flexGrow: 1 }}
      nextButton={
        <Button variant="text"
                sx={{
                  color: 'var(--text-color)',
                  '&:hover': {
                    color: 'var(--text-hover)',
                  },
                  textTransform: 'none',
                  px: 2,
                  fontSize: '14px',
                  fontWeight: 500,
                }}
                onClick={handleNext} disabled={activeStep === (maxSteps-1)}>
          Далі
          {theme.direction === 'rtl' ? (
            <NavigateBeforeRoundedIcon />
          ) : (
            <NavigateNextRoundedIcon />
          )}
        </Button>
      }
      backButton={
        <Button variant="text"
                sx={{
                  color: 'var(--text-color)',
                  '&:hover': {
                    color: 'var(--text-hover)',
                  },
                  textTransform: 'none',
                  px: 2,
                  fontSize: '14px',
                  fontWeight: 500,
                }}
                onClick={handleBack} disabled={activeStep === 0}>
          {theme.direction === 'rtl' ? (
            <NavigateNextRoundedIcon />
          ) : (
            <NavigateBeforeRoundedIcon />
          )}
          Назад
        </Button>
      }
    />
    </Box>
  );
}

export default StepperComponent