import React from "react";
import { TEAM, TEAM_NOTE } from "@/constants/site";
import SectionHeading from "./section-heading";

/** 팀 — 소개서 기재 실명·경력만 사용 (REQUIREMENTS §3.4) */
const Team = () => {
  return (
    <section id="team" className="scroll-mt-16 bg-neutral-50">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <SectionHeading title="팀" description={TEAM_NOTE} />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {TEAM.map((member) => (
            <article
              key={member.name}
              className="rounded-xl border border-neutral-200 bg-white p-6"
            >
              <p className="text-sm font-semibold text-brand-strong">
                {member.role}
              </p>
              <h3 className="mt-1 text-xl font-extrabold text-neutral-900">
                {member.name}
              </h3>
              <p className="mt-2 text-sm font-medium text-neutral-700">
                {member.career}
              </p>
              <ul className="mt-4 space-y-2 border-t border-neutral-100 pt-4">
                {member.highlights.map((h) => (
                  <li
                    key={h}
                    className="text-sm leading-relaxed text-neutral-600"
                  >
                    · {h}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
