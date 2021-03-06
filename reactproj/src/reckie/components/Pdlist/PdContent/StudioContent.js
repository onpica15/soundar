import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { red } from '@material-ui/core/colors';


import StudioContentItem from './StudioContentItem'
import QueueAnim from 'rc-queue-anim';
//re-排序
import { Form } from 'react-bootstrap'
import { MdFilterList } from "react-icons/md";


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
   
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
 
}));

function StudioContent(props) {
  const{value,pdIndex}=props

 
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandEnter = () => {
    setExpanded(!expanded);
  };
  const handleExpandLeave = () => {
    setExpanded(false);
  };

  //錄音室資料
  const [studioData, setStudioData] = useState([])

  async function getStudioFromServer() {
    const url = 'http://localhost:5566/studio/list'
    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'appliaction/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()
    console.log(data)
    setStudioData([...data])    
  } 
 
  // 一開始就會開始載入資料
  useEffect(() => {
      getStudioFromServer()
  }, [])


  return (
    <>
    <div className={`pdContentPart ${(value===pdIndex)?'':'reHidden'}`}>
    <div className="d-flex justify-content-between align-items-end mb-3">
    <h2 className="head2 dark font-weight-bold">優質錄音室<br/></h2>
    <div className="d-flex align-items-baseline">
      <MdFilterList className="mr-2" style={{fontSize:'1rem', lineHeight:'1.5rem'}} />
      <Form>
        <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Control as="select" custom>
            <option selected="selected">排序</option>
            <option value="priceDESC">價格由高到低</option>
            <option value="priceASC">價格由低到高</option>
            <option value="starsDESC">評價由高到低</option>
            <option value="starsASC">評價由低到高</option>
          </Form.Control>
        </Form.Group>
     </Form>
    </div>
     
    </div>
    <QueueAnim className={`demo-content row flex-wrap`}>    
        {studioData.map((item, index) => {          
          return <StudioContentItem key={item.id} studioData={item}/>       
        })}
     </QueueAnim>
     </div>
    </>
  );
  
}

export default StudioContent