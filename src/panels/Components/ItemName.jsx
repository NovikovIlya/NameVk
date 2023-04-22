import { Button,Text,Title} from '@vkontakte/vkui'
import React,{useEffect, useState,createContext,useContext} from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from './ItemName.module.css'
import { Icon20ArticleBoxOutline , Icon20Users3, Icon20ArrowUturnLeftOutline, Icon20ArrowshapeLeft2Outline,Icon20LikeCircleFillRed,Icon20ViewOutline,Icon20StarsFilled} from '@vkontakte/icons';
import './../Home.css'
import { Context } from "./../Context";
import bridge from '@vkontakte/vk-bridge';
import {useLastName} from './../../Store'
import {dataZero} from './../../data'




const ItemName = ({name1,getAnekdots,zagr,poslendi}) => {
  const [zagr1,setZagr1] = useState(true)
  const [context, setContext] = useContext(Context);
  const [fetchedUser, setUser] = useState(null);
  const [sovmestimostOpen,setSovmestimostOpen] = useState(false)
  const [conditionValue,setContditionValue] = useState(false)

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
  const data1 = dataZero
  // const data1 = [
  //   {
  //     name: "Августин",
  //     mean: "\"Августин\" - это имя латинского происхождения, которое переводится как \"величественный\", \"возвышенный\", \"почтенный\".",
  //     people: "",
  //     dateName: "",
  
  // },
  // {
  //     name: "Агап",
  //     mean: "\"Агап\" - это имя греческого происхождения, которое переводится как \"любовь\", \"любящий\".",
  //     people: "",
  //     dateName: ""
  // },
  // {
  //     name: "Агата",
  //     mean: "\"Агата\" - это имя греческого происхождения, которое переводится как \"благородная\", \"добрая\", \"благоприятствующая\".",
  //     people: "",
  //     dateName: ""
  // },
  // {
  //     name: "Агафья",
  //     mean: "\"Агафья\" - это имя греческого происхождения, которое переводится как \"добрый\", \"благой\", \"благоприятствующий\".",
  //     people: "",
  //     dateName: ""
  // },
  // {
  //     name: "Адам",
  //     mean: "\"Адам\" - это имя еврейского происхождения, которое переводится как \"человек\", \"человечество\", \"земля\".",
  //     people: "Адам из игры деус икс",
  //     dateName: "1 января"
  // },
  // ];
  // console.log('eee',name);
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

  window.addEventListener('online',  updateOnlineStatus);
	window.addEventListener('offline', updateOnlineStatus);
	  let condition
		function updateOnlineStatus(event) {
		 condition = navigator.onLine ? "online" : "offline";
		// document.body.className = condition;
		console.log(condition);
		if (condition === 'offline'){
			setContditionValue(true)
		}
		if (condition === 'online'){
			setContditionValue(false)
		}
	}

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
            {conditionValue && <p className ='red'>Потеряна связь с интернетом</p>}
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
                <div className={styles.people}>
                    <Title><Icon20ViewOutline />Цвета</Title>
                    <p className={styles.pStyle}>{moeName&& moeName.people}</p>
                </div>
                <div className={styles.people}>
                    <Title><Icon20StarsFilled />Планеты</Title>
                    <p className={styles.pStyle}>{moeName&& moeName.people}</p>
                </div>

                <div className='sovmesBlock'>
                  <Button appearance='negative' onClick={sovmesMakeOpen} className={` btnSovmes ${sovmestimostOpen? 'zero2' : ''}`}>
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
                    <Button  onClick={wallPost} className={styles.btn}>
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