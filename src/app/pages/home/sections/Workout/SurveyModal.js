import React, { useState, useEffect } from "react";
import Rating from '@material-ui/lab/Rating';
import { useDispatch } from "react-redux";
import classnames from "classnames";
import {Button,Modal,Form} from "react-bootstrap";
import { submitSurvey } from "../../redux/done/actions";

const SurveyItem = ({item, handleChange, error})=>{
  const handleLevelChange = (event, newValue)=>{
    handleChange(item.id, newValue,'level');
  }
  const handleTextChange = (event)=>{
    handleChange(item.id, event.target.value,'text');
  }
  const handleSelectChange = (id)=>{
    handleChange(item.id, id,'select');
  }
  return (
    <Form.Group>
      <Form.Label>
        {item.label}
      </Form.Label>
      {item.question === 'level'&&(
        <div id={`level${item.id}`} className={classnames({"rating-error":error})}>
          <Rating name={`qualityLevel${item.id}`} size="large" value={item.report} onChange={handleLevelChange}/>
        </div>
      )}
      {item.question === 'text'&&(
        <>
          <Form.Control size="lg" type="text" value={item.report} onChange={handleTextChange} isInvalid={error}/>
        </>
      )}
      {item.question === 'select' && (
        item.options.map(option=>(
          <Form.Check
            label={option.option_label}
            key={option.id}
            value={option.id}
            onChange={()=>handleSelectChange(option.id)} 
            checked={option.id===item.report}
            isInvalid={error}
            type="radio"
          />
        ))
      )}
    </Form.Group>
  )
}
const SurveyModal = ({show, handleClose, survey}) => {
  const dispatch = useDispatch();
  const [items,setItems] = useState([]);
  const [errors,setErrors] = useState([]);
  useEffect(()=>{
    const surveyItems = survey.items.map( item =>{
      if(item.question === 'level')item.report=0;
      else item.report="";
      return item;
    })
    setItems(surveyItems);
  },[]);// eslint-disable-line react-hooks/exhaustive-deps
  const handleConfirm = ()=>{
    const validate = changeErrors();
    if(validate===false){
      dispatch(submitSurvey({items}));
    }
    return false;
  }
  const changeErrors = ()=>{
    const surveyErrors = survey.items.map( item =>{
      if(item.question === 'level' ){
        if(item.report===0)return true;
        return false;
      }
      else {
        if(item.report==="") return true;
        return false;
      }
    })
    setErrors(surveyErrors);
    const validate = surveyErrors.some(error=>error);
    return validate;
  }
  const handleChange = (id, level,type)=>{
    //let surveyItems = [...items];
    const surveyItems = items.map((item)=>{
      if(item.id === id)item.report = level;
      return item;
    });
    setItems(surveyItems);
    changeErrors();
  }
  return (
    <Modal
      show={show}
      onHide={handleClose}
      animation={false}
      className="surveys"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-center w-100">
          {survey.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate>
          <div className="questions">
            {items.map((item, index)=>(
              <SurveyItem error={errors[index]} item={item} key={item.id} handleChange={handleChange}/>
            ))}
          </div>
          <Button
            type="button"
            onClick={handleConfirm}
            className="blue-btn"
            style={{ margin: "10px auto", fontSize: "17px", width: "auto" }}
          >
            Confirmar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default SurveyModal;
