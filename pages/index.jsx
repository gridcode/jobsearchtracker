import Head from "next/head";
import Link from "next/link";
import { Button, Card } from "semantic-ui-react";

export async function getServerSideProps(context) {
  const res = await fetch(`${process.env.BASEURL}/api/applications`);
  const { data } = await res.json();
  return {
    props: {
      jobApps: data,
    }, // will be passed to the page component as props
  };
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
