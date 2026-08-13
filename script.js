document.addEventListener('DOMContentLoaded', () => {
  const envelope = document.getElementById('envelope');

  envelope.addEventListener('click', () => {
    envelope.classList.toggle('open');
  });
});
