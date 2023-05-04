import { Button,Text,Title} from '@vkontakte/vkui'
import React,{useEffect, useState,createContext,useContext} from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from './ItemName.module.css'
import {Icon20Rectangle2HorizontalOutline,Icon20DiamondOutline,Icon20Like, Icon20ArticleBoxOutline , Icon20Users3, Icon20ArrowUturnLeftOutline, Icon20ArrowshapeLeft2Outline,Icon20LikeCircleFillRed,Icon20ViewOutline,Icon20StarsFilled} from '@vkontakte/icons';
import './../Home.css'
import { Context } from "./../Context";
import bridge from '@vkontakte/vk-bridge';
import {useLastName} from './../../Store'
import {useOldData} from './../../Store2'
import {dataZero} from './../../data'







const ItemName = ({name1,getAnekdots,zagr,poslendi}) => {
  const [zagr1,setZagr1] = useState(true)
  const [context, setContext] = useContext(Context);
  const [fetchedUser, setUser] = useState(null);
  const [sovmestimostOpen,setSovmestimostOpen] = useState(false)
  const [conditionValue,setContditionValue] = useState(false)
  const [moe,setMoe] = useState('')
  const [err,setErr] = useState(false)
  const [zagryzhay,setZagryszhay] = useState(true)

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
    
    // if (pol === 1){
    //   let textPol = 'Теперь мне известна тайна моего имени! \n'   + moe.name_meaning + '\n'  + 'Узнай тайну и ты: https://vk.com/app51616632_70033480'
    // }
    // if (pol === 2){
    //   let textPol = 'Я узнал тайну имени! \n'   + moe.name_meaning + '\n'  + 'Узнай тайну и ты: https://vk.com/app51616632_70033480'
    // }
    // if (pol === 0){
    //   let textPol = 'Я узнал тайну имени! \n'   + moe.name_meaning + '\n'  + 'Узнай тайну и ты: https://vk.com/app51616632_70033480'
    // }

  },[])

  useEffect(()=>{
    setTimeout(menyamZagr1,2000)
  },[])
  
  function wallPost(){
    bridge.send('VKWebAppShowWallPostBox', {
        message: 'Теперь мне известна тайна моего имени! \n'   + moe.name_meaning + '\n'  + 'Узнай тайну и ты: https://vk.com/app51616632_70033480' , 
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
    // setZagr1(prev => false)
    setContext(false)
  }

  const {name} = useParams()
  // const data1 = dataZero
  
  let moeName
  useEffect(()=>{
    let papaData = oldData.find(item => item.name == name)
    console.log('papa11',papaData);
    if (papaData){
      setMoe(papaData)
      setZagryszhay(false)
    }else {
    
      try {
        console.log(name);
        async function sendName(){
          let response = await fetch(`https://atoma-horoscope.onrender.com/name/${name}`); 
          let result = await response.json();
          moeName = result
          setMoe(moeName)
          console.log(name1);
          console.log(moeName);
          setErr(false)
          setZagryszhay(false)


          addOld(result)
        }
        sendName()
      
        
      } catch (error) {
        console.log(error);
        setErr(true)
        setZagryszhay(false)
        
      }finally{

      }}

  },[name])
  

  
  

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

  const oldData = useOldData((state)=>state.olderData)
  console.log('older111',oldData);
  const addOld = useOldData((state)=>state.addOlderData)

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
  let url = window.location.href
  let regexp = new RegExp(`${name}`, 'igm')
  console.log(regexp);
  console.log(url);
  console.log(name1);
  
  
  

  return (
    <div className={styles.containerItem}>
    {err? <p>Не удалось получить данные. Попробуйте повторить попытку позднее</p> : ''}
    
        <div className={`wh ${moeName? context? 'zero1' : '' : ''}`}>
        {name && <>
            <div className={styles.btnParent}>
                <Link className={styles.btnLink} to='/' >
                    <Button   className={styles.btn}>
                        <div className='btnKek'>
                            <Icon20ArrowUturnLeftOutline/><p className='Ppublic'>Назад</p>
                        </div>
                    </Button>
                </Link>
            </div>
            <div className='LineParent '>
           <div className='LineItem'> </div>
          </div>
        </>}
        </div>


  

        {name&& zagryzhay===true? 
          <div className='zagMain'>
				    <div className='zagzag'>
				    	<h1 className='zagryzka'>Идет загрузка</h1>
				    	<div className='spin'>
					    	<div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
					    </div>
				    </div>
			    </div>
            
        : ''}

        <div className={` whBlock ${moeName? context? 'zero1' : '' : ''}`}>
            {conditionValue && <p className ='red'>Потеряна связь с интернетом</p>}
            {name ? '' : 
            err ===false && <>
            <Link onClick={zagryzimReclamy} className={styles.item}  to={`/${name1}`}>{name1}</Link>
            </>}

            {name&& 
            zagryzhay === false &&
             <>
                <div className={styles.mean}>
                    <Title><Icon20ArticleBoxOutline />Описание</Title>
                    <p className={styles.pStyle}>{ moe.name_meaning}</p>
                </div>
                <div className={styles.people}>
                    <Title><Icon20Like />Любовная характеристика</Title>
                    <p className={styles.pStyle}>{ moe.compability}</p>
                </div>
                <div className={styles.people}>
                    <Title><Icon20Users3 />Корни имени</Title>
                    <p className={styles.pStyle}>{ moe.name_origins}</p>
                </div>
                <div className={styles.people}>
                    <Title><Icon20ViewOutline />Цвета</Title>
                    <p className={styles.pStyle}>{ moe.name_colors}</p>
                </div>
                <div className={styles.people}>
                    <Title><Icon20StarsFilled />Числа</Title>
                    <p className={styles.pStyle}>{ moe.lucky_numbers}</p>
                </div>
                <div className={styles.people}>
                    <Title><Icon20DiamondOutline />Камни</Title>
                    <p className={styles.pStyle}>{ moe.name_stones}</p>
                </div>
                <div className={styles.people}>
                    <Title><Icon20Rectangle2HorizontalOutline />Металл</Title>
                    <p className={styles.pStyle}>{ moe.name_metall}</p>
                </div>

                <div className='sovmesBlock'>
                
                  <Button appearance='negative' onClick={sovmesMakeOpen} className={` btnSovmes ${sovmestimostOpen? 'zero2' : ''}`}>
                    {/* <div>Узнать совместимость имени!</div> */}
                    <div className='posleProsmotra rrr'>Узнать совместимость имени! После просмотра рекламы</div>
                  </Button>
                  
                </div>

                <div className={` wh2 ${sovmestimostOpen? '' : 'zero2'}`}>
                  <div className={styles.people}>
                      <Title><Icon20LikeCircleFillRed />Совместимость имени</Title>
                      <p className={styles.pStyle}>{ moe.best_lovers}</p>
                  </div>
                </div>

                <div className={styles.btnParent}>
                  <div className={styles.btnLink}>
                    <Button  onClick={wallPost} className={styles.btn}>
                      
                        <div className='btnKek'>
                              <Icon20ArrowshapeLeft2Outline/><p className='Ppublic'>Опубликовать на стене!</p>
                          </div>
                      
                        
                    </Button>
                    </div>
                    
                </div>
               
            </>}
        </div>
        
    </div>
    
    
  )
}

export default ItemName