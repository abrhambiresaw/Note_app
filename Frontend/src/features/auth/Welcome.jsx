import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {
  faNoteSticky,
  faPlus,
  faUsers,
  faUserPlus,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Welcome() {
  const { username, isManager, isAdmin, status } = useAuth();

  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
  }).format(new Date());

  const cards = [
    {
      title: "View TechNotes",
      description: "Browse, manage, and keep track of your technical notes.",
      link: "/dash/notes",
      icon: faNoteSticky,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Add New TechNote",
      description: "Create a new technical note and save important information.",
      link: "/dash/notes/new",
      icon: faPlus,
      color: "bg-emerald-100 text-emerald-600",
    },
    ...(isManager || isAdmin
      ? [
          {
            title: "User Settings",
            description: "View and manage existing employee accounts.",
            link: "/dash/users",
            icon: faUsers,
            color: "bg-purple-100 text-purple-600",
          },
          {
            title: "Add New User",
            description: "Create a new account for your team members.",
            link: "/dash/users/new",
            icon: faUserPlus,
            color: "bg-orange-100 text-orange-600",
          },
        ]
      : []),
  ];

  return (
    <section className="mx-auto w-full max-w-6xl space-y-8 p-4 sm:p-6 lg:p-8">

      {/* Welcome Header */}
      <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 to-blue-900 p-6 text-white shadow-lg sm:p-10">
        <p className="text-sm font-medium text-blue-200">
          {today}
        </p>

        <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
          Welcome back, {username}!
        </h1>

        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
          Welcome to TechNotes. Manage your technical notes and stay
          organized with your team's activities.
        </p>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-blue-100">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          {status}
        </div>
      </div>

      {/* Dashboard Section */}
      <div>
        <div className="mb-5">
          <h2 className="text-xl font-bold text-slate-900">
            Quick Access
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Choose an action to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

          {cards.map((card) => (
            <Link
              key={card.title}
              to={card.link}
              className="group flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg sm:p-6"
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg ${card.color}`}
              >
                <FontAwesomeIcon icon={card.icon} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-slate-800 transition group-hover:text-blue-600">
                  {card.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {card.description}
                </p>

                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
                  Open
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
          ))}

        </div>
      </div>

      {/* Footer Message */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
        <h3 className="font-semibold text-slate-800">
          Stay organized with TechNotes
        </h3>
        <p className="mt-1 text-sm leading-6 text-slate-500">
          Keep your technical documentation organized and accessible
          whenever you need it.
        </p>
      </div>

    </section>
  );
}

export default Welcome;
