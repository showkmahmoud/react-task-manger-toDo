import React, { ChangeEvent, FC, PropsWithChildren, useState } from 'react'
import { FormGroup, Input, Label } from 'reactstrap'

interface ILoginModal {
  onSubmitForm?:any
}
const Login:FC<PropsWithChildren<ILoginModal>> = ({onSubmitForm}) => {
  const getInitialValue = () => {
    return {
      name: "",
      email: "",
    };
  };
  const [formData, setFormData] = useState( getInitialValue());
  const { name, email} = formData;
  const handleFormDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e: any) => {
    e.preventDefault();
    onSubmitForm(formData);
  };
  return (
    <form className="px-4 py-5 mt-5" onSubmit={onSubmit}>
    {/* user name */}
    <FormGroup>
      <Label for="name" className="text-capitalize ">
        user name
      </Label>
      <Input
        id="name"
        name="name"
        value={name}
        onChange={handleFormDataChange}
        type="text"
      />
    </FormGroup>
    </form>
  )
}

export default Login