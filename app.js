document.addEventListener('DOMContentLoaded', function(){

    // BUTTON
    const button = document.querySelector('.hero-btn');

    // SURVEY CONTAINER
    const surveySection = document.getElementById('main-container');

    // Check if elements exist
    if (!button || !surveySection) {
        console.error('Button or Survey section not found');
        return;
    }

    // BUTTON CLICK
    button.addEventListener('click', function(e){

        // stop anchor refresh
        e.preventDefault();
        e.stopPropagation();

        // reveal survey
        surveySection.style.display = 'block';

        // smooth scroll to survey
        setTimeout(function(){
            surveySection.scrollIntoView({
                behavior:'smooth',
                block:'start'
            });
        }, 0);

    });

    // SURVEY SELECTION VISUALS
    document.addEventListener('change', function(e){
        if (e.target.type === 'radio') {
            const groupName = e.target.name;
            const groupInputs = document.querySelectorAll(`input[name="${groupName}"]`);

            groupInputs.forEach(function(input){
                const parentLabel = input.closest('label');
                if (!parentLabel) return;
                parentLabel.classList.toggle('selected', input.checked);
            });
        }
    });

    // SUBMIT BUTTON
    const resultCard = document.getElementById('result-card');
    const resultText = document.getElementById('result-text');
    const submitBtn = document.getElementById('results');
    const resetBtn = document.getElementById('reset-results');

    submitBtn.addEventListener('click', function(){
        const allRadioInputs = Array.from(document.querySelectorAll('input[type="radio"]'));
        const uniqueNames = Array.from(new Set(allRadioInputs.map(input => input.name).filter(Boolean)));
        const unanswered = uniqueNames.filter(name => !document.querySelector(`input[name="${name}"]:checked`));

        if (unanswered.length) {
            alert('Please answer every question before submitting.');
            return;
        }

        const selectedAnswers = document.querySelectorAll('input[type="radio"]:checked');
        let count1 = 0;
        let count2 = 0;
        let count3 = 0;
        let count4 = 0;

        selectedAnswers.forEach(function(answer){
            const value = parseInt(answer.value, 10);
            if (value === 1) {
                count1++;
            } else if (value === 2) {
                count2++;
            } else if (value === 3) {
                count3++;
            } else if (value === 4) {
                count4++;
            }
        });

        let result = '';

        if (count1 > count2 && count1 > count3 && count1 > count4) {
            result = `She left you because the relationship became emotionally stable in a way that somehow still felt boring. According to our analysis, you were respectful, available, and psychologically healthy. Unfortunately, mystery is a powerful drug.`;
        } else if (count2 > count1 && count2 > count3 && count2 > count4) {
            result = `She left you because every interaction slowly became a wellness check. Our system detected elevated levels of overthinking, unnecessary emotional surveillance, and “just making sure you got home safe” energy. Drink water and take a walk, dude.`;
        } else if (count3 > count1 && count3 > count2 && count3 > count4) {
            result = `She left you because your attachment style eventually achieved physical presence without technically violating any laws. According to our findings, you confused emotional closeness with continuous availability.`;
        } else if (count4 > count1 && count4 > count2 && count4 > count3) {
            result = `She left you because the relationship began to resemble a full-time monitoring program. Behavioral analysis suggests she could feel your attention through walls. At some point, escape became a form of self-care.`;
        } else {
            result = `Our system was unable to determine why she left you. This usually happens when the subject is either emotionally unpredictable or answered the questions dishonestly to look stable.`;
        }

        surveySection.style.display = 'none';
        resultText.textContent = result;
        resultCard.classList.add('visible');
        resultCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    resetBtn.addEventListener('click', function(){
        resultCard.classList.remove('visible');
        surveySection.style.display = 'block';
        document.querySelectorAll('input[type="radio"]').forEach(function(input){
            input.checked = false;
        });
        document.querySelectorAll('label.selected').forEach(function(label){
            label.classList.remove('selected');
        });
        resultText.textContent = '';
        window.scrollTo({ top: surveySection.offsetTop, behavior: 'smooth' });
    });

});
