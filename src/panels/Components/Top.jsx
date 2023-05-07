import React,{useState,useEffect} from 'react'
import styles from './ItemName.module.css'
import { Link } from 'react-router-dom'
import { Icon20ArticleBoxOutline , Icon20Users3, Icon20ArrowUturnLeftOutline, Icon20ArrowshapeLeft2Outline,Icon20LikeCircleFillRed,Icon20ViewOutline,Icon20StarsFilled} from '@vkontakte/icons';
import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar,Title, Text,Input } from '@vkontakte/vkui';
import bridge from '@vkontakte/vk-bridge';

const Top = () => {
  const [reclama,setReaclama] = useState(false)
  const [otobrazhaemFemale,setOtobrazhaemFemale] = useState(true)

  useEffect(() => {
    //  document.querySelector('#wk_layer_wrap').scroll(0,-500)
    window.scrollTo(0,0)
    bridge.send('VKWebAppScroll', {
        top: 0,
        speed: 600
        }) 
        .then((data) => { 
          if (data.top) {
            // Окно бразера прокручено
          }
        })
        .catch((error) => {
          // Ошибка
          console.log(error);
        });
    }, [])

  const PokazReckamy = ()=>{
    setReaclama(true)
    fooButtonClickReward()
  }

    // Проверка готовности рекламы
bridge.send('VKWebAppCheckNativeAds', { ad_format: 'reward' })
.then((data) => {
  if (data.result) {
  } else {
    console.log('Рекламные материалы не найдены.');
  }
})
.catch((error) => { console.log(error); /* Ошибка */  });

// Обработчик нажатия кнопки "Посмотрите рекламу"
function fooButtonClickReward()
{
// Показать рекламу
bridge.send('VKWebAppShowNativeAds', { ad_format: 'reward' })
  .then((data) => {
    if (data.result) // Успех
      console.log('Реклама показана');
    else // Ошибка 
      console.log('Ошибка при показе');
  })
  .catch((error) => { console.log(error); /* Ошибка */ });
}
bridge.send('VKWebAppShowBannerAd', {
    banner_location: 'bottom'
    })
   .then((data) => { 
      if (data.result) {
        // Баннерная реклама отобразилась
      }
    })
    .catch((error) => {
      // Ошибка
      console.log(error);
    });

  return (
    <>
    <div>
        <div className={styles.btnParent}>
            <Link className={styles.btnLink} to='/' >
                <Button   className={styles.btn}>
                    <div className='btnKek'>
                        <Icon20ArrowUturnLeftOutline/><p>Назад</p>
                    </div>
                </Button>
            </Link>
        </div>
        <div className='whBlock'>
            <Button appearance={`${otobrazhaemFemale? 'negative' : ''}`} onClick={()=>setOtobrazhaemFemale(true)} className='top1'>Женские</Button>
            <Button appearance={`${otobrazhaemFemale===false? 'negative' : ''}`} onClick={()=>setOtobrazhaemFemale(false)} className='top2'>Мужские</Button>
        </div>
        <div className={` whBlock ${otobrazhaemFemale? '' : 'zero2'}`}>
            <div className={styles.mean}>
                {/* <Title><Icon20ArticleBoxOutline />Женские</Title> */}
                <p className={styles.pStyle}>10 место - Варвара</p>
                <p className={styles.pStyle}>Женское имя греческого происхождения (ср. ва́рвары). Варвара — женщина-коктейль, да такой, что от него может сильно болеть голова, в том числе и у самой Вари. В ней уживаются нежность и твердость, скромность и капризность, естественная непосредственность и мощь, сравнимая с необузданной стихией.</p>
            </div>
            <div className={styles.mean}>
                <p className={styles.pStyle}>9 место - Василиса</p>
                <p className={styles.pStyle}>Происходит от древнегреческого слова, означающего «жена василевса», «правительница». Считается, что девочки с этим именем имеют властный характер, отличаются твердой деловой хваткой и хорошими организаторскими способностями. Эти характеристики роднят их с обладательницами еще одного популярного имени – Екатерина.</p>
            </div>
            <div className={styles.mean}>
                <p className={styles.pStyle}>8 место - Александра</p>
                <p className={styles.pStyle}>Имя Александра в переводе с греческого означает «мужественная», «защитница». Парное мужское имя – Александр. В русском, украинском и белорусском языках это имя имеет различные формы: Лександра, Ляксандра, Олекса, Алекса, Алеся, Олеся, Леся. Под влиянием французского языка имя Александр приобрело звучание, после которого появились новые женские имена, ставшие в дальнейшем самостоятельными – Александрина, Александрия, Алеста, Сандра и Сандрина.</p>
            </div>
            <div className={styles.mean}>
                <p className={styles.pStyle}>7 место - Полина</p>
                <p className={styles.pStyle}>Женская форма французского имени Поль происходит от латинского paulus - «малыш» или «маленький». В Греции, в которой, как известно, все есть, и Полины есть, а точнее Аполлинарии, то есть «солнечные», в честь бога солнечного света Аполлона.</p>
            </div>
            <div className={styles.mean}>
                <p className={styles.pStyle}>6 место - Ева</p>
                <p className={styles.pStyle}>Красивое женское имя еврейского происхождения. В переводе с иврита – «дающая жизнь». А вот популярность имени Адам в России гораздо ниже, чем у его библейской подруги, но она все же выше, чем в 2021 году.</p>
            </div>
            <div className={styles.mean}>
                <p className={styles.pStyle}>5 место - Виктория</p>
                <p className={styles.pStyle}>В римской мифологии Виктория – богиня победы. Неудивительно, что имя Виктория означает «победа» или «победительница».</p>
            </div>
            <div className={styles.mean}>
                <p className={styles.pStyle}>4 место - Алиса</p>
                <p className={styles.pStyle}>Если брать древнегерманский вариант, то Алиса – «благородная», «великодушная». А если греческий – то «истина». Есть версия, что это имя – сокращение от «Аделаида».</p>
            </div>
            
            <div className={styles.mean}>
                        <p className={styles.pStyle}>3 место - Анна</p>
                        <p className={styles.pStyle}>Имя Анна с иврита переводится как «храбрость», «сила», «благодать». В христианстве Анна – мать Богородицы, бабушка Иисуса Христа (богопраматерь), жена святого Иоакима, родившая дочь чудесным образом после долгих лет бездетного брака. Поэтому имя Анна также переводят как «милость божья».</p>
                    </div>
                    <div className={styles.mean}>
                        <p className={styles.pStyle}>2 место - Мария</p>
                        <p className={styles.pStyle}>Мария – женское древнееврейское имя. Произошло оно от имени Мариам (Марьям), что в переводе обозначает «горькая», «печальная», «отвергающая», «госпожа», «любимая». Более того, оно считается библейским именем, так звали Богородицу.</p>
                    </div>
                    <div className={styles.mean}>
                        <p className={styles.pStyle}>1 место - София</p>
                        <p className={styles.pStyle}>Это относительно молодой лидер топ-10 самых популярных женских имен. Оно возглавило список лишь в 2016 году, зато с тех пор остается на первом месте. Имя София – греческих корней, и в переводе означает «премудрость».</p>
                    </div>

            {/* <Button onClick={PokazReckamy} appearance='negative' className={` whBlock1 ${reclama? 'zero2' : ''}`} >
                    <div>Узнать топ 3 имени!</div>
                    <div className='posleProsmotra'>после просмотра рекламы</div>
                </Button>
            <div className={` whBlock ${reclama? '' : 'zero2'}`}>
                
                  <div className={styles.mean}>
                        <p className={styles.pStyle}>3 место - Анна</p>
                        <p className={styles.pStyle}>Имя Анна с иврита переводится как «храбрость», «сила», «благодать». В христианстве Анна – мать Богородицы, бабушка Иисуса Христа (богопраматерь), жена святого Иоакима, родившая дочь чудесным образом после долгих лет бездетного брака. Поэтому имя Анна также переводят как «милость божья».</p>
                    </div>
                    <div className={styles.mean}>
                        <p className={styles.pStyle}>2 место - Мария</p>
                        <p className={styles.pStyle}>Мария – женское древнееврейское имя. Произошло оно от имени Мариам (Марьям), что в переводе обозначает «горькая», «печальная», «отвергающая», «госпожа», «любимая». Более того, оно считается библейским именем, так звали Богородицу.</p>
                    </div>
                    <div className={styles.mean}>
                        <p className={styles.pStyle}>1 место - София (Софья)</p>
                        <p className={styles.pStyle}>Это относительно молодой лидер топ-10 самых популярных женских имен. Оно возглавило список лишь в 2016 году, зато с тех пор остается на первом месте. Имя София – греческих корней, и в переводе означает «премудрость».</p>
                    </div>
                
            
            </div> */}
        </div>


        <div className={` whBlock ${otobrazhaemFemale? 'zero2' : ''}`}>

            <div className={styles.mean}>
                <p className={styles.pStyle}>10 место - Даниил</p>
                <p className={styles.pStyle}>Десятую позицию рейтинга занимает красивое и древнее имя еврейского происхождения. Так звали пророка Даниила. В буквальном переводе означает «Бог — мой судья» или же, по другому толкованию, «Бог есть судья».</p>
            </div>
            <div className={styles.mean}>
                {/* <Title><Icon20ArticleBoxOutline />Женские</Title> */}
                <p className={styles.pStyle}>9 место - Дмитрий. </p>
                <p className={styles.pStyle}>Как и большинство самых популярных имен в России 2022 года, имя Дмитрий имеет греческие корни. Означает «под покровительством Деметры», богини земледелия и плодородия, научившей людей возделывать землю.</p>
            </div>
            <div className={styles.mean}>
                <p className={styles.pStyle}>8 место - Матвей.</p>
                <p className={styles.pStyle}>Этимологическое значение этого имени – человек, дарованный Богом. Старинные формы имени – Матфей и Матфий. В других странах Матвеи становятся Матиушами, Маттиасами и Маттео.</p>
            </div>
            <div className={styles.mean}>
                <p className={styles.pStyle}>7 место - Иван.</p>
                <p className={styles.pStyle}>Имя Иван (Иоанн, Йоханан) имеет библейское происхождение и древнееврейские корни. В переводе с еврейского языка означает «божье благоволение», «милость божья».</p>
            </div>
            <div className={styles.mean}>
                <p className={styles.pStyle}>6 место - Артем.</p>
                <p className={styles.pStyle}>Один год (2012) это имя занимало первую строчку в списке самых популярных в России имен для мальчиков, но затем вновь уступило пальму первенства Александру. В переводе с греческого Артем – «здоровый, невредимый». Является разговорной формой имени Артемий, которое, в свою очередь, связано с именем богини Артемиды.</p>
            </div>
            <div className={styles.mean}>
                <p className={styles.pStyle}>5 место - Марк</p>
                <p className={styles.pStyle}>Имя Марк имеет несколько версий происхождения имени. По первой версии имя Марк произошло от греческого имени Маркос, которое имеет латинские корни и произошло в свою очередь от латинского слова «marcus», означающего «молоток». По второй версии имя Марк берёт начало от имени бога, покровителя людей и стад, впоследствии ставшего богом войны – Марса. Подтверждением этому является наличие у римлян преномена (личного имени) Marcus. У христиан почитается евангелист Марк, апостол от 70-ти, который считается покровителем животноводов, а также секретарей, нотариусов и подростков.</p>
            </div>
            <div className={styles.mean}>
                <p className={styles.pStyle}>4 место - Лев.</p>
                <p className={styles.pStyle}>Еще в 2019 году имя Лев было на девятой позиции, а в 2022 занимает четвертое место по популярности. Это имя греки давали новорожденным, чтобы те обрели силу одноименного животного. Долгое время имя Лев в России было нераспространенным, лишь в начале 20-го века его стали часто давать детям в честь Льва Толстого.</p>
            </div>
            <div className={styles.mean}>
                        <p className={styles.pStyle}>3 место - Максим</p>
                        <p className={styles.pStyle}>Римское родовое имя, означавшее «величайший». И если это мужское имя вошло в число самых распространенных в России, то вот женская версия – Максима – почти не встречается в нашей стране.</p>
                    </div>
                    <div className={styles.mean}>
                        <p className={styles.pStyle}>2 место - Михаил</p>
                        <p className={styles.pStyle}>Имя Михаил в переводе с древнеиудейского языка означает «равный, подобный Богу», также существует вариант перевода – «испрошенный у Бога». Имя Михаил широко распространено в Европе: Майкл, Мишель, Мигель, Михай – это всё аналоги имени Михаил. Существует ещё одно производное мужское имя, чаще встречаемое в Австралии. Это имя Митчелл. От мужского имени Михаил были образованы женские имена: Михаила, Мишел, Мишель, Михаэла, Мигела, Микаэла, Мигелина, Микеланджела, Микела, Михайлина, Михалина, Михала.</p>
                    </div>
                    <div className={styles.mean}>
                        <p className={styles.pStyle}>1 место - Александр.</p>
                        <p className={styles.pStyle}>Безоговорочный лидер уже многие годы, лишь в 2012 году уступил первенство Артему. Происхождение этого имени – греческое.</p>
                    </div>

            {/* <Button onClick={PokazReckamy} appearance='negative' className={` whBlock1 ${reclama? 'zero2' : ''}`} >
                    <div>Узнать топ 3 имени!</div>
                    <div className='posleProsmotra'>после просмотра рекламы</div>
                </Button>
            <div className={` whBlock ${reclama? '' : 'zero2'}`}>
                
                  <div className={styles.mean}>
                        <p className={styles.pStyle}>3 место - Максим</p>
                        <p className={styles.pStyle}>Римское родовое имя, означавшее «величайший». И если это мужское имя вошло в число самых распространенных в России, то вот женская версия – Максима – почти не встречается в нашей стране.</p>
                    </div>
                    <div className={styles.mean}>
                        <p className={styles.pStyle}>2 место - Михаил</p>
                        <p className={styles.pStyle}>Имя Михаил в переводе с древнеиудейского языка означает «равный, подобный Богу», также существует вариант перевода – «испрошенный у Бога». Имя Михаил широко распространено в Европе: Майкл, Мишель, Мигель, Михай – это всё аналоги имени Михаил. Существует ещё одно производное мужское имя, чаще встречаемое в Австралии. Это имя Митчелл. От мужского имени Михаил были образованы женские имена: Михаила, Мишел, Мишель, Михаэла, Мигела, Микаэла, Мигелина, Микеланджела, Микела, Михайлина, Михалина, Михала.</p>
                    </div>
                    <div className={styles.mean}>
                        <p className={styles.pStyle}>1 место - Александр.</p>
                        <p className={styles.pStyle}>Безоговорочный лидер уже многие годы, лишь в 2012 году уступил первенство Артему. Происхождение этого имени – греческое.</p>
                    </div>
                
            
            </div> */}
        </div>
    </div>
    </>
  )
}

export default Top