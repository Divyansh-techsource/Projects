// ── State ──────────────────────────────────────────────────
let expr       = '';
let justEvaled = false;
let useDeg     = true;
let history    = JSON.parse(localStorage.getItem('calc_history') || '[]');
let currentMode = 'basic';

// ── DOM refs ────────────────────────────────────────────────
const dispResult  = document.getElementById('result');
const dispExpr    = document.getElementById('expr');
const dispHistory = document.getElementById('historyBar');
const modeBadge   = document.getElementById('modeBadge');

// ── Helpers ─────────────────────────────────────────────────
function fmt(n) {
  if (isNaN(n) || !isFinite(n)) return 'Error';
  const abs = Math.abs(n);
  if (abs !== 0 && (abs >= 1e12 || abs < 1e-7)) return parseFloat(n.toPrecision(8)).toExponential(4);
  let s = parseFloat(n.toPrecision(12)).toString();
  return s;
}

function setDisplay(val, isErr) {
  dispResult.textContent = val;
  dispResult.classList.toggle('error', !!isErr);
  dispResult.classList.remove('flash');
  void dispResult.offsetWidth; // reflow to restart animation
  if (!isErr) dispResult.classList.add('flash');
}

function setExpr(val) {
  dispExpr.textContent = val || '\u00a0';
}

function toRad(deg) { return (deg * Math.PI) / 180; }

// ── Ripple ───────────────────────────────────────────────────
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const r = document.createElement('span');
    r.className = 'ripple';
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    r.style.width  = r.style.height = size + 'px';
    r.style.left   = (e.clientX - rect.left  - size / 2) + 'px';
    r.style.top    = (e.clientY - rect.top   - size / 2) + 'px';
    this.appendChild(r);
    r.addEventListener('animationend', () => r.remove());
  });
});

// ── Main calc function ───────────────────────────────────────
function calc(v) {
  const ops = ['+', '-', '*', '/'];

  if (v === 'AC') {
    expr = '';
    setDisplay('0');
    setExpr('');
    dispHistory.textContent = '';
    justEvaled = false;
    return;
  }

  if (v === 'back') {
    if (justEvaled) {
      expr = '';
      setDisplay('0');
      setExpr('');
      justEvaled = false;
      return;
    }
    expr = expr.slice(0, -1);
    setDisplay(expr || '0');
    setExpr('');
    return;
  }

  if (v === '%') {
    if (!expr) return;
    try {
      const val = Function('"use strict"; return (' + expr + ')')();
      const pct = val / 100;
      expr = fmt(pct);
      setDisplay(expr);
      setExpr(fmt(val) + ' %');
    } catch(e) {}
    return;
  }

  if (v === '=') {
    if (!expr) return;
    const raw = expr;
    setExpr(raw + ' =');
    try {
      const val = Function('"use strict"; return (' + expr + ')')();
      const result = fmt(val);
      if (result === 'Error') {
        setDisplay('Error', true);
        expr = '';
      } else {
        setDisplay(result);
        addHistory(raw, result);
        dispHistory.textContent = result;
        expr = result;
      }
    } catch(e) {
      setDisplay('Syntax Error', true);
      expr = '';
    }
    justEvaled = true;
    return;
  }

  if (v === '(' || v === ')') {
    if (justEvaled) { expr = ''; justEvaled = false; }
    expr += v;
    setDisplay(expr);
    setExpr('');
    return;
  }

  if (ops.includes(v)) {
    justEvaled = false;
    if (!expr && v === '-') { expr = '-'; setDisplay('-'); return; }
    if (!expr) return;
    if (ops.includes(expr.slice(-1))) expr = expr.slice(0, -1);
    expr += v;
    setDisplay(expr);
    setExpr('');
    return;
  }

  if (v === '.') {
    const parts = expr.split(/[+\-*/()]/);
    const last = parts[parts.length - 1];
    if (last.includes('.')) return;
    if (!last || justEvaled) expr = (justEvaled ? '' : expr) + '0';
  }

  if (justEvaled && !ops.includes(v)) {
    expr = '';
    justEvaled = false;
  }

  expr += v;
  setDisplay(expr);
  setExpr('');
}

// ── Scientific functions ─────────────────────────────────────
function calcSci(fn) {
  const ops = ['+', '-', '*', '/'];

  const applyFn = (val) => {
    let res;
    const n = parseFloat(val);
    switch(fn) {
      case 'sin':  res = Math.sin(useDeg  ? toRad(n) : n); break;
      case 'cos':  res = Math.cos(useDeg  ? toRad(n) : n); break;
      case 'tan':  res = Math.tan(useDeg  ? toRad(n) : n); break;
      case 'log':  res = Math.log10(n); break;
      case 'ln':   res = Math.log(n);   break;
      case 'sqrt': res = Math.sqrt(n);  break;
      case 'sq':   res = n * n;         break;
      case 'inv':  res = 1 / n;         break;
      default: return null;
    }
    return res;
  };

  if (fn === 'pi') {
    if (justEvaled) { expr = ''; justEvaled = false; }
    expr += Math.PI.toString();
    setDisplay(expr);
    return;
  }

  if (fn === 'e') {
    if (justEvaled) { expr = ''; justEvaled = false; }
    expr += Math.E.toString();
    setDisplay(expr);
    return;
  }

  if (fn === 'pow') {
    if (!expr) return;
    expr += '**';
    setDisplay(expr);
    setExpr('xʸ →');
    return;
  }

  // For unary functions, apply to current expression or last number
  if (!expr) return;

  const lastOpIdx = Math.max(
    expr.lastIndexOf('+'), expr.lastIndexOf('-'),
    expr.lastIndexOf('*'), expr.lastIndexOf('/'),
    expr.lastIndexOf('(')
  );

  // If justEvaled or no operators, apply to whole expr
  if (justEvaled || lastOpIdx === -1) {
    try {
      const val = Function('"use strict"; return (' + expr + ')')();
      const res = applyFn(val);
      if (res === null) return;
      const r = fmt(res);
      setExpr(fn + '(' + fmt(val) + ') =');
      setDisplay(r);
      addHistory(fn + '(' + fmt(val) + ')', r);
      expr = r;
      justEvaled = true;
    } catch(e) { setDisplay('Error', true); }
    return;
  }

  // Apply to last segment
  const lastNum = expr.slice(lastOpIdx + 1);
  const prefix  = expr.slice(0, lastOpIdx + 1);
  try {
    const val = parseFloat(lastNum);
    if (isNaN(val)) return;
    const res = applyFn(val);
    if (res === null) return;
    expr = prefix + fmt(res);
    setDisplay(expr);
    setExpr(fn + '(' + lastNum + ')');
  } catch(e) {}
}

// ── DEG / RAD toggle ─────────────────────────────────────────
function toggleDeg() {
  useDeg = !useDeg;
  modeBadge.textContent = useDeg ? 'DEG' : 'RAD';
}

// ── Tab switching ─────────────────────────────────────────────
function switchMode(mode) {
  currentMode = mode;
  ['basic','sci','hist'].forEach(m => {
    document.getElementById('panel' + m.charAt(0).toUpperCase() + m.slice(1)).classList.toggle('hidden', m !== mode);
    document.getElementById('tab'   + m.charAt(0).toUpperCase() + m.slice(1)).classList.toggle('active', m === mode);
  });
  if (mode === 'hist') renderHistory();
}

// ── History ───────────────────────────────────────────────────
function addHistory(expression, value) {
  history.unshift({ expr: expression, val: value, time: Date.now() });
  if (history.length > 50) history.pop();
  localStorage.setItem('calc_history', JSON.stringify(history));
}

function renderHistory() {
  const list = document.getElementById('histList');
  if (!history.length) {
    list.innerHTML = '<p class="hist-empty">No calculations yet.</p>';
    return;
  }
  list.innerHTML = history.map((h, i) =>
    `<div class="hist-item" onclick="recallHistory(${i})">
      <span class="hist-expr">${h.expr}</span>
      <span class="hist-val">= ${h.val}</span>
    </div>`
  ).join('');
}

function recallHistory(i) {
  expr = history[i].val;
  setDisplay(expr);
  setExpr(history[i].expr + ' =');
  justEvaled = true;
  switchMode('basic');
}

function clearHistory() {
  history = [];
  localStorage.removeItem('calc_history');
  renderHistory();
}

// ── Keyboard support ─────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) return;

  const map = {
    'Enter':     '=',
    'Backspace': 'back',
    'Escape':    'AC',
    '%':         '%',
    '(':         '(',
    ')':         ')',
  };

  if (e.key >= '0' && e.key <= '9') { calc(e.key); return; }
  if (['+', '-', '*', '/'].includes(e.key)) { e.preventDefault(); calc(e.key); return; }
  if (e.key === '.') { calc('.'); return; }
  if (map[e.key]) { e.preventDefault(); calc(map[e.key]); return; }

  // Keyboard shortcuts for sci functions
  if (e.altKey) {
    const sciMap = { 's': 'sin', 'c': 'cos', 't': 'tan', 'l': 'log', 'r': 'sqrt' };
    if (sciMap[e.key]) { e.preventDefault(); calcSci(sciMap[e.key]); }
  }
});

// ── Init ──────────────────────────────────────────────────────
modeBadge.textContent = useDeg ? 'DEG' : 'RAD';
