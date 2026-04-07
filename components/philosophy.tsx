"use client"

import { Separator } from "@/components/ui/separator"

export function Philosophy() {
  return (
    <section className="py-24 px-4 bg-transparent backdrop-blur-[2px]">
      <div className="mx-auto max-w-3xl">
        {/* Intro */}
        <div className="mb-16 space-y-6 text-center">
          <p className="text-xl md:text-2xl font-light italic text-white leading-relaxed">
            "The week did not arrive as belief. It arrived as structure."
          </p>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            A 7-day cycle laid over 12 unequal months — 28, 30, 31 — adjusted to fit the solar year. 
            The week does not resolve into the months, nor the months into the week. What appears settled is patched.
          </p>
        </div>

        <Separator className="my-12 bg-primary/10" />

        {/* Core Philosophy */}
        <div className="space-y-12 text-white">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">Usenudua begins at refusal.</h2>
            <p className="text-lg leading-relaxed">
              13 months of 28 days yield 364. One intercalary day completes the year. 
              The arithmetic is simple — but the month is only the frame. 
              The deeper question is the week. The week is where structure becomes philosophy.
            </p>
          </div>

          {/* The 8-Day Cycle */}
          <div className="bg-white/5 p-8 rounded-2xl border border-white/10 space-y-6">
            <h3 className="text-xl font-medium text-primary">An 8-day cycle:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="text-4xl md:text-5xl font-bold text-white">28 ÷ 8 = 3.5</div>
              <p className="border-l border-primary/30 pl-6 italic">
                It does not fit. This is deliberate. The week & the month do not nest. 
                The remainder is not hidden; it is kept.
              </p>
            </div>
            <p className="text-base leading-relaxed">
              Each month carries 3 full weeks (24 days) and 4 days outside the count. 
              Across 13 months, this yields 52 threshold days set apart by structure — the same number as the weeks in a Gregorian year. 
              That convergence is not concession. It is coherence reflecting itself against what it refuses to imitate.
            </p>
          </div>

          {/* Resolution & Closure */}
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-white">Resolution & Closure</h3>
            <p className="text-lg leading-relaxed">
              364 & 8 do not align within a year. They meet at 728 days — 2 years, 91 weeks. First resolution.
            </p>
            <div className="p-6 border-l-2 border-primary bg-primary/5">
              <p className="text-lg font-medium text-white">
                8 years = 2,912 days. <br />
                2,912 ÷ 8 = 364 weeks.
              </p>
              <p className="mt-4 text-primary text-sm uppercase tracking-widest font-bold">
                Ekamba Isua — The 8-year closure
              </p>
            </div>
            <p className="text-base leading-relaxed">
              Here, proportion settles. This threshold marks the closure where the system returns to itself. 
              Time is infrastructure. Its units determine what counts as beginning, completion, memory, & loss.
            </p>
          </div>

          <Separator className="my-12 bg-primary/10" />

          {/* Sovereignty */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-white">The Practice of Sovereignty</h2>
            <p className="text-lg leading-relaxed italic">
              This is not recovery of a past form, but construction from indigenous 4- & 8-day temporal logics, made coherent.
            </p>
            <p className="text-base leading-relaxed">
              Every people that survives contact holds two registers. The Ibibio move between languages, legal systems, & names; 
              between imposed grids & internal rhythm. This is not displacement. It is competence, practiced across generations. 
              Time is one more domain of a practice already mastered.
            </p>
            <div className="text-center py-8">
              <p className="text-xl md:text-2xl font-serif text-primary mb-4 italic">
                "Gregorian for external interface; Usenudua for internal rhythm"
              </p>
              <p className="text-muted-foreground italic">
                Not compromise, but continuity under conditions of sovereignty.
              </p>
            </div>
          </div>

          {/* Closing */}
          <div className="pt-8 text-center space-y-4">
            <p className="text-lg font-medium text-white">
              Sia, there is no sovereignty without power. <br />
              <span className="text-primary">Idoho mbakara ekikpeb nnyin ndioñọ idem.</span>
            </p>
            <p className="text-2xl md:text-3xl font-bold text-white tracking-widest uppercase">
              Yák isoñ adodukana.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
