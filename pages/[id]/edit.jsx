import { Button, Form, Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
const Edit = ({jobApp}) => {
  const [form, setForm] = useState({
    title: jobApp.title,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    if(isSubmitting){
      if(Object.keys(errors).length===0){
        editJob()
      }
      else setIsSubmitting(false)
    }
  }, [errors])
  const editJob = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/applications/${jobApp._id}`,{method:"put", headers:{"Accept": "application/json", "Content-Type":"application/json"},
    body: JSON.stringify(form)
    })
    const {data} = await res.json()
    router.push(`/${data._id}`)
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
      <h1>Edit Application</h1>
      <div>
        {isSubmitting ? (
          <Loader active inline="centered" />
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Input
            value={form.title}
            error={
              errors.title ? {content: errors.title, pointing: 'below'}:null
            }
              fluid
              label="Title"
              placeholder="Title"
              name="title"
              onChange={handleChange}
            />
            <Button type="submit">Save</Button>
          </Form>
        )}
      </div>
    </div>
  );
}
export async function getServerSideProps({params}) {
  const res = await fetch(`${process.env.BASEURL}/api/applications/${params.id}`,{method: 'get'})
  const {data} = await res.json()
  return {props:{jobApp: data}}
}
export default Edit
