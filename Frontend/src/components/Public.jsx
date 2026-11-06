import { Link } from "react-router-dom";

function Public() {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex flex-col justify-between bg-slate-950 text-slate-100">
      <main className="flex flex-col justify-center flex-grow max-w-6xl w-full mx-auto px-6 py-16">

        {/* Hero Section */}
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm font-medium text-blue-300 mb-6">
            <span className="h-2 w-2 rounded-full bg-blue-400"></span>
            Professional Technology Repair
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
            Welcome to{" "}
            <span className="text-blue-400">Abrham Repairs!</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Your technology deserves expert care. Our trained team is ready
            to provide reliable, professional repair services and get your
            devices back to working perfectly.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 hover:-translate-y-0.5"
            >
              Employee Login
              <span aria-hidden="true">→</span>
            </Link>

            <a
              href="tel:+15555555555"
              className="inline-flex items-center justify-center rounded-xl border border-slate-700 px-6 py-3 font-semibold text-slate-200 transition hover:bg-slate-800"
            >
              Call Us
            </a>
          </div>
        </div>

        {/* Services */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-20">
          <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-lg font-semibold">Expert Repairs</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Skilled technicians ready to diagnose and repair your devices.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-lg font-semibold">Reliable Service</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Dependable solutions focused on quality and customer satisfaction.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-lg font-semibold">Trained Staff</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              A professional team committed to taking care of your technology.
            </p>
          </article>
        </div>

        {/* Contact Information */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-slate-800 pt-10">
          <div>
            <h2 className="text-xl font-semibold">Visit Our Shop</h2>
            <address className="mt-4 not-italic space-y-2 text-slate-400">
              <p className="font-medium text-slate-200">Abrham Repairs</p>
              <p>555 Foo Drive</p>
              <p>Foo City, CA 12345</p>
              <a
                href="tel:+15555555555"
                className="inline-block pt-2 text-blue-400 hover:text-blue-300"
              >
                (555) 555-5555
              </a>
            </address>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Meet the Owner</h2>
            <p className="mt-4 text-slate-400">
              Abrham is committed to delivering dependable technology
              repair services and maintaining a professional team.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 px-6 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Abrham Repairs. All rights reserved.
      </footer>
    </section>
  );
}

export default Public;