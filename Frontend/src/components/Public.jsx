import { Link } from "react-router-dom";

function Public() {
  const content = (
    <section className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center">
      <header>
        <h1 className="text-3xl font-bold ">
          Welcome to <span className="whitespace-nowrap">Dan D. Repairs!</span>
        </h1>
      </header>
      <main className="flex flex-col items-center gap-4 border-y-2 border-white py-6 max-w-xl">
        <p>
          Located in Beautiful Downtown Foo City, Dan D. Repairs provides a
          trained staff ready to meet your tech repair needs.
        </p>
        <address className="not-italic flex flex-col gap-1">
          <span className="font-semibold text-2xl">Dan D. Repairs</span>
          <span>555 Foo Drive</span>
          <span>Foo City, CA 12345</span>
          <a href="tel:+15555555555" className="underline hover:opacity-90">
            (555) 555-5555
          </a>
        </address>
        <br />
        <p >Owner: Dan Davidson</p>
      </main>
      <footer>
        <Link to="/login" className="inline-block underline hover:opacity-90 font-semibold text-2xl">
          Employee Login
        </Link>
      </footer>
    </section>
  );
  return content;
}

export default Public;
