export function initFormValidation() {
  const brochureForm = document.getElementById('brochureForm');
  if (brochureForm) {
    brochureForm.addEventListener('submit', function(e) {
      e.preventDefault();
      let isValid = true;
      
      // Function to set error state
      const setError = (input, show) => {
        const group = input.closest('.form-group');
        if (group) {
          if (show) {
            group.classList.add('has-error');
            isValid = false;
          } else {
            group.classList.remove('has-error');
          }
        }
      };

      // Validate required inputs
      const requiredInputs = brochureForm.querySelectorAll('input[required]:not([type="checkbox"]), select[required]');
      requiredInputs.forEach(input => {
        if (!input.value.trim()) {
          setError(input, true);
        } else {
          setError(input, false);
        }
      });

      // Email pattern validation
      const emailInput = brochureForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
          setError(emailInput, true);
        }
      }

      // Checkbox validation
      const privacyAgree = document.getElementById('privacyAgree');
      if (privacyAgree) {
        setError(privacyAgree, !privacyAgree.checked);
      }

      // Success state transition
      if (isValid) {
        // Hide form elements
        brochureForm.classList.add('hidden');
        const formHeader = brochureForm.parentElement.querySelector('.form-header');
        if (formHeader) formHeader.classList.add('hidden');
        
        // Show success message
        const successMsg = document.getElementById('formSuccessMessage');
        if (successMsg) successMsg.classList.remove('hidden');
      }
    });

    // Real-time error clearing
    brochureForm.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('input', function() {
        const group = this.closest('.form-group');
        if (!group) return;

        if (this.type === 'checkbox') {
          if (this.checked) group.classList.remove('has-error');
        } else if (this.value.trim()) {
          group.classList.remove('has-error');
        }
      });
    });
  }
}
