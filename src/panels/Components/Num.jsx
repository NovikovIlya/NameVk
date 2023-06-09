import React,{useState,useEffect,useContext} from 'react';
import './../Home.css'
import bridge from '@vkontakte/vk-bridge';
import {Icon28ErrorCircleOutline,Icon20HelpOutline,Icon20ArrowUturnLeftOutline, Icon20FavoriteCircleFillYellow,Icon20NotificationOutline ,Icon20CrownCircleFillVkDating} from '@vkontakte/icons';
import styles from './ItemName.module.css'
import { Link, useParams } from 'react-router-dom'
import {Snackbar, Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar,Title, Text,Input } from '@vkontakte/vkui';
import { Context } from "./../Context";





function Num({fetchedUser}) {
  const [nameUser,setNameUser] = useState('')
  const [familyUser,setFamilyUser] = useState('')
  const [surNameUser,setsurNameUser] = useState('')
  const [searchTerm1 ,setSearchTerm1] = useState('')
  const [dataNumer,setDataNumer] = useState('')
  const [errorZero,setErrorZero] = useState(false)
  const [resp,setResp] = useState('')
  const [text, setText] = React.useState('');
  const [snackbar, setSnackbar] = React.useState(null);

  bridge.send('VKWebAppCheckNativeAds', { ad_format: 'interstitial' })
  .then((data) => {
    if (data.result) {
    } else {
      console.log('Рекламные материалы не найдены.');
    }
  })
  .catch((error) => { console.log(error); /* Ошибка */  });

  function fooButtonClick(){
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




  

  



  function handleName(event){

    const text = event.target.value
    // if(text.length>0 && isValid(text)===false){
    //   // alert('Введен неккоректный текст (спецсимвол)')
    //   openErrorCiril()
    //   return text.slice(0,-1)
    // }
    console.log(text);
    setNameUser(text)
    
  }

  function handleFamily(event){

    const text = event.target.value

    console.log(text);
    setFamilyUser(text)
  }

  function handleSurName(event){

    const text = event.target.value

    console.log(text);
    setsurNameUser(text)
  }

  const openError = () => {
    if (snackbar) return;
    setSnackbar(
      <Snackbar
        onClose={() => setSnackbar(null)}
        before={<Icon28ErrorCircleOutline fill="var(--vkui--color_icon_negative)" />}
      >
        Необходимо ввести имя!
      </Snackbar>,
    );
  };

  function isValid(username) {
    // return /^[А-Яа-яЁё]+[a-z]+$/.test(username)
    return /^[а-яА-ЯёЁi\-\.]+$/.test(username)
 }

  const openErrorCiril = () => {
    if (snackbar) return;
    setSnackbar(
      <Snackbar
        onClose={() => setSnackbar(null)}
        before={<Icon28ErrorCircleOutline fill="var(--vkui--color_icon_negative)" />}
      >
        Нельзя вводить спецсимволы. Ввод только на кириллице.
      </Snackbar>,
    );
  };


  function handleSubmit(e) {
    e.preventDefault();
    if(nameUser === ''){
      // alert('Необходимо ввести имя!')
      openError()
      return
    }
    if(isValid(nameUser)===false){
      // alert('Введен неккоректный текст (спецсимвол)')
      openErrorCiril()
      return
      // return text.slice(0,-1)
    }
    // if(isValid(surNameUser)===false){
    //   // alert('Введен неккоректный текст (спецсимвол)')
    //   openErrorCiril()
    //   return
    //   // return text.slice(0,-1)
    // }
    // if(isValid(familyUser)===false){
    //   // alert('Введен неккоректный текст (спецсимвол)')
    //   openErrorCiril()
    //   return
    //   // return text.slice(0,-1)
    // }
    fooButtonClickReward()
    async function haha(){
        try {
            let response = await fetch(`https://atoma-horoscope.onrender.com/name_numerology/?name=${nameUser}&familyname=${familyUser}&fathername=${surNameUser}`); // завершается с заголовками ответа
            let result = await response.json(); 
            console.log(result);
            setDataNumer(result)
            setErrorZero(false)
            console.log(dataNumer);
            setResp(result)
            console.log('sszzz',result);
            
            
        } catch (error) {
            setErrorZero(true)
            console.log('Ошибка',error);
            
        }

        
    }
    haha()
  }

  function clickVk(){
    console.log(fetchedUser);
    
    setNameUser(fetchedUser.first_name)
    setFamilyUser(fetchedUser.last_name)
  }



  

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
    <>
        <div className={styles.btnParent}>
            <Link className={styles.btnLink} to='/' >
                <Button   className={styles.btn}>
                    <div className='btnKek'>
                        <Icon20ArrowUturnLeftOutline/><p>Назад</p>
                    </div>
                </Button>
            </Link>
        </div>

      <div className='LineParent LineTop '>
          <div className=' LineNum'> </div>
      </div>
     
      <div className='container'>
        {/* <Title className='TitleStyle TAKs' weight="1" level="1" style={{ marginBottom: 16 }}>Узнай нумерологию своего имени!</Title> */}

        <div className="col-md-12 text-center">
                <h3 className="animate-charcter"> Узнай нумерологию своего имени!</h3>
        </div>

        <div className='baba'>
          {<Button onClick={()=>{
              setFamilyUser('')
              setNameUser('')
              setsurNameUser('')
              setDataNumer('')
              }} className={`btnDelete2 ${familyUser || nameUser || surNameUser ?'':'zero3'}`} mode='outline' appearance='neutral'>Очистить форму</Button>}
        </div>

        <form method="post" onSubmit={handleSubmit} className='formStyle'>
          <div className='papaBox'>
            <Input className='inputNum' value={familyUser} placeholder='Введите фамилию' onChange={handleFamily}/>
            {/* {familyUser&& <Button onClick={()=>{
            setFamilyUser('')
            }} className='btnDelete1' mode='outline' appearance='neutral'>X</Button>} */}
          </div>
            
          <div className='papaBox'>
            <Input className='inputNum' value={nameUser}   placeholder='Введите имя' onChange={handleName}/>
            {/* {nameUser&& <Button onClick={()=>{
            setNameUser('')
            }} className='btnDelete1' mode='outline' appearance='neutral'>X</Button>} */}
          </div>

          <div className='papaBox'>
            <Input className='inputNum' value={surNameUser}  placeholder='Введите отчество' onChange={handleSurName}/>
            {/* {surNameUser&& <Button onClick={()=>{
            setsurNameUser('')
            }} className='btnDelete1' mode='outline' appearance='neutral'>X</Button>} */}
          </div>
            
  
            
            <div className='btnBox'>
                <Button className='submitStyle0' appearance='negative'   onClick={()=>{
                    clickVk()
                    
                    }}>
                    <div className='r5'>Получить данные из ВК</div>
                    {/* <div className='posleProsmotra'>После просмотра рекламы</div> */}
                </Button>
                <Button className='submitStyle' type="submit" >
                  {/* <div>Узнать за просмотр рекламы!</div> */}
                  <div className='posleProsmotra'>Узнать! За просмотр рекламы</div>
                </Button>
               
                
            </div>
            {errorZero&& 
                <div className='poprobuiteParent'>
                  <p className='poprobuite'>Не удалось получить данные. Попробуйте повторить попытку позднее</p>
                </div>}



            
        </form>
        {resp.detail == 'Not found'?
           <div className='pNeaidenParent'>   
            <p className='pNeaiden'>Данные не найдены. Проверьте правильность написания имени. Ввод только на кириллице.</p>
         </div> 
         : ''}
        
        {resp.detail !== 'Not found'&& dataNumer&& <>
            <div className='whDataNumber'>
                <div className='whData'>{dataNumer.name_number}</div>
                <div className='whText'>{dataNumer.explanation}</div>
            </div>
            </>
        }
      </div>
      {text && (
          <Group>
            <Div>{text}</Div>
          </Group>
        )}

        {snackbar}
    </>
  );
}




export default Num;
