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
import LazyLoad from 'react-lazy-load';
import { useInView } from 'react-intersection-observer';





const ItemName = ({name1,getAnekdots,zagr,poslendi}) => {
  const [ok,setOk] = useState(false)
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

bridge.send('VKWebAppCheckNativeAds', { ad_format: 'interstitial' })
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

function fooButtonClick()
{
// Показать рекламу
bridge.send('VKWebAppShowNativeAds', { ad_format: 'interstitial' })
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
    
    
    


  },[])

  useEffect(()=>{
    setTimeout(menyamZagr1,2000)
  },[])
  
  function wallPost(){
    bridge.send('VKWebAppShowWallPostBox', {
        message: `Теперь мне известна тайна имени ${name}! \n`   + moe.name_meaning + '\n'  + 'Узнай тайну и ты: https://vk.com/app51616632' , 
        attachment: 'https://vk.com/app51616632',
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
    setContext(false)
  }

  const {name} = useParams()
 
  
  let moeName
  useEffect(()=>{
    let papaData = oldData.find(item => item.name == name)
    
    if (papaData){
      setMoe(papaData)
      setZagryszhay(false)
    }else {
    
      try {
        
        async function sendName(){
          let response = await fetch(`https://atoma-horoscope.onrender.com/name/${name}`); 
          let result = await response.json();
          moeName = result
          setMoe(moeName)

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

  

  const { ref, inView } = useInView({
    triggerOnce:true,
    threshold: 0,
  });

  // bridge.send('VKWebAppGetLaunchParams')
  // .then((data) => { 
  //   if (data.vk_app_id) {
  //     // Параметры запуска получены
  //     console.log(data)
  //   }
  // })
  // .catch((error) => {
  //   // Ошибка
  //   console.log('vvvvvvvv',error);
  //   setOk(true)
  // });

  useEffect(()=>{
    console.log('rrr',window.location.href)

    
    let url = window.location.href
    let regexp = /vk_client=ok/i;
    if (regexp.test(url)){
      console.log('zzzzzzzzzzzzzzzzzzzz')
      setOk(true)
    }else{
      console.log('ooooooooooooooooo')
     
    }

  },[])
  
  

  return (
    // <LazyLoad height={162}>
    <div >
    
    <div className={styles.containerItem}>
    {err? <p>Не удалось получить данные. Попробуйте повторить попытку позднее</p> : ''}
    {name && conditionValue && <p className ='red'>Потеряна связь с интернетом</p>}
    
        <div className={`wh ${moeName? context? 'zero1' : '' : ''}`}>
        { name && <>
            <div className={styles.btnParent}>
                <Link className={styles.btnLink} to='/' >
                    <Button   className={`btnBlin ${ok === false? '' : 'naitiOk'}`}>
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
        
        <div ref={ref} className={` whBlock ${moeName? context? 'zero1' : '' : ''}`}>
           
            {inView? name ? '' : 
            err ===false && <>
            <Link onClick={zagryzimReclamy} className={styles.item}  to={`/${name1}`}>{name1}</Link>
            </> : <div className={`${name? 'zero2' :''}`}><div className={styles.itemSkelet}></div></div> }
              

            {name&& 
            zagryzhay === false &&
             <> 
                <div className='titleNameParent'>
                 <Title  level='1' weight='1' className='titleName'>{name}</Title>
                </div>
                
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
                    <Title><Icon20Rectangle2HorizontalOutline />Металлы</Title>
                    <p className={styles.pStyle}>{ moe.name_metall}</p>
                </div>

                <div className='sovmesBlock'>
                
                  <Button appearance='negative' onClick={sovmesMakeOpen} className={` btnSovmes ${sovmestimostOpen? 'zero2' : ''}`}>
                  {ok === false? 
                    <div className='posleProsmotra rrr'>Узнать совместимость имени! После просмотра рекламы</div>
                  : /Android/i.test(navigator.userAgent)? 
                      <div className='posleProsmotra rrr'>Узнать совместимость имени! После просмотра рекламы</div>
                    : <div className='posleProsmotra rrr'>Узнать совместимость имени!</div>
                  }
                  </Button>
                  
                </div>

                <div className={` wh2 ${sovmestimostOpen? '' : 'zero2'}`}>
                  <div className={styles.people}>
                      <Title><Icon20LikeCircleFillRed />Совместимость имени</Title>
                      <p className={styles.pStyle}>{ moe.best_lovers}</p>
                  </div>
                </div>

                {ok === false &&<div className={styles.btnParent}>
                  <div className={styles.btnLink}>
                    <Button  onClick={wallPost} className={styles.btn}>
                      
                        <div className='btnKek'>
                              <Icon20ArrowshapeLeft2Outline/><p className='Ppublic Ppublic1'>Опубликовать на стене!</p>
                          </div>
                      
                        
                    </Button>
                    </div>
                    
                </div>}
               
            </>}
        </div>
        
    </div>
    
    </div>
    // </LazyLoad>
  )

}

export default ItemName