// Shared script for the three pages
document.addEventListener('DOMContentLoaded', () => {
  // insert floating heart elements
  const bg = document.querySelector('.hearts-bg');
  if (bg && bg.children.length === 0) {
    for (let i = 0; i < 6; i++) {
      const el = document.createElement('i');
      el.innerText = '❤️';
      bg.appendChild(el);
    }
  }

  const path = location.pathname.split('/').pop();

  if (!path || path === '' || path === 'index.html') {
    // page 1
    const form = document.getElementById('nameForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const myName = document.getElementById('myName').value.trim();
      const partnerName = document.getElementById('partnerName').value.trim();
      if (!myName || !partnerName) {
        alert('Harap isi semua kolom ya 💖');
        return;
      }
      localStorage.setItem('myName', myName);
      localStorage.setItem('partnerName', partnerName);
      // clear potential old answers
      localStorage.removeItem('answers');
      location.href = 'page2.html';
    });
    return;
  }

  if (path === 'page2.html') {
    const myName = localStorage.getItem('myName') || '';
    const greeting = document.getElementById('greeting');
    greeting.innerHTML = myName ? `Hai ${escapeHtml(myName)} 💖` : 'Hai 💖';

    const form = document.getElementById('qForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const q1 = document.getElementById('q1').value.trim();
      const q2 = document.getElementById('q2').value.trim();
      const q3 = document.getElementById('q3').value.trim();
      const q4 = document.getElementById('q4').value.trim();
      if (!q1 || !q2 || !q3) {
        alert('Tolong jawab semua pertanyaan utama ya 💕');
        return;
      }
      const answers = { q1, q2, q3, q4, time: new Date().toISOString() };
      localStorage.setItem('answers', JSON.stringify(answers));
      location.href = 'page3.html';
    });
    return;
  }

  if (path === 'page3.html') {
    const myName = localStorage.getItem('myName') || '';
    const display = document.getElementById('displayName');
    display.innerText = myName || 'sayang';

    const send = document.getElementById('sendLove');
    send.addEventListener('click', () => {
      const name = localStorage.getItem('myName') || 'sayang';
      alert(`Cinta ini hanya untukmu, ${name} 💞`);
    });
    return;
  }
});

// simple escape to avoid injection if file opened locally and user typed weird chars
function escapeHtml(text){
  return text.replace(/[&<>"']/g, function(m){ return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]; });
}
