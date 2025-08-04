
import React, {FC, useState } from 'react';
import style from './MainPage.module.css'
import imageSrc from '../../images/14-03_Jaremvevych_F_027-Colorized-Photoroom.png';
import StepperComponent from '../../components/stepperComponent/StepperComponent';
import { ThemeProvider } from '@mui/material/styles';
import { muiMobileStepperTheme } from '../../styleHelpers/MuiMobileStepperTheme';
import {articlesApiService} from "../../services/articles.api.service";


const MainPage: FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const maxSteps = 3;

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
      {activeStep === 1 && <section className={style.pageTwo}>
      <div className={style.wrapper}>
        <div className={style.me}><h3>Олег Огоновський <br/><p>1990</p></h3></div>
        <div className={style.father}><h3>Ярослав Огоновський <br/><p>1966</p></h3></div>
        <div className={style.mother}><h3>Ольга Сколоздра <br/><p>1969</p></h3></div>
        <div className={style.grandfatherone}><h3>Роман Огоновський <br/><p>1934-2022</p></h3></div>
        <div className={style.grandfathertwo}><h3>Ольга Скрипець <br/><p>1939-2019</p></h3></div>
        <div className={style.grandmotherone}><h3>Богдан Сколоздра <br/><p>1935-2018</p></h3></div>
        <div className={style.grandmothertwo}><h3>Віра Корецька <br/><p>1941</p></h3></div>
        <div className={style.grandtwoFatherone}><h3>Іван Огоновський</h3></div>
        <div className={style.grandtwoFathertwo}><h3>Катерина Білик</h3></div>
        <div className={style.grandtwoFatherthree}><h3>Іван Скрипець</h3></div>
        <div className={style.grandtwoFatherfour}><h3>Марія Ленців</h3></div>
        <div className={style.grandtwoMotherone}><h3>Степан Сколоздра</h3></div>
        <div className={style.grandtwoMothertwo}><h3>Олена Сколоздра</h3></div>
        <div className={style.grandtwoMotherthree}><h3>Василь Корецький</h3></div>
        <div className={style.grandtwoMotherfour}><h3>Катерина Міджак</h3></div>
        </div>
        <div className={style.aboutFamiles}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, nostrum odit! Aperiam cumque delectus, distinctio dolorem eos illo iste nesciunt nihil nulla perspiciatis, sed, sit? Blanditiis delectus deleniti ipsa ipsam molestias optio quidem tempore? Accusantium aspernatur illo in maiores neque odit omnis qui, quidem quis rem, veritatis vitae. Asperiores, explicabo nobis quam qui saepe soluta?
          </p>
        </div>
      </section>}
      {activeStep === 2 && <section className={style.pageThree}>
        <div className={style.wrapper}>
            {people.map(({ name, years, tag, className }) => (
                <div
                    key={tag}
                    className={className}
                    onClick={() => articlesApiService.searchArticles({ qwerty: { tag: name.replace(/[\s-]/g, '')}})}
                >
                    <h3>
                        {name}
                        {years && (
                            <>
                                <br />
                                <p>{years}</p>
                            </>
                        )}
                    </h3>
                </div>
            ))}
        </div>
        <div className={style.aboutFamiles}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, nostrum odit! Aperiam cumque delectus, distinctio dolorem eos illo iste nesciunt nihil nulla perspiciatis, sed, sit? Blanditiis delectus deleniti ipsa ipsam molestias optio quidem tempore? Accusantium aspernatur illo in maiores neque odit omnis qui, quidem quis rem, veritatis vitae. Asperiores, explicabo nobis quam qui saepe soluta?
          </p>
        </div>
      </section>}
        <ThemeProvider theme={muiMobileStepperTheme}>
          <div className={style.stepperComponent}>
          <StepperComponent  steps={maxSteps} activeStep={activeStep} setStep={setActiveStep} maxSteps={maxSteps} />
            </div>
        </ThemeProvider>
    </div>
  );
};

export default MainPage;