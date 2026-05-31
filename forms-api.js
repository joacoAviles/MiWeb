const FORMS_API_URL = window.AVIA_FORMS_API_URL || 'https://api.aviarockets.cl/api/forms/submit';

function getFormPayload(form) {
  const data = new FormData(form);
  return Object.fromEntries(data.entries());
}

function getSuccessUrl(form) {
  return form.dataset.successUrl || '/gracias.html';
}

function setFormStatus(form, message, isError = false) {
  let status = form.querySelector('.form-status');
  if (!status) {
    status = document.createElement('p');
    status.className = 'form-status mt-3';
    status.setAttribute('aria-live', 'polite');
    form.appendChild(status);
  }
  status.textContent = message;
  status.style.color = isError ? '#dc3545' : '#198754';
}

async function submitApiForm(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const button = form.querySelector('button[type="submit"]');
  const originalText = button ? button.textContent : '';

  if (button) {
    button.disabled = true;
    button.textContent = 'Enviando...';
  }

  try {
    const response = await fetch(FORMS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(getFormPayload(form))
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.ok === false) {
      throw new Error(result.detail || result.message || 'No se pudo enviar el formulario');
    }

    window.location.href = getSuccessUrl(form);
  } catch (error) {
    setFormStatus(form, error.message || 'No se pudo enviar el formulario. Intenta nuevamente.', true);
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = originalText;
    }
  }
}

document.querySelectorAll('form[data-api-form]').forEach((form) => {
  form.addEventListener('submit', submitApiForm);
});
