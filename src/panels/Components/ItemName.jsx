import { Button,Text,Title} from '@vkontakte/vkui'
import React,{useEffect, useState,createContext,useContext} from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from './ItemName.module.css'
import Home from '../Home'
import { Icon20ArticleBoxOutline , Icon20Users3} from '@vkontakte/icons';
import './../Home.css'
import { Context } from "./../Context";



const ItemName = ({name1,getAnekdots,zagr}) => {
  const [zagr1,setZagr1] = useState(true)
  const [context, setContext] = useContext(Context);

  useEffect(()=>{
   
    setTimeout(menyamZagr1,2000)
  },[])

  
   
 

  const menyamZagr1 = ()=>{
    setZagr1(prev => false)
    setContext(false)
  }

  const zet = name1
  const {name} = useParams()

  const data1 = [
    {
      name: "Августин",
      mean: "\"Августин\" - это имя латинского происхождения, которое переводится как \"величественный\", \"возвышенный\", \"почтенный\".",
      people: "",
      dateName: ""
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
  console.log(moeName);

  return (
    
    <div className={styles.containerItem}>
    
    { moeName && context? <p>Идет загрузка...</p> : ''}
        <div className={`wh ${moeName? context? 'zero1' : '' : ''}`}>
        {moeName && <>
            <div className={styles.btnParent}>
                <Link className={styles.btnLink} to='/' >
                    <Button className={styles.btn}>
                        Назад
                    </Button>
                </Link>
                {/* <Button className={styles.btn}>
                    <Link className={styles.btnLink} to='/' >Назад</Link>
                </Button> */}
            </div>
        </>}
        </div>

        
        
        <div className={`${moeName? context? 'zero1' : '' : ''}`}>
            {moeName ? '' : <>
            <Link className={styles.item}  to={`/${name1}`}>{name1}</Link>
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
                {/* <div className={styles.dateName}>{moeName&& moeName.dateName}</div> */}
            </>}
        </div>
        
    </div>
    
    
  )
}

export default ItemName