// Global Variable to Store Data
let step3Data = {};

// Event Listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
    console.log('Document loaded and script initialized.');

    // Elements
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

    // Event Handlers

    // Step 2 Submit Button Handler
    if (submitButton) {
        submitButton.addEventListener('click', function (event) {
            event.preventDefault();
            saveStep2Data();
            populateReviewStep();
            navigateToStep(step2, step3, 2);
        });
    }

    // Step 3 Submit Button Handler
    if (submitButton1) {
        submitButton1.addEventListener('click', function (event) {
            event.preventDefault();
            saveStep3Data(); // Save the review data and initialize TinyMCE
            navigateToStep(step3, step4, 3);
        });
    }

    // Navigation Handlers
    if (nextButton && prevButton && submitButton && step1 && step2 && step3) {
        nextButton.addEventListener('click', function () {
            if (!validateDisclaimer()) return;
            navigateToStep(step1, step2, 1);
        });

        prevButton.addEventListener('click', function () {
            navigateToStep(step2, step1, 0);
        });

        prevButton1.addEventListener('click', function () {
            navigateToStep(step3, step2, 1);
            loadStep2Data();
        });

        prevButton2.addEventListener('click', function () {
            navigateToStep(step4, step3, 2);
            loadStep2Data();
        });
    } else {
        console.error("One or more elements not found. Check the IDs and ensure they match.");
    }

    // Functions

    // Save Step 2 Data


    // Validate Disclaimer Checkbox
    function validateDisclaimer() {
        const disclaimer = document.getElementById('disclaimer');
        if (!disclaimer || !disclaimer.checked) {
            alert('Please agree to the disclaimer before proceeding.');
            console.log('Disclaimer not agreed.');
            return false;
        }
        return true;
    }

    // Update Stepper Navigation
    function updateStepper(activeIndex) {
        console.log(`Updating stepper to index ${activeIndex}.`);
        const steps = document.querySelectorAll('#stepper li');
        steps.forEach((step, index) => {
            const span = step.querySelector('span');
            const svg = step.querySelector('svg');
            const h3 = step.querySelector('h3');
            const p = step.querySelector('p');

            if (index <= activeIndex) {
                span.classList.replace('bg-gray-100', 'bg-green-200');
                svg.classList.replace('text-gray-500', 'text-green-500');
                h3.classList.replace('text-gray-500', 'text-green-500');
                p.classList.replace('text-gray-500', 'text-green-500');

                if (!svg.classList.contains('tick')) {
                    svg.innerHTML = `<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5" />`;
                    svg.classList.add('tick');
                }
            } else {
                span.classList.replace('bg-green-200', 'bg-gray-100');
                svg.classList.replace('text-green-500', 'text-gray-500');
                h3.classList.replace('text-green-500', 'text-gray-500');
                p.classList.replace('text-green-500', 'text-gray-500');

                if (svg.classList.contains('tick')) {
                    svg.classList.remove('tick');
                    svg.innerHTML = `<path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />`;
                }
            }
        });
    }

    let step2Data = {};
    function saveStep2Data() {
        step2Data = {
            principleFullName: document.getElementById('PrincipleFullName').value,
            principleAddress: document.getElementById('PrincipleAddress').value,
            attorneyFullName: document.getElementById('AttorneyFullName').value,
            attorneyAddress: document.getElementById('AttorneyAddress').value,
            witnessFullName: document.getElementById('WitnessFullName').value,
            witnessAddress: document.getElementById('WitnessAddress').value,
            dateOfExecution: document.getElementById('DateOfExecution').value
        };
        console.log('Saving Step 2 data:', step2Data);
    }

    // Load Step 2 Data
    function loadStep2Data() {
        console.log('Loaded Step 2 data:', step2Data);
        document.getElementById('PrincipleFullName').value = step2Data.principleFullName || '';
        document.getElementById('PrincipleAddress').value = step2Data.principleAddress || '';
        document.getElementById('AttorneyFullName').value = step2Data.attorneyFullName || '';
        document.getElementById('AttorneyAddress').value = step2Data.attorneyAddress || '';
        document.getElementById('WitnessFullName').value = step2Data.witnessFullName || '';
        document.getElementById('WitnessAddress').value = step2Data.witnessAddress || '';
        document.getElementById('DateOfExecution').value = step2Data.dateOfExecution || '';
    }

    // Populate Review Step (Step 3)
    function populateReviewStep() {
        step3Data = { ...step2Data }; // Update step3Data with the current step2Data
        document.getElementById('reviewPrincipleFullName').textContent = step3Data.principleFullName || '';
        document.getElementById('reviewPrincipleAddress').textContent = step3Data.principleAddress || '';
        document.getElementById('reviewAttorneyFullName').textContent = step3Data.attorneyFullName || '';
        document.getElementById('reviewAttorneyAddress').textContent = step3Data.attorneyAddress || '';
        document.getElementById('reviewWitnessFullName').textContent = step3Data.witnessFullName || '';
        document.getElementById('reviewWitnessAddress').textContent = step3Data.witnessAddress || '';
        document.getElementById('reviewExecutionDate').textContent = step3Data.dateOfExecution || '';
    }

    // Save Step 3 Data (Review data)
    function saveStep3Data() {
        step3Data.principleFullName = document.getElementById('reviewPrincipleFullName').textContent;
        step3Data.principleAddress = document.getElementById('reviewPrincipleAddress').textContent;
        step3Data.attorneyFullName = document.getElementById('reviewAttorneyFullName').textContent;
        step3Data.attorneyAddress = document.getElementById('reviewAttorneyAddress').textContent;
        step3Data.witnessFullName = document.getElementById('reviewWitnessFullName').textContent;
        step3Data.witnessAddress = document.getElementById('reviewWitnessAddress').textContent;
        step3Data.dateOfExecution = document.getElementById('reviewExecutionDate').textContent;
        console.log('Saving Step 3 data:', step3Data);
    }

    // Navigate to a Specific Step
    function navigateToStep(currentStep, nextStep, stepIndex) {
        currentStep.classList.add('hidden');
        nextStep.classList.remove('hidden');
        updateStepper(stepIndex);
    }

    // Initialize TinyMCE
    // Function to Save Step 3 Data and Initialize TinyMCE
    function saveStep3Data() {
        step3Data.principleFullName = document.getElementById('reviewPrincipleFullName').textContent;
        step3Data.principleAddress = document.getElementById('reviewPrincipleAddress').textContent;
        step3Data.attorneyFullName = document.getElementById('reviewAttorneyFullName').textContent;
        step3Data.attorneyAddress = document.getElementById('reviewAttorneyAddress').textContent;
        step3Data.witnessFullName = document.getElementById('reviewWitnessFullName').textContent;
        step3Data.witnessAddress = document.getElementById('reviewWitnessAddress').textContent;
        step3Data.dateOfExecution = document.getElementById('reviewExecutionDate').textContent;
        console.log('Saving Step 3 data:', step3Data);

        // Initialize TinyMCE with step3Data
        initializeTinyMCEWithData();
    }

    // Function to Initialize TinyMCE with the Correct Data
    function initializeTinyMCEWithData() {
        tinymce.init({
            selector: '#editor',
            plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | a11ycheck checklist code export',
            setup: function (editor) {
                editor.on('init', function () {
                    editor.setContent(`
                        <b> Draft of General Power of Attorney</b>
                        <p>To All to Whom these presents shall come, I <strong>${step3Data.principleFullName}</strong> of
                <strong>${step3Data.principleAddress}</strong>, WHEREAS, I am desirous of appointing some fit and proper person to look
                after all my immovable properties, business and other affairs and requested
                Mr. <strong>${step3Data.attorneyFullName}</strong> of <strong>${step3Data.attorneyAddress}</strong> (Hereinafter called 'the
                Attorney') to act for me and manage and look after my affairs which the
                Attorney has consented to do.
                NOW KNOW YOU ALL AND THESE PRESENTS WITNESS that I, the said
                <strong>${step3Data.witnessFullName}</strong>, do hereby appoint the said <strong>${step3Data.attorneyFullName}</strong> as my true
                and lawful Attorney with full power and authority to do and execute all
                acts, deeds, and things as hereinafter mentioned.</p>
                        1.  To ask, receive and recover from all receivers, farmers, tenants and all other occupiers whatsoever whether holding under a written lease or agreement or otherwise. of my lands and buildings, all rents, arrears of rent, services. issues, profits, emoluments and sums of money now due owing and payable or at any time hereafter to become due, owing and payable in respect of the same in any manner whatsoever and also on non- payment thereof to take summary proceedings to distrain or distress according to law and to give notices to quit, and vacate and file suits and proceedings in ejectment and to recover rents and compensation for use and occupation and to make like and appropriate demands and take like and appropriate actions and proceedings against trespassers.
                                            <br>
                                            2.    To appoint any fit person to be steward, bailiff, receiver or servant for the management of my lands and premises and to recover rents thereof and the same or any of such stewards, bailiffs, receivers or servants at pleasure to remove and displace as the attorney shall think fit.
                                            <br>
                                            3.    To contract with any person for leasing for such period at such rent subject to such conditions as the attorney shall see fit, all or any of the said premises and any such person, to let into possession thereof and to accept surrenders of leases and for that purpose to make and execute any lease or grant or other lawful deed or instrument whatsoever which shall be necessary or proper in that behalf.
                                            <br>
                                            4.    To pay or allow all taxes, rates, assessments, charges. deductions, expenses and all other payments and outgoings whatsoever due and payable or to become due and payable for or on account of my said lands, estates and premises.
                                            <br>
                                            5.    To enter into and upon my lands and buildings and structures whatsoever and to view the state and defects for the reparation thereof and forthwith to give proper notices and directions for repairing the same and to let manage and Improve the same to the best advantage and to make or repair drains and roads thereon.
                                            <br>
                                            6.    To sell (either by public auction or private treaty) or exchange and convey transfer and assign any of my lands and buildings and other property for such consideration and subject to such covenants as the Attorney may think fit and to give receipts for all or any part of the purchase or other consideration money And the same or any of them with like power, to mortgage charge or encumber and also to deal with my immovable personal property or any part thereof as the Attorney may think fit for the purpose of paying off reducing consolidating, or making substitution for any existing or future mortgage. charge, encumbrance. hypothecation or pledge of the same or any part thereof as the Attorney shall think fit and in general to sanction any scheme for dealing with mortgages, charges hypothecations or pledges of any property or any part thereof as fully and effectually as I myself could have done.
                                            <br>
                                            7.    To purchase, take on lease or otherwise acquire such lands, houses, tenements and immovable property generally as the Attorney may think fit or desirable.
                                            <br>
                                            8.    To prepare a layout by sub-dividing any land into plots and obtain necessary approval of any local authority for the same if required.
                                            <br>
                                            9.   To develop any land or plot of land vacant or with any building or structure thereon by constructing new building or buildings thereon and on Flat ownership basis, to sell the flats and other premises therein on such terms as the Attorney may think fit and to transfer the land with such building to any co-operative housing society or company or on Apartment ownership basis and to execute necessary documents in that behalf.
                                            <br>
                                            10.  To enter into any development agreement with any developer or builder authorising him to develop any of my properties as mentioned above and to do and execute all acts and deeds as may be required to be done or executed.
                                            <br>
                                            11.  To sell or to concur in selling in private sale or In any other manner any of my stock, merchandise, goods, chattels and other effects, articles and things for such consideration and subject to such conditions as the Attorney may think fit and to receive the proceeds thereof and to give receipt for all, or any part of the sale proceeds or other consideration money.
                                            <br>
                                            12.  To pledge, hypothecate or charge or concur in pledging hypothecating or charging with, to or in favour of a Bank or Banks or any other financier body or Individual any personal or moveable properties, goods, chattels, merchandise, commodities, effects and things for such considerations and subject to such conditions as the Attorney may think fit and for that purpose to sign, execute and deliver all necessary instruments and deeds of mortgage, Charge, hypothecation, pawn, pledge, lien and trust receipts and to receive the consideration money or otherwise for such pledge, Pawn, hypothecation,charge.,mortgage,lien and the like.
                                            <br>
                                            13.  Also to draw, make, sign, accept or endorse pledge, hypothecate or otherwise negotiate all or any foreign or Inland bills of exchange, hundi, cheques, orders for payment of money and promissory notes and to sign, seal, execute, deliver, endorse, accept, assign or transfer all mortgage deeds, bills of lading, delivery orders or other symbols or Andicia of or documents of title relating to goods or merchandise, policies of assurances, charter parties, ships certificates. bills of sale, securities of any Government, municipality or local authority wheresoever situate or other stocks, shares, debentures, mortgages, obligations, or other securities of any company or corporation whether commercial, municipal or otherwise and all and every other public or other securities, stocks or shares, foreign or otherwise and to deal with the same and to receive the proceeds thereof respectively.
                                            <br>
                                            14.  To purchase, take on hire, borrow or otherwise acquire machinery, tools, spare parts, raw materials, merchandise commodities, goods, wares, articles, effects and things and to deal in and with the same and to dispose of the same in such manner and for such consideration as the Attorney may think fit.
                                            <br>
                                            15.  To borrow any sum of money on such terms and with or without security as the Attorney may think fit for any of the purposes of these presents.
                                            <br>
                                            16.  To deposit any money this may come to his hands as such attorney with any banker or broker or other person and any of such money or any other money to which i am entitled which now or hereafter is or shall be deposited with any banker, broker or other person to withdraw and either employ as the Attorney shall think fit in the payment of any debts or the keeping down of interest payable by me or the creation of sinking fund for the liquidation of any charges or encumbrances affecting any moveable and immovable property or any part thereof or in or about any of the purpose mentioned in these presents or otherwise for my use and benefit or to invest in any such stocks, funds, shares or securities as the Attorney may think proper and to receive and give receipts for any Income or dividends arising from such investments and the same investments to vary or dispose of as the Attorney may think fit.
                                            <br>
                                            17.  To continue and or to open new, current and or overdraft accounts in my name with any Banks or Bankers and also to draw cheques and otherwise to operate upon any such accounts.
                                            <br>
                                            18.  To engage, employ and dismiss any agents, clerks, servants or other persons in and about the performance of the purposes of these presents as the Attorney shall think fit.
                                            <br>
                                            19.  To sell any of my present or future investments and for that purpose to employ and pay brokers and other agents in that behalf and to receive and give receipts for the purchase money payable in respect of such sales and to transfer any of my investments so sold to the purchaser or purchasers thereof or as he or they may direct and for these purposes to sign and execute all such contracts transfer deeds and other writings and do all such other acts as may be necessary for effectually transferring the same.
                                            <br>
                                            20.  To accept the transfer of any share, stocks, debentures stocks, annuities, bonds. obligations or other securities of whatever nature that may at any time be transferred to me.
                                            <br>
                                            21.  To attend, vote at and otherwise take part in all meetings held in connection with any company or corporation with which I am concerned as a member, shareholder or otherwise or In relation to any of my investments and to sign proxies for the purpose of voting thereat or for any other purpose connected therewith as freely as I myself could do.
                                            <br>
                                            22.  Out of any of my moneys in his hands or under his control to pay all calls that may be lawfully made upon me or other expenses that may be incurred in relation to any of my Investments and to give security for payment of the same.
                                            <br>
                                            23.  To exercise all other rights and privileges and perform all other duties which now or hereafter may appertain to me as a holder of debentures or shares or stock in any company or corporation.
                                            <br>
                                            24.  To ask, demand, sue for recover and receive from every person every body politic or corporate whom it shall or may concern all sums of money, rents, issues, profits, debts, dues, goods, wares. merchandise, chattels, effects and things of any nature or description whatsoever which now are or which at any time or times during the subsistence of these presents shall or may be or become due owing payable or belonging to me in or by any right, title, ways or means howsoever and upon receipt thereof or of any part thereof to make sign execute and deliver such receipts releases or other discharges for the same respectively as the Attorney shall think fit.
                                            <br>
                                            25.  To settle any account or reckoning whatsoever wherein i am now or at any time hereafter shall be in anywise interested or concerned with any person whomsoever and to pay or receive the balance thereof as the case may require.
                                            <br>
                                            26.  To receive every sum of money whatsoever which now is or at any time hereafter may be due arising or belonging to me upon or by virtue of any mortgage, charge, pledge hypothecation or other security whatsoever and on receipt thereof to make, sign. execute and give good and sufficient release or other discharges for the same and also to sign, execute, make and deliver all proper and sufficient reconveyances, releases and other assurances of the lands and premises which shall have been mortgaged or charged as security therefor and also to consent to any such alteration or modification of the nature or conditions of the said securities as the Attorney shall think fit.
                                            <br>
                                            27.  To compound with or make allowances to any person for or in respect of the aforesaid debts or any other debt or demand whatsoever which now is or shall or may at any time hereafter become due or payable to me and to make or receive any composition, dividend thereof or thereupon and to give receipts, releases or other discharges for the whole of the same debts, sums or demands or to settle compromise or submit to arbitration every such debt or demand and every other claim. right, matter or thing due to or concerning me as the Attorney shall think most advisable for my benefit and for that purpose enter into. make, sign, execute and deliver such bonds of arbitration or other deeds or instruments as are usual in like cases.
                                            <br>
                                            28.  To commence any suit, action or other proceedings In any Court of justice and before any public officer or Tribunal for the recovery or enforcement of any debt, sum of money, right, title, Interest, property matter or thing whatsoever now due or payable or to become due or payable or in anywise belonging to me by any means or on any account whatsoever and the same action, suit or proceedings to prosecute or discontinue or become non-suit therein If the Attorney shall see cause And also to take such other lawful ways and means including proceedings in execution. distress, distrain and the like for recovering or getting in any such sum of money or other thing whatsoever which shall by the attorney be conceived to be due owing, belonging or payable to me by any person whosoever and also to appoint any advocates, solicitors and legal advisers to prosecute or defend In the premises aforesaid or any of them as occasion may require And from time to time, them or any of them to remove and other or others to appoint In their place and to pay them such fees and remuneration as the Attorney shall think fit or be advised And for all or any of the purposes aforesaid to sign, execute, deliver. file all necessary vakalatnamas, war- rants to act, plaints, petitions, applications, defences, statements, ac- counts, declarations, affidavits, and other documents, papers and writings.
                                            <br>
                                            29.  To defend any suit or legal proceedings taken against me in any court of law and to do all acts and things as are mentioned above.
                                            <br>
                                            30.  To accept service of any writ of summons or other legal processes or notice in any suit or legal proceedings and any person to represent in such court civil or criminal, or revenue court or tribunal or before any officer or other Tribunal whatsoever.
                                            <br>
                                            31.  To make any declaration or affidavit in proof of any debt or debts due or claimed to be due to me in any proceedings taken or hereafter to be taken by or against any person firm or company under any Act or Ordinance for the time being in force for the relief or otherwise of insolvent debtors or the winding up of companies and to attend all meetings of creditors under any such proceedings and to propose, second or vote for or against any resolution at any such meeting and generally to act for me in all proceedings whether by way of bankruptcy or liquidation by arrangement or by composition which may be taken against or for the relief of any debtor as the Attorney shall think fit.
                                            <br>
                                            32.  To exercise any power and any duty vested in me whether solely or jointly with another or others as executor, administrator, trustee or in any other fiduciary capacity (including powers and trusts to sell or lease land or to receive and give good receipts for money) so far as such power or duty Is capable of being validity delegated.
                                            <br>
                                            33.  And also to appear before the Registrar or Sub - Registrar of any District or Sub-District appointed or to be appointed under any Act or law for the time being in force or otherwise for the registration of deeds, assurances, contracts or other Instruments and then and there or at any time thereafter to present and register or cause to be registered any deeds, assurances. contracts or other instruments In which i am or may be by the Attorney deemed to be Interested and to pay such fees as shall be necessary for the registration.
                                            <br>
                                            34.  To enter into, make, sign, seal, execute, deliver, acknowledge, perform all engagements, contracts, agreements, deeds, declarations, bonds, assurances and other documents, papers, writings and things that may be necessary or proper to be entered into, made signed, executed, delivered, acknowledged and performed for any of the purposes of these presents or to or in which I am or may be party or in any way Interested.
                                            <br>
                                            35.  To appear on my behalf and to represent my interest before the Income tax, Wealth-tax and Gift-tax and/or other Taxing Authorities in respect of my Income tax. Wealth-tax, Gift-tax, as also before any Tribunal, or Court.
                                            <br>
                                            36.  To sign on my behalf Income-tax, Wealth-tax and Gift-tax returns and to submit the same on my behalf to the respective Taxing Authorities,
                                            <br>
                                            37.  To sign, declare and affirm on my behalf all the applications, documents. declarations and affidavits as may be necessary for the purposes of the Income-tax, Wealth- tax and Gift -tax affairs and to submit and file the same with the respective Taxing Authorities, to file appeals and references as the Attorney may be advised and as he may deem fit and proper against the orders and decisions of the Income-tax, Wealth-tax and Gift-tax Authorities in respect of my assessment proceedings. to appoint on my behalf such Auditors, Accountants and Advocates as the said Attorney shall deem fit and proper for representing me before the Income-tax, Wealth-tax and Gift-tax and/or Taxing Authorities or any other Tribunal or Court in respect of the Income-tax, Wealth-tax and Gift-tax Assessments and to discharge them and appoint new Auditors, Accounts and Advocates as the case may be An their place, to compound, compromise and settle with the Income-tax, Wealth-tax and Gift-tax Authorities the orders and assessments made by them, to apply for time for payment and to apply for instalments for the payment of the amount assessed and to be paid by me to the Income-tax, Wealth-tax and Gift-tax or other Taxing Authorities, and to do all acts and- things regarding the said matters.
                                            <br>
                                            38.  And also for the better and more effectually doing, effecting and performing the several matters and things aforesaid to appoint from time to time or generally such person or persons as the Attorney may think fit as his substitute or substitutes to do, execute and perform all or any such matters and things as aforesaid and any such substitute or substitutes at pleasure to remove and to appoint another or other in his or their place.
                <p>In general, to do all other acts, deeds, matters and things whatsoever in
                or about my estate, property and affairs or concur with persons jointly
                interested with myself therein in doing all acts, deeds, matters and things
                herein either particularly or generally described as amply and effectually
                to all intents and purposes as I could do in my own proper person if these
                presents had not been made.
                AND I, the abovenamed <strong>${step3Data.principleFullName}</strong> do hereby undertake to ratify
                whatever the Attorney or any substitute or agent appointed by him under the
                power in that behalf hereinbefore contained may lawfully do or cause to be
                done in and by virtue of these presents.</p>

                <p>IN WITNESS WHEREOF I, the abovenamed <strong>${step3Data.principleFullName}</strong> have hereunto set
                my hand this <strong>${step3Data.dateOfExecution}</strong>.
                <br>
                Signed, sealed and delivered by the within named
                in the presence of <strong>${step3Data.witnessFullName}</strong>.</p>
                    `);
                    console.log('TinyMCE content initialized with step3Data:', step3Data);
                });
            }
        });
    }
});    