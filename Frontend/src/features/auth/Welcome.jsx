import { Link } from "react-router-dom";

function Welcome() {
  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  const content = (
  <section className="flex flex-col gap-4">
    <p>{today}</p>
    <h1 className="text-2xl font-bold">Welcome!</h1>
    <p><Link to="/dash/notes">View techNotes</Link></p>
    <p><Link to="/dash/users">View User Settings</Link></p>
  </section>
)

  return content;
}

export default Welcome;
