const steps = Array.from(document.querySelectorAll('.steps .step'));
const lines = Array.from(document.querySelectorAll('.steps .line'));
const forms = Array.from(document.querySelectorAll('.form-group form'));
let currentStep = 0;

const placeholders = {
    'imię': 'Podaj swoje imię',
    'nazwisko': 'Podaj swoje nazwisko',
    'email': 'Podaj swój adres email',
    'phone number': 'Podaj swój numer telefonu',
    'hasło': 'Utwórz hasło (min. 8 znaków)',
    'data urodzenia': 'Wybierz swoją datę urodzenia',
    'adres': 'Podaj swój adres',
    'pesel': 'Podaj swój numer PESEL'
};

const typeOverrides = {
    'email': 'email',
    'phone number': 'tel',
    'hasło': 'password',
    'data urodzenia': 'date'
};

const inputModes = {
    'phone number': 'tel',
    'pesel': 'numeric'
};

const maxLengthOverrides = {
    'pesel': 11
};

if (!forms.length || !steps.length) {
    console.warn('Multi-step form not found.');
} else {
    initializeWizard();
}

function initializeWizard() {
    forms.forEach((form) => {
        const inputs = Array.from(form.querySelectorAll('input'));

        inputs.forEach((input) => {
            const labelText = getLabel(input);
            const key = normalizeLabel(labelText);

            if (placeholders[key]) {
                input.placeholder = placeholders[key];
            }

            if (typeOverrides[key]) {
                input.type = typeOverrides[key];
            }

            if (inputModes[key]) {
                input.inputMode = inputModes[key];
            }

            if (maxLengthOverrides[key]) {
                input.maxLength = maxLengthOverrides[key];
            }

            if (key === 'hasło') {
                input.autocomplete = 'new-password';
            } else if (key === 'email') {
                input.autocomplete = 'email';
            } else if (key === 'phone number') {
                input.autocomplete = 'tel';
            }

            input.addEventListener('input', () => {
                validateField(input, false);
                updateFormButtons(form);
            });
            input.addEventListener('blur', () => {
                validateField(input);
                updateFormButtons(form);
            });
        });

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const defaultButton = form.querySelector('.next-btn, .submit-btn');
            if (defaultButton) {
                defaultButton.click();
            }
        });

        const nextBtn = form.querySelector('.next-btn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (validateForm(form)) {
                    showStep(currentStep + 1);
                }
            });
        }

        const prevBtn = form.querySelector('.prev-btn');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => showStep(currentStep - 1));
        }

        const submitBtn = form.querySelector('.submit-btn');
        if (submitBtn) {
            submitBtn.addEventListener('click', () => {
                if (validateForm(form)) {
                    displaySummary();
                }
            });
        }

        updateFormButtons(form);
    });

    document
        .querySelectorAll('.form-buttons .next-btn.active')
        .forEach((btn) => btn.classList.remove('active'));

    showStep(0);
}

function showStep(stepIndex) {
    const nextStep = clamp(stepIndex, 0, forms.length - 1);
    currentStep = nextStep;

    forms.forEach((form, idx) => {
        form.style.display = idx === currentStep ? 'block' : 'none';
    });

    updateStepIndicators();

    const activeForm = forms[currentStep];
    if (activeForm) {
        updateFormButtons(activeForm);
    }
}

function updateStepIndicators() {
    steps.forEach((step, idx) => {
        step.classList.toggle('active', idx <= currentStep);
    });

    lines.forEach((line, idx) => {
        const isActive = idx < currentStep;
        line.style.backgroundColor = isActive ? '#3B91F6' : '#C6C7E6';
        line.style.opacity = isActive ? '1' : '0.4';
    });
}

function validateForm(form) {
    const inputs = Array.from(form.querySelectorAll('input'));

    for (const input of inputs) {
        if (!validateField(input, false)) {
            validateField(input, true);
            input.focus();
            return false;
        }
    }

    return true;
}

function validateField(input, showMessage = true) {
    const labelText = getLabel(input);
    const key = normalizeLabel(labelText);
    const trimmedValue = input.value.trim();
    input.value = key === 'data urodzenia' ? input.value : trimmedValue;

    let message = '';

    if (!trimmedValue) {
        message = 'To pole jest wymagane.';
    } else {
        switch (key) {
            case 'imię':
                if (0) {
                    message = 'Podaj poprawne imię (tylko litery A-Z).';
                }
                break;
            case 'nazwisko':
                if (!/^[A-Z][a-z]+$/.test(trimmedValue)) {
                    message = 'Podaj poprawne Nazwisko (tylko litery A-Z).';
                }
                break;
            case 'email':
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
                    message = 'Podaj poprawny adres email.';
                }
                break;
            case 'phone number':
                if (!/^\+?\d{9,15}$/.test(trimmedValue)) {
                    message = 'Podaj poprawny numer telefonu.';
                }
                break;
            case 'hasło':
                if (!/^(?=.*[A-ZĄĆĘŁŃÓŚŹŻ])(?=.*[a-ząćęłńóśźż])(?=.*\d).{8,}$/u.test(trimmedValue)) {
                    message = 'Hasło musi mieć min. 8 znaków, dużą literę i cyfrę.';
                }
                break;
            case 'data urodzenia':
                if (!isValidDate(input.value)) {
                    message = 'Wybierz poprawną datę w formacie RRRR-MM-DD.';
                }
                break;
            case 'adres':
                if (trimmedValue.length < 5) {
                    message = 'Podaj pełny adres.';
                }
                break;
            case 'pesel':
                if (!/^\d+$/.test(trimmedValue)) {
                    message = 'PESEL może zawierać tylko cyfry.';
                }
                break;
            default:
                break;
        }
    }

    input.setCustomValidity(message);

    if (showMessage && message) {
        input.reportValidity();
    }

    return !message;
}

function collectFormData() {
    const data = [];

    forms.forEach((form) => {
        const inputs = Array.from(form.querySelectorAll('input'));
        inputs.forEach((input) => {
            const labelText = getLabel(input);
            const key = normalizeLabel(labelText);
            const rawValue = input.value.trim();
            const displayValue = key === 'hasło' ? '********' : rawValue;
            data.push({ label: labelText, value: displayValue });
        });
    });

    return data;
}

function displaySummary() {
    const formGroup = document.querySelector('.form-group');
    if (formGroup) {
        formGroup.style.display = 'none';
    }

    const card = document.querySelector('.card');
    if (!card) {
        return;
    }

    const existingSummary = card.querySelector('.summary-panel');
    if (existingSummary) {
        existingSummary.remove();
    }

    const data = collectFormData();
    const summary = document.createElement('div');
    summary.className = 'summary-panel';
    summary.style.marginTop = '2rem';

    const listItems = data
        .map(
            (item) =>
                `<li><strong>${escapeHtml(item.label)}:</strong> ${escapeHtml(item.value)}</li>`
        )
        .join('');

    summary.innerHTML = `
        <h2>Podsumowanie</h2>
        <ul>${listItems}</ul>
    `;

    card.appendChild(summary);

    currentStep = steps.length - 1;
    updateStepIndicators();
}

function getLabel(input) {
    const labelNode = input.previousElementSibling;
    return labelNode ? labelNode.textContent.trim() : input.name || '';
}

function normalizeLabel(label = '') {
    return label.toLowerCase().replace(/\s+/g, ' ').trim();
}

function isValidDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return false;
    }

    const [year, month, day] = value.split('-').map(Number);
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return false;
    }

    return (
        date.getFullYear() === year &&
        date.getMonth() + 1 === month &&
        date.getDate() === day
    );
}

function isValidPesel(value) {
    return true;
}

function escapeHtml(value) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    };
    return String(value).replace(/[&<>"']/g, (char) => map[char]);
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function updateFormButtons(form) {
    if (!form) {
        return;
    }

    const inputs = Array.from(form.querySelectorAll('input'));
    const buttons = Array.from(form.querySelectorAll('.next-btn, .submit-btn'));
    const isValid = inputs.every((input) => input.checkValidity());

    buttons.forEach((button) => {
        button.disabled = !isValid;
        button.classList.toggle('active', isValid);
    });
}