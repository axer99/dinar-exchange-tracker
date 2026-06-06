const btn = document.getElementById('darkToggle')
const body = document.body

if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark')
  if (btn) btn.textContent = '☀️'
}

if (btn) {
  btn.addEventListener('click', () => {
    body.classList.toggle('dark')
    if (body.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark')
      btn.textContent = '☀️'
    } else {
      localStorage.setItem('theme', 'light')
      btn.textContent = '🌙'
    }
  })
}