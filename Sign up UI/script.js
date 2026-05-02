'use strict';

//Utilities

const $ = (id) => document.getElementById(id);

/** Show/hide error message for a field */
function setError(inputEl, errEl, message) {
  const wrap = inputEl.closest('.input-wrap');
  if (message) {
    wrap?.classList.add('is-error');
    wrap?.classList.remove('is-valid');
    errEl.textContent = message;
    errEl.classList.add('visible');
  } else {
    wrap?.classList.remove('is-error');
    errEl.textContent = '';
    errEl.classList.remove('visible');
  }
}

/** Mark field as valid */
function setValid(inputEl) {
  const wrap = inputEl.closest('.input-wrap');
  wrap?.classList.add('is-valid');
  wrap?.classList.remove('is-error');
}

/** Clear field state */
function clearState(inputEl, errEl) {
  const wrap = inputEl.closest('.input-wrap');
  wrap?.classList.remove('is-valid', 'is-error');
  if (errEl) { errEl.textContent = ''; errEl.classList.remove('visible'); }
}

/** Show toast notification */
function showToast(message, type = 'success') {
  const toast = $('toast');
  const msg   = $('toastMsg');
  toast.className = `toast toast-${type}`;
  msg.textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3500);
}

/** Simulate async action (loading state) — only called on explicit button click */
async function withLoading(btn, action) {
  const text   = btn.querySelector('.btn-text');
  const loader = btn.querySelector('.btn-loader');
  btn.disabled = true;
  text.style.display  = 'none';
  loader.style.display = 'inline-block';
  try { await action(); }
  finally {
    btn.disabled = false;
    text.style.display  = '';
    loader.style.display = 'none';
  }
}

//Validation helpers

const EMAIL_RE  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SPECIAL_RE = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

function validateEmail(val) {
  if (!val.trim())         return 'Email address is required.';
  if (!EMAIL_RE.test(val)) return 'Please enter a valid email address.';
  return null;
}

function validateRequired(val, label = 'This field') {
  if (!val.trim()) return `${label} is required.`;
  if (val.trim().length < 2) return `${label} must be at least 2 characters.`;
  return null;
}

function validatePassword(val) {
  if (!val) return 'Password is required.';
  if (val.length < 8) return 'Password must be at least 8 characters.';
  return null;
}

//Password strength

const RULES = {
  length:    (p) => p.length >= 8,
  uppercase: (p) => /[A-Z]/.test(p),
  number:    (p) => /[0-9]/.test(p),
  special:   (p) => SPECIAL_RE.test(p),
};

function getStrength(password) {
  if (!password) return 0;
  return Object.values(RULES).filter(fn => fn(password)).length;
}

const STRENGTH_LABELS = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const STRENGTH_COLORS = ['', '#f87171', '#fbbf24', '#38bdf8', '#4ade80'];

function updateStrengthUI(password) {
  const meter = $('strengthMeter');
  const label = $('strengthLabel');
  const reqs  = $('pwRequirements');
  const score = getStrength(password);

  if (!password) {
    meter.classList.remove('visible');
    meter.removeAttribute('data-strength');
    reqs.classList.remove('visible');
    return;
  }

  meter.classList.add('visible');
  reqs.classList.add('visible');
  meter.setAttribute('data-strength', score);
  label.textContent = STRENGTH_LABELS[score] || '';
  label.style.color = STRENGTH_COLORS[score] || '';

  // Update requirements checklist
  document.querySelectorAll('#pwRequirements li').forEach(li => {
    const rule = li.dataset.rule;
    li.classList.toggle('met', RULES[rule]?.(password) ?? false);
  });
}

//Tab switching

function switchTab(tab) {
  const loginForm  = $('loginForm');
  const signupForm = $('signupForm');
  const tabLogin   = $('tabLogin');
  const tabSignup  = $('tabSignup');
  const indicator  = $('tabIndicator');

  loginForm.classList.remove('active');
  signupForm.classList.remove('active');
  tabLogin.classList.remove('active');
  tabSignup.classList.remove('active');

  if (tab === 'login') {
    loginForm.classList.add('active');
    tabLogin.classList.add('active');
    indicator.classList.remove('right');
  } else {
    signupForm.classList.add('active');
    tabSignup.classList.add('active');
    indicator.classList.add('right');
  }

  // Reset all form states when switching
  resetFormStates();
}

function resetFormStates() {
  document.querySelectorAll('.input-wrap').forEach(w => w.classList.remove('is-valid','is-error'));
  document.querySelectorAll('.error-msg').forEach(e => { e.textContent=''; e.classList.remove('visible'); });
  updateStrengthUI('');
}

//Toggle password visibility

document.querySelectorAll('.toggle-pw').forEach(btn => {
  btn.addEventListener('click', () => {
    const input   = $(btn.dataset.target);
    const eyeOpen = btn.querySelector('.eye-open');
    const eyeOff  = btn.querySelector('.eye-closed');
    if (input.type === 'password') {
      input.type = 'text';
      eyeOpen.classList.add('hidden');
      eyeOff.classList.remove('hidden');
    } else {
      input.type = 'password';
      eyeOpen.classList.remove('hidden');
      eyeOff.classList.add('hidden');
    }
  });
});

// Inline (blur) validation

function attachBlurValidation(inputId, errId, validateFn) {
  const input = $(inputId);
  const err   = $(errId);
  if (!input) return;

  input.addEventListener('blur', () => {
    const msg = validateFn(input.value);
    if (msg) { setError(input, err, msg); }
    else      { setValid(input); setError(input, err, null); }
  });

  input.addEventListener('input', () => {
    if (err.classList.contains('visible')) {
      const msg = validateFn(input.value);
      if (!msg) { setValid(input); setError(input, err, null); }
    }
  });
}

// Login fields
attachBlurValidation('loginEmail',    'loginEmailErr',    validateEmail);
attachBlurValidation('loginPassword', 'loginPasswordErr', validatePassword);

// Signup fields
attachBlurValidation('signupFirst', 'signupFirstErr', v => validateRequired(v, 'First name'));
attachBlurValidation('signupLast',  'signupLastErr',  v => validateRequired(v, 'Last name'));
attachBlurValidation('signupEmail', 'signupEmailErr', validateEmail);
attachBlurValidation('signupPassword', 'signupPasswordErr', validatePassword);

// Confirm password
const signupConfirm = $('signupConfirm');
const signupConfirmErr = $('signupConfirmErr');
function validateConfirm(val) {
  if (!val) return 'Please confirm your password.';
  if (val !== $('signupPassword').value) return 'Passwords do not match.';
  return null;
}
signupConfirm.addEventListener('blur', () => {
  const msg = validateConfirm(signupConfirm.value);
  if (msg) setError(signupConfirm, signupConfirmErr, msg);
  else     { setValid(signupConfirm); setError(signupConfirm, signupConfirmErr, null); }
});
signupConfirm.addEventListener('input', () => {
  if (signupConfirmErr.classList.contains('visible')) {
    if (!validateConfirm(signupConfirm.value)) {
      setValid(signupConfirm); setError(signupConfirm, signupConfirmErr, null);
    }
  }
});

// Real-time strength update
$('signupPassword').addEventListener('input', (e) => {
  updateStrengthUI(e.target.value);
});

//Login form submission

// Prevent default form submit (Enter key etc.) — handled by button click only
$('loginForm').addEventListener('submit', (e) => e.preventDefault());

$('loginBtn').addEventListener('click', async () => {
  const email    = $('loginEmail');
  const password = $('loginPassword');
  const emailErr = $('loginEmailErr');
  const pwErr    = $('loginPasswordErr');

  let valid = true;

  const emailMsg = validateEmail(email.value);
  if (emailMsg) { setError(email, emailErr, emailMsg); valid = false; }
  else          { setValid(email); setError(email, emailErr, null); }

  const pwMsg = validatePassword(password.value);
  if (pwMsg) { setError(password, pwErr, pwMsg); valid = false; }
  else       { setValid(password); setError(password, pwErr, null); }

  if (!valid) return;

  await withLoading($('loginBtn'), () =>
    new Promise(res => setTimeout(res, 1800))
  );

  showToast('Signed in successfully! Redirecting…', 'success');
});

//Signup form submission

// Prevent default form submit (Enter key etc.) — handled by button click only
$('signupForm').addEventListener('submit', (e) => e.preventDefault());

$('signupBtn').addEventListener('click', async () => {
  let valid = true;

  const fields = [
    { id: 'signupFirst',    errId: 'signupFirstErr',    fn: v => validateRequired(v, 'First name') },
    { id: 'signupLast',     errId: 'signupLastErr',     fn: v => validateRequired(v, 'Last name') },
    { id: 'signupEmail',    errId: 'signupEmailErr',    fn: validateEmail },
    { id: 'signupPassword', errId: 'signupPasswordErr', fn: validatePassword },
    { id: 'signupConfirm',  errId: 'signupConfirmErr',  fn: validateConfirm },
  ];

  fields.forEach(({ id, errId, fn }) => {
    const input = $(id);
    const err   = $(errId);
    const msg   = fn(input.value);
    if (msg) { setError(input, err, msg); valid = false; }
    else      { setValid(input); setError(input, err, null); }
  });

  // Terms checkbox
  const terms = $('agreeTerms');
  const termsErr = $('agreeTermsErr');
  if (!terms.checked) {
    termsErr.textContent = 'You must agree to the terms to continue.';
    termsErr.classList.add('visible');
    valid = false;
  } else {
    termsErr.textContent = '';
    termsErr.classList.remove('visible');
  }

  if (!valid) return;

  // Warn on weak password
  const strength = getStrength($('signupPassword').value);
  if (strength < 2) {
    showToast('Consider using a stronger password before continuing.', 'error');
    return;
  }

  await withLoading($('signupBtn'), () =>
    new Promise(res => setTimeout(res, 2000))
  );

  showToast('Account created! Welcome to Nexus 🎉', 'success');
  setTimeout(() => switchTab('login'), 1800);
});

//Social buttons (demo)

document.querySelectorAll('.btn-social').forEach(btn => {
  btn.addEventListener('click', () => {
    const provider = btn.textContent.trim();
    showToast(`Connecting with ${provider}…`, 'success');
  });
});

//Terms checkbox auto-clear error

$('agreeTerms').addEventListener('change', () => {
  if ($('agreeTerms').checked) {
    const err = $('agreeTermsErr');
    err.textContent = '';
    err.classList.remove('visible');
  }
});
