import React from "react";
import { TEAM, TEAM_NOTE } from "@/constants/site";

/** 팀 — 카드 대신 가로 행 구조. 소개서 기재 실명·경력만 사용 (REQUIREMENTS §3.4) */
const Team = () => {
  return (
    <section id="team" className="scroll-mt-16 bg-neutral-50">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <div className="max-w-2xl">
          <h2 className="text-balance text-3xl font-extrabold tracking-tight text-neutral-900">
            팀
          </h2>
          <p className="mt-4 leading-relaxed text-neutral-600">{TEAM_NOTE}</p>
        </div>
        <div className="mt-12 divide-y divide-neutral-200 border-y border-neutral-200">
          {TEAM.map((member) => (
            <article
              key={member.name}
              className="grid gap-4 py-8 md:grid-cols-[220px_1fr]"
            >
              <div>
                <h3 className="text-xl font-extrabold text-neutral-900">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm font-semibold text-brand-strong">
                  {member.role}
                </p>
              </div>
              <div>
                <p className="font-medium text-neutral-800">{member.career}</p>
                <ul className="mt-3 space-y-1.5">
                  {member.highlights.map((h) => (
                    <li
                      key={h}
                      className="text-sm leading-relaxed text-neutral-600"
                    >
                      · {h}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
