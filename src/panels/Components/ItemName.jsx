import { Button,Text,Title} from '@vkontakte/vkui'
import React,{useEffect, useState,createContext,useContext} from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from './ItemName.module.css'
import { Icon20ArticleBoxOutline , Icon20Users3, Icon20ArrowUturnLeftOutline, Icon20ArrowshapeLeft2Outline,Icon20LikeCircleFillRed} from '@vkontakte/icons';
import './../Home.css'
import { Context } from "./../Context";
import bridge from '@vkontakte/vk-bridge';
import {useLastName} from './../../Store'


const ItemName = ({name1,getAnekdots,zagr,poslendi}) => {
  const [zagr1,setZagr1] = useState(true)
  const [context, setContext] = useContext(Context);
  const [fetchedUser, setUser] = useState(null);
  const [sovmestimostOpen,setSovmestimostOpen] = useState(false)

  // Проверка готовности рекламы
bridge.send('VKWebAppCheckNativeAds', { ad_format: 'reward' })
.then((data) => {
  if (data.result) {
    // Предзагруженная реклама есть.

    // Теперь можно создать кнопку
    // "Посмотрите рекламу".   
    // ...
          
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


  useEffect(() => {
    async function fetchData() {
        const user = await bridge.send('VKWebAppGetUserInfo');
        setUser(user);
    }
    fetchData();
    console.log(fetchedUser);
  },[])

  useEffect(()=>{
    setTimeout(menyamZagr1,5000)
  },[])

  function wallPost(){
    bridge.send('VKWebAppShowWallPostBox', {
        message: 'Я узнал тайну своего имени! Узнай и ты!' + " "  + moeName.mean,
        attachment: 'https://vk.com/app51616632_70033480',
        owner_id: fetchedUser.id
      })
      .then( (data) => {
        // Запись отправлена на стену
        console.log(`Идентификатор записи: ${data.post_id}`);
      })
      .catch( (e) => {
        console.log("Ошибка!", e);
      })
  }
   
 

  const menyamZagr1 = ()=>{
    setZagr1(prev => false)
    setContext(false)
  }

  const {name} = useParams()

  const data1 = [
    {
      name: "Августин",
      mean: "\"Августин\" - это имя латинского происхождения, которое переводится как \"величественный\", \"возвышенный\", \"почтенный\".",
      people: "",
      dateName: "",
      compatibility: 'Вопрос совместимость имени Августин с женскими именами достаточно сложен, впрочем, как и в случае с другими наименованиями. И тем не менее, имеется утверждение, согласно коему, наилучшей он является в случае создания пары с женщинами, именующимися такими вариациями как Лолита, Каролина, Кристина, Татьяна, Алевтина, Василиса, Наталья и Елизавета. Судя по всему, тут имеются высокие шансы на успешное построение реально крепкой и счастливой пары. Августа, Анфиса, Вероника, Элеонора, Прасковья, Стефания и Клавдия – в случае построения отношений с дамами, именующимися этими вариантами именоформ, совместимость чуть похуже. И все же. В паре обязательно будет взаимопонимание, любовь, страсть и искренность. Просто все это может резко и в самый неожиданный момент замениться на безудержную ревность и разногласия со скандалами по незначительным поводам. Особенно если характеры у обоих слишком взрывные. А с Тамилой, Ренатой, Серафимой, Станиславой, Стеллой, Варварой и Валерией астрологи и вовсе не рекомендуют создавать союз, ибо тут ни звездами, ни значениями имен не предусматривается никакой совместимость. Тут будут лишь ссоры и сплошной негатив. Хотя все это не стопроцентно точные утверждения.',
  },
  {
      name: "Агап",
      mean: "\"Агап\" - это имя греческого происхождения, которое переводится как \"любовь\", \"любящий\".",
      people: "",
      dateName: ""
  },
  {
      name: "Агата",
      mean: "\"Агата\" - это имя греческого происхождения, которое переводится как \"благородная\", \"добрая\", \"благоприятствующая\".",
      people: "",
      dateName: ""
  },
  {
      name: "Агафья",
      mean: "\"Агафья\" - это имя греческого происхождения, которое переводится как \"добрый\", \"благой\", \"благоприятствующий\".",
      people: "",
      dateName: ""
  },
  {
      name: "Адам",
      mean: "\"Адам\" - это имя еврейского происхождения, которое переводится как \"человек\", \"человечество\", \"земля\".",
      people: "Адам из игры деус икс",
      dateName: "1 января"
  },
  ];

  const moeName = data1.find(item=>item.name === name)

  const zagryzimReclamy = ()=>{
    if(context !== false){
        getAnekdots()
    } 
  }

  useEffect(()=>{
    addNameLast(name)
  },[])

  const sovmesMakeOpen = ()=>{
    setSovmestimostOpen(true)
    fooButtonClickReward()
  }

  const addNameLast = useLastName((state)=>state.addLastName)

  return (
    <div className={styles.containerItem}>
    
    { moeName && context? <p>Идет загрузка...</p> : ''}
        <div className={`wh ${moeName? context? 'zero1' : '' : ''}`}>
        {moeName && <>
            <div className={styles.btnParent}>
                <Link className={styles.btnLink} to='/' >
                    <Button   className={styles.btn}>
                        <div className='btnKek'>
                            <Icon20ArrowUturnLeftOutline/>Назад
                        </div>
                    </Button>
                </Link>
            </div>
        </>}
        </div>

        <div className={` whBlock ${moeName? context? 'zero1' : '' : ''}`}>
            {moeName ? '' : <>
            <Link onClick={zagryzimReclamy} className={styles.item}  to={`/${name1}`}>{name1}</Link>
            </>}

            {moeName && <>
                <div className={styles.mean}>
                    <Title><Icon20ArticleBoxOutline />Описание</Title>
                    <p className={styles.pStyle}>{moeName&& moeName.mean}</p>
                </div>
                <div className={styles.people}>
                    <Title><Icon20Users3 />Известные люди</Title>
                    <p className={styles.pStyle}>{moeName&& moeName.people}</p>
                </div>

                <div className='sovmesBlock'>
                  <Button onClick={sovmesMakeOpen} className={` btnSovmes ${sovmestimostOpen? 'zero2' : ''}`}>
                    <div>Узнать совместимость имени!</div>
                    <div className='posleProsmotra'>после просмотра рекламы</div>
                  </Button>
                </div>

                <div className={` wh2 ${sovmestimostOpen? '' : 'zero2'}`}>
                  <div className={styles.people}>
                      <Title><Icon20LikeCircleFillRed />Совместимость</Title>
                      <p className={styles.pStyle}>{moeName&& moeName.compatibility}</p>
                  </div>
                </div>

                <div className={styles.btnParent}>
                    <Button onClick={wallPost} className={styles.btn}>
                        <div className='btnKek'>
                             <Icon20ArrowshapeLeft2Outline/>Опубликовать на стене!
                        </div>
                    </Button>
                    
                </div>
               
            </>}
        </div>
        
    </div>
    
    
  )
}

export default ItemName