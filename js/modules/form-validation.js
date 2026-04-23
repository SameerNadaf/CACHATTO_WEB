/**
 * js/modules/form-validation.js
 * Handles validation and success state for the brochure lead form.
 *
 * Targets the redesigned form using .bf-group / .bf-error classes.
 */
export function initFormValidation() {
  const form = document.getElementById('brochureForm');
  if (!form) return;

  // ── Helpers ──────────────────────────────────────────────────

  /** Mark a .bf-group as errored or cleared. Returns false when errored. */
  function setFieldError(fieldEl, hasError) {
    const group = fieldEl.closest('.bf-group');
    if (!group) return;
    if (hasError) {
      group.classList.add('has-error');
    } else {
      group.classList.remove('has-error');
    }
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  // ── Submit handler ────────────────────────────────────────────

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let formIsValid = true;

    // 1. Validate all required text / email / tel / select fields
    const requiredFields = form.querySelectorAll(
      'input[required]:not([type="checkbox"]), select[required]'
    );

    requiredFields.forEach(field => {
      const empty = field.value.trim() === '';
      setFieldError(field, empty);
      if (empty) formIsValid = false;
    });

    // 2. Extra email format check
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value.trim() && !isValidEmail(emailField.value)) {
      setFieldError(emailField, true);
      formIsValid = false;
    }

    // 3. Privacy checkbox
    const privacyCheck = document.getElementById('privacyAgree');
    if (privacyCheck) {
      const unchecked = !privacyCheck.checked;
      setFieldError(privacyCheck, unchecked);
      if (unchecked) formIsValid = false;
    }

    // 4. Show success state if all good
    if (formIsValid) {
      form.classList.add('hidden');
      const successMsg = document.getElementById('formSuccessMessage');
      if (successMsg) successMsg.classList.remove('hidden');
    }
  });

  // ── Real-time error clearing ──────────────────────────────────

  form.querySelectorAll('input, select, textarea').forEach(field => {
    const eventType = field.type === 'checkbox' ? 'change' : 'input';

    field.addEventListener(eventType, function () {
      const group = this.closest('.bf-group');
      if (!group) return;

      if (this.type === 'checkbox') {
        if (this.checked) group.classList.remove('has-error');
      } else if (this.value.trim()) {
        group.classList.remove('has-error');
      }
    });
  });
}
