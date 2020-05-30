import Link from "next/link";
import { Button, Card } from "semantic-ui-react";
import dbConnect from 'utils/dbConnect'
import JobApp from 'models/jobapp'
export async function getServerSideProps(context) {
  await dbConnect()
  const res = await JobApp.find({})
  const jobApps = res.map(doc=>{
    const job = doc.toObject()
    job._id = job._id.toString()
    return job
  })
  return {props : {
    jobApps
  }}
}

export default function Home({ jobApps }) {
  return (
    <div className="wrapper">
      {jobApps.map((job) => (
        <div key={job._id}>
          <Card>
            <Card.Content>
              <Card.Header>
                <Link href={`/${job._id}`}>
                  <a>{job.title}</a>
                </Link>
              </Card.Header>
            </Card.Content>
            <Card.Content extra>
              <Link href={`/${job._id}`}>
                <Button primary>View</Button>
              </Link>
              <Link href={`/${job._id}/edit`}>
                <Button primary>Edit</Button>
              </Link>
            </Card.Content>
          </Card>
        </div>
      ))}
    </div>
  );
}
