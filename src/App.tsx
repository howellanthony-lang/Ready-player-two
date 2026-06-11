import { useMemo, useState } from 'react';
import { Nexus3DWorld, agents } from './three/Nexus3DWorld';
import { ToastContainer } from 'react-toastify';
import PoweredByConvex from './components/PoweredByConvex.tsx';

const worldSelector = [
  { name: 'Origin Planet', status: 'active' },
  { name: 'Central Hub', status: 'soon' },
  { name: 'Creator Moon', status: 'soon' },
  { name: 'Academy World', status: 'soon' },
  { name: 'Combat Zone', status: 'soon' },
  { name: 'Market District', status: 'soon' },
  { name: 'Spaceport', status: 'locked' },
];

const initialFeed = [
  '[World] Day 1 begins.',
  '[Agent] Mason is looking for building materials.',
  '[Agent] Ava is checking everyone is safe.',
  '[Evolution] Campfire unlocked.',
  '[Future Lock] Flying cars require anti-gravity.',
];

export default function Home() {
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [feedItems, setFeedItems] = useState<string[]>(initialFeed);
  const [eventText, setEventText] = useState('');

  const selectedAgent = useMemo(
    () => agents.find((agent) => agent.id === selectedAgentId) ?? null,
    [selectedAgentId],
  );

  const handleSubmitEvent = () => {
    if (!eventText.trim()) return;
    setFeedItems((items) => [...items, `[World Event] ${eventText.trim()}`]);
    setEventText('');
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <PoweredByConvex />
      <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-3xl border border-white/10 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/70">NEXUS Worlds</p>
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Origin Planet — Origin Age
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
                The first playable AI civilisation prototype. Walk the world with WASD, click agents to inspect them, and watch the colony evolve from camp life towards futuristic technology.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-3xl bg-slate-950/90 p-4 text-sm text-slate-200 ring-1 ring-white/10">
                <p className="text-xs uppercase text-slate-400">World</p>
                <p className="mt-1 font-semibold">Origin Planet</p>
              </div>
              <div className="rounded-3xl bg-slate-950/90 p-4 text-sm text-slate-200 ring-1 ring-white/10">
                <p className="text-xs uppercase text-slate-400">Day</p>
                <p className="mt-1 font-semibold">1</p>
              </div>
              <div className="rounded-3xl bg-slate-950/90 p-4 text-sm text-slate-200 ring-1 ring-white/10">
                <p className="text-xs uppercase text-slate-400">Age</p>
                <p className="mt-1 font-semibold">Origin Age</p>
              </div>
              <div className="rounded-3xl bg-slate-950/90 p-4 text-sm text-slate-200 ring-1 ring-white/10">
                <p className="text-xs uppercase text-slate-400">Goal</p>
                <p className="mt-1 font-semibold">Survive, build, evolve</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.75fr_0.95fr]">
          <div className="space-y-4">
            <Nexus3DWorld selectedAgentId={selectedAgentId} onSelectAgent={setSelectedAgentId} />

            <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-xl">
                <h2 className="text-xl font-semibold text-white">Activity Feed</h2>
                <div className="mt-4 space-y-3 text-sm text-slate-200">
                  {feedItems.map((item, index) => (
                    <div key={`${item}-${index}`} className="rounded-2xl bg-slate-950/80 p-3 ring-1 ring-white/5">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-xl">
                <h2 className="text-xl font-semibold text-white">World Selector</h2>
                <div className="mt-4 space-y-3 text-sm text-slate-200">
                  {worldSelector.map((world) => (
                    <div
                      key={world.name}
                      className={`flex items-center justify-between rounded-2xl px-4 py-3 ring-1 ring-white/5 ${
                        world.status === 'active'
                          ? 'bg-cyan-500/10 text-cyan-200'
                          : world.status === 'locked'
                          ? 'bg-slate-950/60 text-slate-500'
                          : 'bg-slate-950/70 text-slate-300'
                      }`}
                    >
                      <span>{world.name}</span>
                      <span className="rounded-full bg-white/5 px-3 py-1 text-[11px] uppercase text-slate-300">
                        {world.status}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-slate-300">Trigger world event</label>
                  <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                    <input
                      value={eventText}
                      onChange={(event) => setEventText(event.target.value)}
                      placeholder="A storm is coming..."
                      className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none ring-1 ring-transparent transition focus:ring-cyan-400/40"
                    />
                    <button
                      type="button"
                      onClick={handleSubmitEvent}
                      className="rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="rounded-3xl border border-white/10 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Agent Inspector</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Selected Citizen</h2>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
                Click an agent
              </span>
            </div>

            {selectedAgent ? (
              <div className="mt-6 space-y-4 text-sm text-slate-200">
                <div className="rounded-3xl bg-slate-950/80 p-4 ring-1 ring-white/5">
                  <p className="text-xs uppercase text-slate-400">Name</p>
                  <p className="mt-1 text-lg font-semibold text-white">{selectedAgent.name}</p>
                </div>
                <div className="grid gap-3">
                  <div className="rounded-3xl bg-slate-950/80 p-4 ring-1 ring-white/5">
                    <p className="text-xs uppercase text-slate-400">Role</p>
                    <p className="mt-1 text-sm text-slate-100">{selectedAgent.role}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-950/80 p-4 ring-1 ring-white/5">
                    <p className="text-xs uppercase text-slate-400">Mood</p>
                    <p className="mt-1 text-sm text-slate-100">{selectedAgent.mood}</p>
                  </div>
                </div>
                <div className="rounded-3xl bg-slate-950/80 p-4 ring-1 ring-white/5">
                  <p className="text-xs uppercase text-slate-400">Current Goal</p>
                  <p className="mt-1 text-sm text-slate-100">{selectedAgent.goal}</p>
                </div>
                <div className="rounded-3xl bg-slate-950/80 p-4 ring-1 ring-white/5">
                  <p className="text-xs uppercase text-slate-400">Memory</p>
                  <p className="mt-1 text-sm text-slate-100">{selectedAgent.memory}</p>
                </div>
                <div className="rounded-3xl bg-slate-950/80 p-4 ring-1 ring-white/5">
                  <p className="text-xs uppercase text-slate-400">Skill</p>
                  <p className="mt-1 text-sm text-slate-100">{selectedAgent.skill}</p>
                </div>
              </div>
            ) : (
              <div className="mt-6 rounded-3xl bg-slate-950/80 p-6 text-sm text-slate-300 ring-1 ring-white/5">
                Select one of the six AI citizens in the 3D world to inspect their current goal, recent memory, and skill focus.
              </div>
            )}
          </aside>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={2000} closeOnClick theme="dark" />
    </main>
  );
}
