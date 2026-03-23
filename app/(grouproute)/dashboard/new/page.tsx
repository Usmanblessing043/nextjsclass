import Dashh from "./dashh";

export default function Page({ searchParams }: { searchParams: { id?: string } }) {
  return <Dashh postId={searchParams.id} />;
}