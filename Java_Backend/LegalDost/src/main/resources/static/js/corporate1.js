document.addEventListener('DOMContentLoaded', function () {
    console.log('Document loaded and script initialized.');

    const nextButton = document.getElementById('nextButton');
    const prevButton = document.getElementById('prevButton');
    const submitButton = document.getElementById('submitButton');
    const prevButton1 = document.getElementById('prevButton1');
    const prevButton2 = document.getElementById('prevButton2');
    const submitButton1 = document.getElementById('submitButton1');
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    const step3 = document.getElementById('step-3');
    const step4 = document.getElementById('step-4');

    // Function to save form data to sessionStorage
    function saveFormData() {
        console.log('Saving form data...');
        sessionStorage.setItem('principleFullName', document.getElementById('PrincipleFullName').value);
        sessionStorage.setItem('principleAddress', document.getElementById('PrincipleAddress').value);
        sessionStorage.setItem('attorneyFullName', document.getElementById('AttorneyFullName').value);
        sessionStorage.setItem('attorneyAddress', document.getElementById('AttorneyAddress').value);
        sessionStorage.setItem('witnessFullName', document.getElementById('WitnessFullName').value);
        sessionStorage.setItem('witnessAddress', document.getElementById('WitnessAddress').value);
        sessionStorage.setItem('executionDate', document.getElementById('DateOfExecution').value);
        console.log('Form data saved.');
    }

    // Function to load form data from sessionStorage
    function loadFormData() {
        console.log('Loading form data...');
        document.getElementById('PrincipleFullName').value = sessionStorage.getItem('principleFullName') || '';
        document.getElementById('PrincipleAddress').value = sessionStorage.getItem('principleAddress') || '';
        document.getElementById('AttorneyFullName').value = sessionStorage.getItem('attorneyFullName') || '';
        document.getElementById('AttorneyAddress').value = sessionStorage.getItem('attorneyAddress') || '';
        document.getElementById('WitnessFullName').value = sessionStorage.getItem('witnessFullName') || '';
        document.getElementById('WitnessAddress').value = sessionStorage.getItem('witnessAddress') || '';
        document.getElementById('DateOfExecution').value = sessionStorage.getItem('executionDate') || '';
        console.log('Form data loaded.');
    }

    // Load form data when Step 2 is displayed
    if (step2 && !step2.classList.contains('hidden')) {
        loadFormData();
    }

    // Save Step 2 data when transitioning to Step 3
    if (submitButton) {
        submitButton.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent actual form submission for demonstration purposes

            console.log('Step 2 submit button clicked.');
            // Save Step 2 data
            saveFormData();

            // Step 3 data population
            const principleFullName = document.getElementById('PrincipleFullName').value;
            const principleAddress = document.getElementById('PrincipleAddress').value;
            const attorneyFullName = document.getElementById('AttorneyFullName').value;
            const attorneyAddress = document.getElementById('AttorneyAddress').value;
            const witnessFullName = document.getElementById('WitnessFullName').value;
            const witnessAddress = document.getElementById('WitnessAddress').value;
            const executionDate = document.getElementById('DateOfExecution').value;

            console.log('Reviewing Step 2 data:', {
                principleFullName,
                principleAddress,
                attorneyFullName,
                attorneyAddress,
                witnessFullName,
                witnessAddress,
                executionDate
            });

            document.getElementById('reviewPrincipleFullName').textContent = principleFullName;
            document.getElementById('reviewPrincipleAddress').textContent = principleAddress;
            document.getElementById('reviewAttorneyFullName').textContent = attorneyFullName;
            document.getElementById('reviewAttorneyAddress').textContent = attorneyAddress;
            document.getElementById('reviewWitnessFullName').textContent = witnessFullName;
            document.getElementById('reviewWitnessAddress').textContent = witnessAddress;
            document.getElementById('reviewExecutionDate').textContent = executionDate;

            // Show Step 3 and hide Step 2
            toggleStepVisibility(step2, step3);
            updateStepper(2); // Update to step 3
        });
    }

    // Handle transition from Step 3 to Step 4
    if (submitButton1) {
        submitButton1.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent actual form submission for demonstration purposes

            console.log('Step 3 submit button clicked.');
            // Show Step 4 and hide Step 3
            toggleStepVisibility(step3, step4);
            updateStepper(3); // Update to step 4
        });
    }

    if (nextButton && prevButton && submitButton && step1 && step2 && step3) {
        nextButton.addEventListener('click', function () {
            // Validate if the checkbox is checked
            const disclaimer = document.getElementById('disclaimer');
            if (!disclaimer || !disclaimer.checked) {
                alert('Please agree to the disclaimer before proceeding.');
                console.log('Disclaimer not agreed.');
                return;
            }

            console.log('Next button clicked. Proceeding to Step 2.');
            // Navigate from Step 1 to Step 2
            toggleStepVisibility(step1, step2);
            updateStepper(1); // Update to step 2
        });

        prevButton.addEventListener('click', function () {
            console.log('Previous button clicked. Navigating from Step 2 to Step 1.');
            // Navigate from Step 2 to Step 1
            toggleStepVisibility(step2, step1);
            updateStepper(0); // Update to step 1
        });

        prevButton1.addEventListener('click', function () {
            console.log('Previous button clicked. Navigating from Step 3 to Step 2.');
            // Navigate from Step 3 to Step 2
            toggleStepVisibility(step3, step2);
            updateStepper(1); // Update to step 2
            loadFormData(); // Load saved form data
        });

        prevButton2.addEventListener('click', function () {
            console.log('Previous button clicked. Navigating from Step 4 to Step 3.');
            // Navigate from Step 4 to Step 3
            toggleStepVisibility(step4, step3);
            updateStepper(2); // Update to step 3
            loadFormData(); // Load saved form data
        });

    } else {
        console.error("One or more elements not found. Check the IDs and ensure they match.");
    }

    function toggleStepVisibility(currentStep, nextStep) {
        console.log(`Toggling visibility: Hiding ${currentStep.id}, Showing ${nextStep.id}`);
        currentStep.classList.add('hidden');
        nextStep.classList.remove('hidden');
    }

    function updateStepper(activeIndex) {
        console.log(`Updating stepper to index ${activeIndex}.`);
        const steps = document.querySelectorAll('#stepper li');

        steps.forEach((step, index) => {
            const span = step.querySelector('span');
            const svg = step.querySelector('svg');
            const h3 = step.querySelector('h3');
            const p = step.querySelector('p');

            if (index <= activeIndex) {
                // Active or completed steps
                span.classList.replace('bg-gray-100', 'bg-green-200');
                svg.classList.replace('text-gray-500', 'text-green-500');
                h3.classList.replace('text-gray-500', 'text-green-500');
                p.classList.replace('text-gray-500', 'text-green-500');

                // Replace the logo with a tick icon for completed steps
                if (!svg.classList.contains('tick')) {
                    svg.innerHTML = `
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5" />
                    `;
                    svg.classList.add('tick');
                }
            } else {
                // Inactive steps
                span.classList.replace('bg-green-200', 'bg-gray-100');
                svg.classList.replace('text-green-500', 'text-gray-500');
                h3.classList.replace('text-green-500', 'text-gray-500');
                p.classList.replace('text-green-500', 'text-gray-500');

                // Reset tick icon
                if (svg.classList.contains('tick')) {
                    svg.classList.remove('tick');
                    svg.innerHTML = `
                        <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                    `;
                }
            }
        });
    }
});