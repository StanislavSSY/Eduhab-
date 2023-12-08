import React from "react";
import styled from "./TeachInfoPage.module.css";
import { Link } from "react-router-dom";

export default function TeachInfoPage(): JSX.Element {
  return (
    <div className={styled.container}>
      <div className={styled.headercontent}>
        <div className={styled.leftcont}>
          <div className={styled.title}>EDUHUB</div>
        </div>
        <div className={styled.centercont}>
          <a className={styled.atag} href="#aboutproject">
            О Проекте
          </a>
          <a className={styled.atag} href="#typecourse">
            Виды курсов
          </a>
          <a className={styled.atag} href="#prices">
            Стоимость
          </a>
          <a className={styled.atag} href="#help">
            Поддержка
          </a>
        </div>
        <div className={styled.rightcont}>
          <Link className={styled.reftocreatecourse} to={"/teach/courses/new"}>
            Создать курс
          </Link>
        </div>
      </div>
      <div className={styled.bodycontent}>
        <div className={styled.aboutservice}>
          <div className={styled.servicetitle}>
            Создайте собственный курс с помощью конструктора EduHub
          </div>
          <div className={styled.serviceaftertitle}>
            Делитесь знаниями на крупнейшей образовательной платформе в России и
            СНГ, создавая бесплатные курсы или монетизируя свои знания с помощью
            платных
          </div>
          <div className={styled.fakebtn}>
            <Link className={styled.reftocoursecreatetwo} to={"/teach/courses/new"}>
              Создать курс
            </Link>
          </div>
          <div>wait img</div>
        </div>
        <div className={styled.aboutGalera} id="aboutproject">
          <div className={styled.galeratitle}>Что такое EduHub?</div>
          <div className={styled.titleresponse}>
            Многофункциональная и гибкая платформа для создания и размещения
            образовательных материалов
          </div>
          <div className={styled.preminfo}>
            <div className={styled.contpremleft}>
              <div className={styled.premlefttitle}>Монетизация</div>
              <div className={styled.premleftrespo}>
                Зарабатывайте делясь знаниями с другими
              </div>
            </div>
            <div className={styled.contpremcenter}>
              <div className={styled.premcentertitle}>Большая аудитория</div>
              <div className={styled.premcenterrespo}>
                7 000 000 пользователей используют EduHub для обучения и
                создания курсов
              </div>
            </div>
            <div className={styled.contpremright}>
              <div className={styled.premrighttitle}>
                10 лет в сфере образования
              </div>
              <div className={styled.premrightrespo}>
                Разработали лучший конструктор курсов, который используют тысячи
                авторов
              </div>
            </div>
          </div>
        </div>
        <div className={styled.borderdown}></div>
        <div className={styled.abouttypeofcourse} id="typecourse">
          <div className={styled.typeoftitle}>Выберите тип курса</div>
          <div className={styled.typecontainer}>
            <div className={styled.paidtype}>
              <div className={styled.typetitle}>
                Создавайте платные курсы для монетизации знаний
              </div>
              <div className={styled.typecontent}>
                Любой автор может разместить курс на продажу в рублях или
                долларах. Мы берём небольшую комиссию, принимаем и обрабатываем
                платежи. Вам будут доступны все функции создания курсов. Ваш
                курс будет доступен десяткам тысяч пользователей EduHub.
              </div>
            </div>
            <div className={styled.freetype}>
              <div className={styled.typetitle}>
                Создавайте бесплатные онлайн-курсы
              </div>
              <div className={styled.typecontent}>
                Обучайте тому, в чем отлично разбираетесь. В каталоге собраны
                курсы по темам от биоинформатики до японского языка. Добавьте
                бесплатный курс по своей теме для тысяч человек аудитории
                EduHub. Для бесплатного курса доступны базовые функции
                платформы.
              </div>
            </div>
          </div>
        </div>
        <div className={styled.prices} id="prices">
          <div className={styled.pricetitle}>Стоимость</div>
          <div className={styled.containerprices}>
            <div className={styled.pricepaid}>
              <div className={styled.pricepaidheader}>
                <div className={styled.pricepaidtitle}>Платные курсы</div>
                <div className={styled.functional}>Полная функциональность</div>
              </div>
              <div className={styled.borderbody}></div>
              <div className={styled.pricepaidbody}>
                <div className={styled.commission}>Комиссия с платежей 5%</div>
                <div className={styled.anytext}>
                  Создавайте платные курсы и монетизируйте свои знания
                </div>
                <div className={styled.pricefakebtncontainer}>
                  <Link className={styled.reftomoreinfopaidcourse} to={"/"}>
                    Узнать больше
                  </Link>
                </div>
              </div>
            </div>
            <div className={styled.pricefree}>
              <div className={styled.pricepaidheader}>
                <div className={styled.pricefreetitle}>Бесплатные курсы</div>
                <div className={styled.functionalfree}>
                  Ограниченная функциональность
                </div>
              </div>
              <div className={styled.borderbodyfree} />
              <div className={styled.pricefreebody}>
                <div className={styled.commissionfree}>Бесплатно</div>
                <div className={styled.anytextfree}>
                  Создавайте открытые курсы без коммерческих целей
                </div>
                <div className={styled.pricefakebtncontainerfree}>
                  <Link className={styled.reftomoreinfopaidcoursefree} to={"/"}>
                    Создать открытый курс
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styled.help} id="help">
          <div className={styled.helptitle}>Окажем необходимую поддержку</div>
          <div className={styled.containerhelping}>
            <div className={styled.containerheader}>Служба поддержки</div>
            <div className={styled.containerbody}>
              Задайте любые вопросы специалистам службы поддержки, чтобы
              получить помощь в создании онлайн-курса.
            </div>
            <div className={styled.containerfakebtnhelp}>
              <Link className={styled.reftohelp} to={"/"}>
                Обратиться
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* <div className={styled.footercontent}>
        <div className={styled.leftcontainerfoot}>
          <div className={styled.firstline}>Galera</div>
          <div className={styled.typicalline}>Каталог</div>
          <div className={styled.typicalline}>О нас</div>
        </div>
        <div className={styled.centercontainerfoot}>
          <div className={styled.firstline}>Условия</div>
          <div className={styled.typicalline}>Условия использования</div>
          <div className={styled.typicalline}>Условия конфиденциальности</div>
        </div>
        <div className={styled.rightcontainerfoot}>
          <div className={styled.firstline}>Контакты</div>
          <div className={styled.typicalline}>Помощь</div>
          <div className={styled.typicalline}>Команда</div>
          <div className={styled.typicalline}>Контакты</div>
          <div className={styled.typicalline}>Вакансии</div>
        </div>
      </div> */}
    </div>
  );
}
