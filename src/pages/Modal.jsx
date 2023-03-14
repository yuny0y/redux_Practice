import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import Button from '../components/Button';
import styled from 'styled-components';
import { modifyTodo } from '../redux/modules/todo';


function Modal() {
    const todo = useSelector((state)=> state.todo);
    const param= useParams();
    
    const foundData = todo.find((item) => {
        // console.log(param.id)
        // console.log(item.id)
        return item.id === param.id
    });

    useEffect(() => {
        const foundData = todo.find(item => item.id === param.id);
        setModifiedContents(foundData.contents);
      }, [todo, param.id]);

    const [modal, setModal] = useState(false);
    const [modifiedContents, setModifiedContents] = useState(foundData.contents);
    const dispatch = useDispatch();

    const handleSaveChanges = () => {
        dispatch(modifyTodo({
            id : foundData.id, editContent: modifiedContents}));
        setModal(false);
    };

  return (
    <>
    <ModalLayout>
        <ModifyWrqp>
            <IdForm>
                <div>id :{foundData.id}</div>
                <Link to={`/todolist`}>이전으로</Link>
            </IdForm>
            <Title>
                <h1>{foundData.title}</h1>
                <div>{foundData.contents}</div>
                <ModalBtnForm>
                    <Button.Home onClick={()=> {
                        setModal(true);
                        setModifiedContents(modifiedContents); 
                    }}>수정</Button.Home>
                </ModalBtnForm>
            </Title>
        </ModifyWrqp>
        </ModalLayout>
        {
            modal ? (
                <ModalLayout>
                    <ModalContent>
                        <h1>{foundData.title}</h1>
                        <Modify maxLength={200} value={modifiedContents} onChange={(e) => 
                            setModifiedContents(e.target.value)}>
                        </Modify>
                        <BtnForm>
                            <Button.Home
                            onClick={handleSaveChanges}
                            >저장</Button.Home>
                        </BtnForm>
                    </ModalContent>
                </ModalLayout>
            ) : null}
    </> 
  )
}

export default Modal

const ModalLayout = styled.div`
  width: 100%;
  height: 100vh;
  inset: 0px;
  position: fixed;
  background-color: rgb(221, 221, 221);
`
const ModifyWrqp = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 12px;
    box-sizing: border-box;
    padding: 0px 5px 0px 10px;
    background-color: rgb(255, 255, 255);
    width: 750px;
    height: calc(60vh - 45px);
`
const ModalContent = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 12px;
  box-sizing: border-box;
  padding: 0px 5px 0px 32px;
  background-color: rgb(255, 255, 255);
  width: 750px;
  height: calc(60vh - 45px);
`
const IdForm=styled.div`
    margin-top :20px;
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content : space-between;
`
const Title = styled.div`
    padding: 20px 20px 0px 20px;
`
const ModalBtnForm = styled.div`
    margin-top: 200px;
`
const Modify =styled.input`
    height: 230px;
    width: 680px;
    margin: 10px 0px 0px 3px;
`
const BtnForm=styled.div`
    margin-top: 80px;
`