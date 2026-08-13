document.addEventListener('DOMContentLoaded', () => {
  const envelope = document.getElementById('envelope');

  // Toggle open/close on click or tap
  envelope.addEventListener('click', () => {
    envelope.classList.toggle('open');
  });
});
