import React from 'react';
import './Form.css';
import { InputBook } from './Book';
import { useForm } from 'react-hook-form';

type Props = {
  onSave: (book:InputBook) => void,
}

const Form:React.FC<Props> = ({ onSave }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<InputBook>();

  return (
    <form onSubmit={handleSubmit(onSave)}>
      <label>
        <span className="caption">Title: </span>
        <input type="text" {...register('title',{
          required: true,
          minLength: 4,
        })}/>
        {errors.title && errors.title.type === 'required' && (
          <span className="error">Title ist ein Pflichtfeld.</span>
        )}
        {errors.title && errors.title.type === 'minLength' && (
          <span className="error">Title muss mindestens 4 Zeichen lang sein.</span>
        )}
      </label>
      <label>
        <span className="caption">Author: </span>
        <input type="text" {...register('author',{
          required: true,
        })}/>
        {errors.author && errors.author.type === 'required' && (
          <span className="error">Author ist ein Pflichtfeld</span>
        )}
      </label>
      <label>
        <span className="caption">ISBN: </span>
        <input type="text" {...register('isbn',{
          required: true,
        })}/>
        {errors.isbn && errors.isbn.type === 'required' && (
          <span className="error">ISBN ist ein Pflichtfeld</span>
        )}
      </label>
      <input type="submit" value="Speichern" />
    </form>
  );
}

export default Form;
