(function () {
  'use strict';

  const STORAGE_KEY = 'local-invoice.saved.v1';
  const FIELD_IDS = {
    number: 'number',
    status: 'status',
    currency: 'currency',
    issueDate: 'issueDate',
    dueDate: 'dueDate',
    reference: 'reference',
    fromName: 'fromName',
    fromEmail: 'fromEmail',
    fromAddress: 'fromAddress',
    toName: 'toName',
    toEmail: 'toEmail',
    toAddress: 'toAddress',
    discount: 'discount',
    taxRate: 'taxRate',
    paymentInfo: 'paymentInfo',
    notes: 'notes'
  };

  const $ = (id) => document.getElementById(id);

  let invoice = null;
  let deferredInstallPrompt = null;

  function todayISO() {
    const d = new Date();
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  }

  function addDaysISO(days) {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  }

  function makeId() {
    return (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2);
  }

  function nextNumber(savedCount) {
    return 'INV-' + new Date().getFullYear() + '-' + String(savedCount + 1).padStart(4, '0');
  }

  function newInvoice() {
    const saved = loadSaved();
    return {
      id: makeId(),
      number: nextNumber(saved.length),
      status: 'Draft',
      currency: 'USD',
      issueDate: todayISO(),
      dueDate: addDaysISO(30),
      reference: '',
      fromName: '',
      fromEmail: '',
      fromAddress: '',
      toName: '',
      toEmail: '',
      toAddress: '',
      items: [{ id: makeId(), desc: '', qty: 1, rate: 0 }],
      discount: 0,
      taxRate: 0,
      paymentInfo: '',
      notes: ''
    };
  }

  function toNumber(value) {
    const n = parseFloat(value);
    return Number.isFinite(n) && n >= 0 ? n : 0;
  }

  function computeTotals(inv) {
    const subtotal = inv.items.reduce((sum, item) => sum + toNumber(item.qty) * toNumber(item.rate), 0);
    const discount = subtotal * (toNumber(inv.discount) / 100);
    const taxable = subtotal - discount;
    const tax = taxable * (toNumber(inv.taxRate) / 100);
    return { subtotal, discount, tax, total: taxable + tax };
  }

  function money(amount, currency) {
    try {
      return new Intl.NumberFormat(undefined, { style: 'currency', currency: currency }).format(amount);
    } catch (e) {
      return amount.toFixed(2) + ' ' + currency;
    }
  }

  function formatDate(iso) {
    if (!iso) return '-';
    return new Date(iso + 'T00:00:00').toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  }

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function loadSaved() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function writeSaved(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      return true;
    } catch (e) {
      showToast('Could not save: this browser storage is full.');
      return false;
    }
  }

  function showToast(message) {
    const toast = $('toast');
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove('show'), 2400);
  }

  function renderForm() {
    Object.keys(FIELD_IDS).forEach((key) => {
      $(FIELD_IDS[key]).value = invoice[key] ?? '';
    });
    renderItems();
  }

  function renderItems() {
    const list = $('itemsList');
    list.replaceChildren();
    invoice.items.forEach((item) => {
      const row = el('div', 'item-row');
      row.dataset.id = item.id;

      const desc = el('input');
      desc.type = 'text';
      desc.placeholder = 'Description';
      desc.value = item.desc;
      desc.addEventListener('input', () => { item.desc = desc.value; renderSheet(); });

      const qty = el('input');
      qty.type = 'number';
      qty.min = '0';
      qty.step = 'any';
      qty.setAttribute('aria-label', 'Quantity');
      qty.value = item.qty;
      qty.addEventListener('input', () => { item.qty = toNumber(qty.value); renderSheet(); });

      const rate = el('input');
      rate.type = 'number';
      rate.min = '0';
      rate.step = 'any';
      rate.setAttribute('aria-label', 'Rate');
      rate.value = item.rate;
      rate.addEventListener('input', () => { item.rate = toNumber(rate.value); renderSheet(); });

      const remove = el('button', 'item-remove', '×');
      remove.type = 'button';
      remove.title = 'Remove item';
      remove.setAttribute('aria-label', 'Remove item');
      remove.addEventListener('click', () => {
        invoice.items = invoice.items.filter((i) => i.id !== item.id);
        if (invoice.items.length === 0) invoice.items.push({ id: makeId(), desc: '', qty: 1, rate: 0 });
        renderItems();
        renderSheet();
      });

      row.append(desc, qty, rate, remove);
      list.append(row);
    });
  }

  function renderSheet() {
    const sheet = $('sheet');
    const totals = computeTotals(invoice);
    const cur = invoice.currency;
    sheet.replaceChildren();

    const top = el('div', 'sheet-top');
    const from = el('div');
    from.append(el('h1', 'sheet-title', 'INVOICE'));
    from.append(el('div', 'sheet-from-name', invoice.fromName || 'Your business name'));
    from.append(el('div', 'sheet-party-text', [invoice.fromEmail, invoice.fromAddress].filter(Boolean).join('\n')));

    const meta = el('div', 'sheet-meta');
    const statusClass = 'status-' + invoice.status.toLowerCase();
    meta.append(el('span', 'status-pill ' + statusClass, invoice.status));
    const dl = el('dl');
    [
      ['Number', invoice.number || '-'],
      ['Issued', formatDate(invoice.issueDate)],
      ['Due', formatDate(invoice.dueDate)],
      ['Reference', invoice.reference || '-']
    ].forEach(([label, value]) => {
      dl.append(el('dt', null, label), el('dd', null, value));
    });
    meta.append(dl);
    top.append(from, meta);

    const parties = el('div', 'sheet-parties');
    const billTo = el('div');
    billTo.append(el('div', 'sheet-label', 'Bill to'));
    billTo.append(el('div', 'sheet-party-name', invoice.toName || 'Client name'));
    billTo.append(el('div', 'sheet-party-text', [invoice.toEmail, invoice.toAddress].filter(Boolean).join('\n')));
    const payTo = el('div');
    payTo.append(el('div', 'sheet-label', 'Currency'));
    payTo.append(el('div', 'sheet-party-text', cur));
    parties.append(billTo, payTo);

    const table = el('table', 'sheet-table');
    const thead = el('thead');
    const headRow = el('tr');
    ['Description', 'Qty', 'Rate', 'Amount'].forEach((label, i) => {
      const th = el('th', null, label);
      if (i > 0) th.className = 'num';
      headRow.append(th);
    });
    thead.append(headRow);
    const tbody = el('tbody');
    invoice.items.forEach((item) => {
      const tr = el('tr');
      const qty = toNumber(item.qty);
      const rate = toNumber(item.rate);
      tr.append(el('td', null, item.desc || '-'));
      tr.append(el('td', 'num', String(qty)));
      tr.append(el('td', 'num', money(rate, cur)));
      tr.append(el('td', 'num', money(qty * rate, cur)));
      tbody.append(tr);
    });
    table.append(thead, tbody);

    const bottom = el('div', 'sheet-bottom');
    const notes = el('div');
    if (invoice.paymentInfo) {
      notes.append(el('div', 'sheet-label', 'Payment instructions'));
      notes.append(el('div', 'sheet-notes', invoice.paymentInfo));
    }
    if (invoice.notes) {
      notes.append(el('div', 'sheet-label', 'Notes'));
      notes.append(el('div', 'sheet-notes', invoice.notes));
    }

    const totalsTable = el('table', 'totals');
    const rows = [
      ['Subtotal', money(totals.subtotal, cur), null],
      ['Discount (' + toNumber(invoice.discount) + '%)', '-' + money(totals.discount, cur), null],
      ['Tax (' + toNumber(invoice.taxRate) + '%)', money(totals.tax, cur), null],
      ['Total', money(totals.total, cur), 'grand'],
      ['Amount due', money(totals.total, cur), 'due']
    ];
    rows.forEach(([label, value, kind]) => {
      const tr = el('tr', kind || '');
      tr.append(el('td', null, label), el('td', null, value));
      totalsTable.append(tr);
    });
    bottom.append(notes, totalsTable);

    sheet.append(top, parties, table, bottom);
  }

  function readFormIntoInvoice() {
    Object.keys(FIELD_IDS).forEach((key) => {
      invoice[key] = $(FIELD_IDS[key]).value;
    });
  }

  function refresh() {
    readFormIntoInvoice();
    renderSheet();
  }

  function startNewInvoice() {
    invoice = newInvoice();
    renderForm();
    renderSheet();
  }

  function saveCurrent() {
    readFormIntoInvoice();
    if (!invoice.number.trim()) {
      showToast('Add an invoice number before saving.');
      $('number').focus();
      return;
    }
    const list = loadSaved();
    const existing = list.findIndex((inv) => inv.id === invoice.id);
    const snapshot = JSON.parse(JSON.stringify(invoice));
    snapshot.savedAt = new Date().toISOString();
    if (existing >= 0) list[existing] = snapshot;
    else list.unshift(snapshot);
    if (writeSaved(list)) {
      showToast('Invoice saved on this device.');
      renderSavedCount();
      renderSavedList();
    }
  }

  function renderSavedCount() {
    $('savedCount').textContent = String(loadSaved().length);
  }

  function renderSavedList() {
    const list = loadSaved();
    const ul = $('savedList');
    ul.replaceChildren();
    $('savedEmpty').classList.toggle('hidden', list.length > 0);

    list.forEach((inv) => {
      const li = el('li', 'saved-item');
      const info = el('div', 'saved-info');
      info.append(el('strong', null, inv.number + (inv.toName ? ' · ' + inv.toName : '')));
      const totals = computeTotals(inv);
      info.append(el('span', null, formatDate(inv.dueDate) + ' · ' + inv.status + ' · ' + money(totals.total, inv.currency)));

      const actions = el('div', 'saved-actions');
      const openBtn = el('button', 'btn btn-small', 'Open');
      openBtn.type = 'button';
      openBtn.addEventListener('click', () => {
        invoice = JSON.parse(JSON.stringify(inv));
        delete invoice.savedAt;
        renderForm();
        renderSheet();
        $('savedPanel').classList.add('hidden');
      });

      const deleteBtn = el('button', 'btn btn-small btn-danger', 'Delete');
      deleteBtn.type = 'button';
      deleteBtn.addEventListener('click', () => {
        if (!window.confirm('Delete invoice ' + inv.number + ' from this device? This cannot be undone.')) return;
        const remaining = loadSaved().filter((other) => other.id !== inv.id);
        if (writeSaved(remaining)) {
          renderSavedCount();
          renderSavedList();
          showToast('Invoice deleted.');
        }
      });

      actions.append(openBtn, deleteBtn);
      li.append(info, actions);
      ul.append(li);
    });
  }

  function bindEvents() {
    Object.keys(FIELD_IDS).forEach((key) => {
      $(FIELD_IDS[key]).addEventListener('input', refresh);
      $(FIELD_IDS[key]).addEventListener('change', refresh);
    });

    $('addItemBtn').addEventListener('click', () => {
      invoice.items.push({ id: makeId(), desc: '', qty: 1, rate: 0 });
      renderItems();
      renderSheet();
      const inputs = $('itemsList').querySelectorAll('input[type="text"]');
      if (inputs.length) inputs[inputs.length - 1].focus();
    });

    $('newInvoiceBtn').addEventListener('click', () => {
      if (window.confirm('Start a new invoice? Unsaved changes to this one will be lost.')) startNewInvoice();
    });

    $('saveBtn').addEventListener('click', saveCurrent);
    $('printBtn').addEventListener('click', () => {
      renderSheet();
      window.print();
    });

    $('savedToggleBtn').addEventListener('click', () => {
      renderSavedList();
      $('savedPanel').classList.remove('hidden');
    });
    $('closeSavedBtn').addEventListener('click', () => $('savedPanel').classList.add('hidden'));

    document.addEventListener('keydown', (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
        event.preventDefault();
        saveCurrent();
      }
    });

    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      deferredInstallPrompt = event;
      $('installBtn').classList.remove('hidden');
    });

    $('installBtn').addEventListener('click', async () => {
      if (!deferredInstallPrompt) return;
      deferredInstallPrompt.prompt();
      await deferredInstallPrompt.userChoice;
      deferredInstallPrompt = null;
      $('installBtn').classList.add('hidden');
    });

    window.addEventListener('appinstalled', () => {
      deferredInstallPrompt = null;
      $('installBtn').classList.add('hidden');
      showToast('Local Invoice installed.');
    });
  }

  function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    }
  }

  function init() {
    bindEvents();
    renderSavedCount();
    startNewInvoice();
    registerServiceWorker();
  }

  init();
})();
