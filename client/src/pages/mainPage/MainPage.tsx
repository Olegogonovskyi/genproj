
import React, {FC, useState } from 'react';
import style from './MainPage.module.css'
import imageSrc from '../../images/14-03_Jaremvevych_F_027-Colorized-Photoroom.png';
import StepperComponent from '../../components/stepperComponent/StepperComponent';


const MainPage: FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const maxSteps = 2;
  return (
    <div>
      {activeStep === 0 && <section className={style.pageOne}>
        <div className={style.textBox}>
          <h1>Родинний сайт Огоновських-Пахолюків</h1>
          <p>
            Тут описано генеалогію предків Олега Огоновського (Огоновські, Сколоздри, Корецькі, Скрипці, Ядвіжаки, Музики та багато інших) в основному з таких локацій: Розвадів, Дроговиж, Верин
            Та генеалогію предків Олени Огоновської (Пахолюк) (Пахолюки, Мурини, Рибіцькі, Ковбасюки, Боднар, Яремкевичі, Подолинські, Гречники, Венгери, Лазоришаки, Чайківські ) в основному з таких локацій: Вовків, Пустомити, Заланів, Петрів, Незвиська та ін.

          </p>
        </div>
        <div className={style.round}>
          <img className={style.mainImage} src={imageSrc} alt='genealogyWebSite_Podolynskyi'/>
        </div>
      </section>}
      {activeStep === 1 && <section className={style.pageTwo}> ... </section>}
      <div className={style.stepperComponent}>
        <StepperComponent  steps={maxSteps} activeStep={activeStep} setStep={setActiveStep} maxSteps={maxSteps} />
      </div>
    </div>
  );
};

export default MainPage;