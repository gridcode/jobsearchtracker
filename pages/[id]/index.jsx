import {Confirm, Button, Loader} from 'semantic-ui-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default ({jobApp})=>{
  const router = useRouter();
  const [confirm, setConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const openConfirm = () => setConfirm(true)
  const closeConfirm = () => setConfirm(false)
  useEffect(() => {
    if(isDeleting){
      deleteJob()
    }
  }, [isDeleting])
  const deleteJob = async () => {
    const id = jobApp._id
    try {
      const res = await fetch(`api/applications/${id}`,{method:"delete"})
      const success = await res.json()
      if(success) router.push('/')
      setIsDeleting(false)
    } catch (error) {
      console.error(error)
    }
  }
  const handleDelete = async () => {
    setIsDeleting(true)
    closeConfirm();

  }
  return (
    <div className="wrapper">
      {isDeleting ? <Loader active/> : <>
        <h1>{jobApp.title}</h1>
        <Button color="red" onClick={openConfirm}>Delete</Button>
      </>
      }
      <Confirm open={confirm} onCancel={closeConfirm} onConfirm={handleDelete}/>
    </div>
  )
}

export async function getServerSideProps({params}) {
  
  const res = await fetch(`${process.env.BASEURL}/api/applications/${params.id}`,{method: 'get'})
  const {data} = await res.json()
  return {props:{jobApp: data}}
}

// export async function getStaticPaths() {

//   const res = await fetch(`${process.env.BASEURL}/api/applications`)
//   const {data} = await res.json()

//   return {
//     paths: data.map(job=>({
//       params: {
//         id: job._id
//       }
//     })),
//     fallback: true,
//   }
// }