import Dashboard from '../components/Dashboard';

export async function getStaticProps() {
  const url = `${process.env.APIURL}/active-users`;
  
  const res = await fetch(url);
  const data = await res.json();

  return {
    props: {
      data
    },
    revalidate: 3600, // In seconds
  }
}

export default function Home({data}) {
  
  return (
    <Dashboard {...data}/>
  )
}
