import React, { useContext, useEffect, useState } from 'react';

import Store from '../../store/store';
import { ADD_TO_LIST, UPDATE_LIST } from '../../store/actionTypes';

import { listService } from '../../services/listService';

import style from './Form.module.scss';

const INITIAL_LIST = {
  name: '',
  text: '',
  number: '',
  email: ''
}

const Form = ({ closeForm, edit, clearEdit }) => {
  const { dispatch } = useContext(Store);
  const [form, setForm] = useState(INITIAL_LIST);

  useEffect(() => {
    if (edit) {
      setForm(edit);
    }
  }, [edit])


  const onFormChange = e => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  }

  const clearForm = () => {
    setForm(INITIAL_LIST);
    closeForm();
  }

  const formSubmit = async () => {
    if (edit) {
      const newItem = await listService.updateList(form);
      dispatch({
        type: UPDATE_LIST,
        payload: newItem
      })
      clearForm();
      clearEdit();
      return;
    }

    const newItem = await listService.addToList(form);
    dispatch({
      type: ADD_TO_LIST,
      payload: newItem
    })
    clearForm();
  }

  return (
    <div className={style.form}>
      <input
        type="text"
        name="name"
        placeholder="Enter Company name"
        value={form.name}
        onChange={onFormChange}
      />
      <textarea
        type="text"
        name="text"
        rows="4"
        placeholder="Enter Description"
        value={form.text}
        onChange={onFormChange}
      />
      <input
        type="text"
        name="number"
        placeholder="Enter number"
        value={form.number}
        onChange={onFormChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Enter email"
        value={form.email}
        onChange={onFormChange}
      />
      <button onClick={formSubmit}>Submit</button>
    </div>
  )
}

export default Form;