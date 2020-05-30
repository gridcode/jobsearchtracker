import { Button, Form, Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
const New = () => {
  const [form, setForm] = useState({
    title: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    if(isSubmitting){
      if(Object.keys(errors).length===0){
        createNew()
      }
      else setIsSubmitting(false)
    }
  }, [errors])
  const createNew = async () => {
    try {
      const res = await fetch(`api/applications`,{method:"post", headers:{"Accept": "application/json", "Content-Type":"application/json"},
    body: JSON.stringify(form)
    })
    router.push('/')
    } catch (error) {
      console.error(error)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    let errs = validate()
    setErrors(errs)
    setIsSubmitting(true)
  };
  const validate = () => {
    let err ={}
    if(!form.title){
      err.title = 'Title is required'
    }
    return err
  }
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <div className="form-container">
      <h1>Create Application</h1>
      <div>
        {isSubmitting ? (
          <Loader active inline="centered" />
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Input
            error={
              errors.title ? {content: errors.title, pointing: 'below'}:null
            }
              fluid
              label="Title"
              placeholder="Title"
              name="title"
              onChange={handleChange}
            />
            <Button type="submit">Create</Button>
          </Form>
        )}
      </div>
    </div>
  );
};

export default New;
