/* Authored presentation content, drawn from the existing source-backed walkthrough. */
(() => {
  'use strict';
  const root = document.querySelector('[data-vision-ai]');
  if (!root) return;
  const stages = {
    place: {
      question: 'What connects this city to its river?',
      answer: 'Start with Blue Plains. DC Water describes a regional wastewater treatment facility serving the District and neighboring jurisdictions in Maryland and Virginia.',
      value: '384 MGD',
      observation: 'Published daily treatment capacity',
      action: 'Follow the connections',
      next: 'connections'
    },
    connections: {
      question: 'Who and what does it connect?',
      answer: 'Wastewater arrives from the District and neighboring jurisdictions in Maryland and Virginia. After treatment at Blue Plains, the water returns to the Potomac River.',
      value: 'Potomac River',
      observation: 'Documented receiving water after treatment',
      action: 'Inspect the evidence',
      next: 'evidence'
    },
    evidence: {
      question: 'What supports that answer?',
      answer: 'Two public DC Water descriptions support the facility and river connection. Published capacity describes capability; it does not tell us today’s operating flow or asset condition.',
      value: '2 public sources',
      observation: 'Checked 30 October 2026 · Open sources below',
      action: 'Return to the place',
      next: 'place'
    }
  };
  const buttons = [...root.querySelectorAll('[data-vision-ai-step]')];
  const question = root.querySelector('[data-vision-ai-question]');
  const answer = root.querySelector('[data-vision-ai-answer]');
  const route = root.querySelector('[data-vision-ai-route]');
  const observation = root.querySelector('[data-vision-ai-observation]');
  const next = root.querySelector('[data-vision-ai-next]');
  const nextLabel = next.firstChild;
  let selected = 'place';
  function select(key) {
    const stage = stages[key];
    if (!stage) return;
    selected = key;
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.visionAiStep === key)));
    question.textContent = stage.question;
    answer.textContent = stage.answer;
    observation.querySelector('strong').textContent = stage.value;
    observation.querySelector('span').textContent = stage.observation;
    route.dataset.connected = String(key !== 'place');
    nextLabel.textContent = stage.action + ' ';
    root.dataset.visionAiSelected = key;
  }
  buttons.forEach(button => button.addEventListener('click', () => select(button.dataset.visionAiStep)));
  next.addEventListener('click', () => select(stages[selected].next));
  select('place');
})();
